---
event_id: TRIAGE-<% tp.date.now("YYYYMMDD-HHmm") %>
date: <% tp.date.now("YYYY-MM-DD") %>
impact_level: unknown
department: []
threat_type: unknown
confidence: unknown
score: 0
---

# 🛡️ Cybersecurity Triage Note

## Impact Level
```meta-bind
INPUT[select(impact_level, option(critical), option(high), option(moderate), option(low), option(unknown)):select]
```

## Department
```meta-bind
INPUT[multiSelect(department, option(IT), option(Finance), option(All)):multiSelect]
```

## Threat Type
```meta-bind
INPUT[select(threat_type, option(ransomware), option(phishing), option(unknown)):select]
```

## Confidence
```meta-bind
INPUT[select(confidence, option(high), option(medium), option(low), option(unknown)):select]
```

## Summary
```meta-bind
INPUT[textArea(summary, class(meta-bind-full-width), class(meta-bind-high)):textArea]
```
