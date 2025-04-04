# 🛡️ Obsidian Cyber Triage Vault

A lightweight Obsidian vault template for tracking, scoring, and visualizing cybersecurity triage events — using Templater, Meta Bind, Dataview, and Chart.js.

> 📊 Transform your markdown notes into a visual incident response dashboard.

---

## 🔍 Features

- ✅ **Structured triage templates** with dropdowns and scoring logic
- 🧮 **Automated score calculation** based on threat, confidence, impact & department
- 📈 **Dynamic dashboard** showing risk trends, top threats, and impacted departments
- 🧩 Powered by Obsidian plugins: **Templater**, **Meta Bind**, **Dataview**, **QuickAdd**

---

## 📁 What's Included

```
📁 Obsidian-Triage-DemoVault/
├── Triage Notes/
│   └── TRIAGE-YYYYMMDD-HHmm.md         ← Sample triage note
├── Templates/
│   └── Triage Template.md              ← Templater-compatible note template
├── Dashboard/
│   └── Triage Dashboard.md             ← DataviewJS-powered visual dashboard
└── .obsidian/
    └── plugins/
        └── quickadd/scripts/update_score.js  ← Score updater script
```

---

## 🛠️ Setup Instructions

1. Clone this repo or unzip the vault
2. Open the folder in [Obsidian](https://obsidian.md)
3. Install the following plugins:
   - **Templater**
   - **Meta Bind**
   - **Dataview**
   - **QuickAdd** (optional for triggering)
4. Open a triage note → fill in the form fields
5. Run the Templater script to calculate score
6. Open `Triage Dashboard.md` to view charts

---

## ⚙️ How Scoring Works

The `update_score.js` script calculates a score based on:
- **Impact Level**: critical > high > moderate > low
- **Threat Type**: e.g. ransomware = 5, phishing = 2
- **Confidence**: high = 3, low = 1
- **Departments**: sensitive departments = higher weight

You can tweak weights in the script to match your org’s priorities.

---

## 📊 Dashboard Visuals

Built with DataviewJS and Chart.js (injected dynamically):
- 📈 Risk Score Over Time
- 🏢 Top Impacted Departments
- 🚨 Threat Type Frequency

To ensure charts render:
- Keep triage notes named like `TRIAGE-YYYYMMDD-HHmm.md`
- Make sure `score`, `date`, `department`, and `threat_type` fields are in the YAML

---

## 📦 Want to Extend It?

- Add severity/risk level mapping
- Track escalation or resolution status
- Publish sanitized notes via [Obsidian Publish](https://obsidian.md/publish)

---

## 💬 Support / Feedback

Feel free to [open an issue](https://github.com/yourusername/obsidian-cyber-triage/issues) or connect via LinkedIn if you use or improve this vault!

---

## 🧑‍💻 License

MIT — use freely, attribute if useful. Stay safe, and keep it structured.
