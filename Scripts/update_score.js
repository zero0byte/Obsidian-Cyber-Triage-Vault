module.exports = async (tp) => {
  const file = app.workspace.getActiveFile();
  if (!file) {
    new Notice("❌ No active file.");
    return;
  }

  const content = await app.vault.read(file);

  const frontmatterRegex = /^---\n([\s\S]*?)\n---/m;
  const match = content.match(frontmatterRegex);

  if (!match) {
    new Notice("❌ No YAML frontmatter found.");
    return;
  }

  let frontmatterLines = match[1].split("\n");
  let yamlObj = {};

  for (let line of frontmatterLines) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;
    yamlObj[key.trim()] = rest.join(":").trim();
  }

  // Parse/normalize
  const impact = (yamlObj.impact_level || "").toLowerCase();
  const threat = (yamlObj.threat_type || "").toLowerCase();
  const confidence = (yamlObj.confidence || "").toLowerCase();
  let departments = yamlObj.department || [];
  if (typeof departments === "string") {
    departments = departments.replace(/[\[\]]/g, "").split(",").map(s => s.trim().toLowerCase());
  }

  const impactScoreMap = { critical: 5, high: 4, moderate: 3, low: 2, unknown: 0 };
  const threatScoreMap = {
    ransomware: 5, data_exfiltration: 5, unauthorized_access: 3,
    malware: 3, phishing: 2, insider_threat: 2, unknown: 0
  };
  const confidenceScoreMap = { high: 3, medium: 2, low: 1, unknown: 0 };
  const sensitiveDepts = ["finance", "legal", "it"];

  const deptScore = departments.includes("all")
    ? 10
    : departments.reduce((acc, d) => acc + (sensitiveDepts.includes(d) ? 2 : 1), 0);

  const total = (impactScoreMap[impact] ?? 0) +
                (threatScoreMap[threat] ?? 0) +
                (confidenceScoreMap[confidence] ?? 0) +
                deptScore;

  // Update or insert score line
  const scoreLineIndex = frontmatterLines.findIndex(l => l.trim().startsWith("score:"));
  if (scoreLineIndex !== -1) {
    frontmatterLines[scoreLineIndex] = `score: ${total}`;
  } else {
    frontmatterLines.push(`score: ${total}`);
  }

  const newYaml = `---\n${frontmatterLines.join("\n")}\n---`;
  const body = content.replace(frontmatterRegex, "").trim();
  const finalContent = `${newYaml}\n\n${body}`;

  await app.vault.modify(file, finalContent);
  new Notice(`✅ Score updated to ${total}`);
};
