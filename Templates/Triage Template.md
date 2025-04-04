---
event_id: 
date: <% tp.date.now("YYYY-MM-DD") %>
impact_level: unknown
department: []
threat_type: unknown
confidence: unknown
score: 1
multiSelect:
  - All
action_required: false
---

<%*
const now = tp.date.now("YYYYMMDD-HHmm");
const newName = `TRIAGE-${now}`;
tp.file.rename(newName);
tp.file.move("Triage/" + newName);
%>
---
# 🛡️ Cybersecurity Triage Note

## 🧾 Event ID
```meta-bind
INPUT[text:event_id]
```

## 📅 Date
Automatically populated.

## 💥 Impact Level
```meta-bind
INPUT[select(option(critical), option(high), option(moderate), option(low), option(unknown)):impact_level]
```

## 🏢 Affected Departments
```meta-bind
INPUT[multiSelect(option(IT), option(HR), option(Finance), option(Legal), option(Engineering), option(Sales), option(All)):department]
```

## 🕵️ Threat Type
```meta-bind
INPUT[select(option(ransomware), option(data_exfiltration), option(unauthorized_access), option(malware), option(phishing), option(insider_threat), option(unknown)):threat_type]
```

## 🎯 Confidence Level
```meta-bind
INPUT[select(option(high), option(medium), option(low), option(unknown)):confidence]
```

## 📊 Actions Taken
`INPUT[toggle:action_required]` **Action Required**
`INPUT[toggle:escalated]` **Escalated**


---

## ✅ Score Evaluation

Use QuickAdd or a button to call Run Score

