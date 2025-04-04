module.exports = async (tp) => {
  const file = app.workspace.getActiveFile();

  // ⏳ Wait for frontmatter to load after note creation
  await new Promise(resolve => setTimeout(resolve, 500));

  const fileCache = app.metadataCache.getFileCache(file);

  if (!fileCache?.frontmatter) {
    new Notice("❌ Frontmatter not found after delay.");
    return;
  }

  const frontmatter = fileCache.frontmatter;

  const impact = (frontmatter.impact_level || "").toLowerCase();
  const threat = (frontmatter.threat_type || "").toLowerCase();
  const confidence = (frontmatter.confidence || "").toLowerCase();
  
  let departments = frontmatter.department || [];
  if (typeof departments === "string") {
    departments = [departments];
  }
  departments = departments.map(d => d.toLowerCase().trim());

  const impactScoreMap = { critical: 5, high: 4, moderate: 3, low: 2, unknown: 0 };
  const threatScoreMap = {
    ransomware: 5, data_exfiltration: 5,
    unauthorized_access: 3, malware: 3,
    phishing: 2, insider_threat: 2, unknown: 0
  };
  const confidenceScoreMap = { high: 3, medium: 2, low: 1, unknown: 0 };
  const sensitiveDepts = ["finance", "legal", "it"];

  let deptScore;
  if (departments.includes("all")) {
    deptScore = 10;
    new Notice(`✅ 'All' found → deptScore: ${deptScore}`);
  } else {
    deptScore = departments.reduce((acc, d) =>
      acc + (sensitiveDepts.includes(d) ? 2 : 1), 0);
    new Notice(`✅ Departments: ${departments.join(", ")} → deptScore: ${deptScore}`);
  }

  const impactScore = impactScoreMap[impact] ?? 0;
  const threatScore = threatScoreMap[threat] ?? 0;
  const confidenceScore = confidenceScoreMap[confidence] ?? 0;
  const total = impactScore + deptScore + threatScore + confidenceScore;

  // Update YAML block in file
  const content = await app.vault.read(file);
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    new Notice("❌ Could not match YAML block.");
    return;
  }

  let lines = match[1].split("\n");
  const scoreLineIndex = lines.findIndex((l) => l.trim().startsWith("score:"));
  if (scoreLineIndex !== -1) {
    lines[scoreLineIndex] = `score: ${total}`;
  } else {
    lines.push(`score: ${total}`);
  }

  const newYaml = `---\n${lines.join("\n")}\n---`;
  const newContent = content.replace(frontmatterRegex, newYaml);
  await app.vault.modify(file, newContent);

  new Notice(`✅ Final score updated to ${total}`);
};
