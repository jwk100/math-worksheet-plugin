# 🧮 Math Worksheet Plugin

Drop-in math worksheet generator for existing chat/PDF websites. Supports all 32 Kumon-style levels from PreK to 3rd grade.

## ✨ Features

- 🚀 **Instant Generation**: 99% of worksheets generate in <100ms
- 📚 **Complete Coverage**: All 32 educational levels (PreK to 3rd grade)
- 🔌 **Easy Integration**: Drop into existing chat/PDF systems
- 💰 **Zero Cost**: No AI required for standard worksheets  
- 📱 **Works Everywhere**: Browser, Node.js, React, WordPress, etc.

## 🚀 Quick Start

### Browser
```html
<script src="src/core/fallback-generator.js"></script>
<script src="src/integrations/plugin-interface.js"></script>
<script>
  const generator = createWorksheetGenerator();
  generator.generate(11, 20).then(result => {
    document.body.innerHTML = result.html;
  });
</script>
