```dataview
TABLE
  event_id AS "Event",
  date,
  score,
  severity,
  department,
  file.link AS "Note"
FROM "Triage"
WHERE score
SORT date DESC
```

````dataviewjs
// Inject Chart.js if not already available
if (typeof Chart === 'undefined') {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/chart.js";
  script.type = "text/javascript";
  script.onload = () => {
    console.log("✅ Chart.js loaded.");
    renderCharts();
  };
  document.head.appendChild(script);
} else {
  renderCharts();
}

function renderCharts() {
  const pages = dv.pages()
    .where(p => p.file.name.startsWith("TRIAGE") && p.score && p.date)
    .sort(p => p.date, 'asc');

  let labels = [], scores = [], departmentsMap = {}, threatMap = {};

  for (let page of pages) {
    labels.push(page.date);
    scores.push(page.score);

    // Count departments
    let depts = page.department;
    if (typeof depts === "string") depts = [depts];
    for (let dept of depts || []) {
      dept = dept.trim();
      if (dept) {
        departmentsMap[dept] = (departmentsMap[dept] || 0) + 1;
      }
    }

    // Count threats
    const threat = page.threat_type;
    if (threat) {
      threatMap[threat] = (threatMap[threat] || 0) + 1;
    }
  }

  // Create chart containers
  dv.el("h3", "📈 Score Trend");
  dv.el("canvas", "", { attr: { id: "scoreChart", width: 600, height: 250 } });

  dv.el("h3", "🏢 Department Impact");
  dv.el("canvas", "", { attr: { id: "deptChart", width: 600, height: 250 } });

  dv.el("h3", "🚨 Threat Type Frequency");
  dv.el("canvas", "", { attr: { id: "threatChart", width: 600, height: 250 } });

  setTimeout(() => {
    // Risk Score Line Chart
    const ctx1 = document.getElementById("scoreChart").getContext("2d");
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Risk Score',
          data: scores,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.3,
          fill: true
        }]
      },
      options: { scales: { y: { beginAtZero: true } } }
    });

    // Department Impact Chart
    const ctx2 = document.getElementById("deptChart").getContext("2d");
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: Object.keys(departmentsMap),
        datasets: [{
          label: 'Departments',
          data: Object.values(departmentsMap),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: { legend: { display: false } }
      }
    });

    // Threat Type Frequency Chart
    const ctx3 = document.getElementById("threatChart").getContext("2d");
    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: Object.keys(threatMap),
        datasets: [{
          label: 'Threats',
          data: Object.values(threatMap),
          backgroundColor: 'rgba(255, 206, 86, 0.6)'
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: { legend: { display: false } }
      }
    });
  }, 300);
}
````
