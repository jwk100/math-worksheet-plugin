#!/bin/bash

# Math Worksheet Plugin - Easy Setup Script
# Run this in your math-worksheet-plugin folder

echo "🚀 Setting up Math Worksheet Plugin..."

# Create directory structure
mkdir -p src/core src/integrations src/utils examples dist docs tests

echo "📁 Created folder structure"

# Create package.json
cat > package.json << 'EOF'
{
  "name": "math-worksheet-plugin",
  "version": "1.0.0", 
  "description": "Drop-in math worksheet generator for existing chat/PDF websites",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "demo": "python -m http.server 8000"
  },
  "keywords": ["math", "worksheet", "education", "pdf", "chat", "plugin"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {},
  "peerDependencies": {
    "html2pdf.js": "^0.10.1"
  }
}
EOF

echo "📦 Created package.json"

# Create main index file
cat > src/index.js << 'EOF'
/**
 * Math Worksheet Plugin - Main Entry Point
 */

// Import modules (for Node.js)
const { generateFallbackProblems, getSkillIdFromLevel } = 
  typeof require !== 'undefined' 
    ? require('./core/fallback-generator.js')
    : window;

const { MathWorksheetPlugin, createWorksheetGenerator } = 
  typeof require !== 'undefined'
    ? require('./integrations/plugin-interface.js') 
    : window;

// Quick generate function
async function generateWorksheet(level, count = 20) {
  const generator = createWorksheetGenerator();
  return await generator.generate(level, count);
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateFallbackProblems,
    getSkillIdFromLevel,
    MathWorksheetPlugin,
    createWorksheetGenerator,
    generateWorksheet
  };
}

// Export for browser
if (typeof window !== 'undefined') {
  window.MathWorksheetPlugin = {
    generateFallbackProblems,
    getSkillIdFromLevel,
    MathWorksheetPlugin,
    createWorksheetGenerator,
    generateWorksheet
  };
}
EOF

echo "📄 Created src/index.js"

# Create fallback generator (placeholder - user will add their code)
cat > src/core/fallback-generator.js << 'EOF'
/**
 * Math Worksheet Fallback Generator
 * 
 * TODO: Replace this with your original fallback generator code from paste.txt
 */

function generateFallbackProblems(skillId, count) {
  console.log('Generating', count, 'problems for', skillId);
  
  const problems = [];
  const answers = [];

  // Simple demo - replace with your full implementation
  for (let i = 0; i < count; i++) {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    problems.push(`${a} + ${b} =`);
    answers.push((a + b).toString());
  }
  
  return { problems, answers };
}

function getSkillIdFromLevel(level) {
  const skillMap = {
    1: 'counting-to-10',
    11: 'adding-within-10', 
    15: 'adding-within-20',
    21: 'adding-with-regrouping'
  };
  return skillMap[level] || 'addition';
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateFallbackProblems, getSkillIdFromLevel };
}

// Export for browser  
if (typeof window !== 'undefined') {
  window.generateFallbackProblems = generateFallbackProblems;
  window.getSkillIdFromLevel = getSkillIdFromLevel;
}
EOF

echo "🧮 Created fallback generator (add your code here)"

# Create plugin interface
cat > src/integrations/plugin-interface.js << 'EOF'
/**
 * Main Plugin Interface for Easy Integration
 */

// Import fallback generator
const { generateFallbackProblems, getSkillIdFromLevel } = 
  typeof require !== 'undefined' 
    ? require('../core/fallback-generator.js')
    : window;

class MathWorksheetPlugin {
  constructor(options = {}) {
    this.config = {
      enableAI: false,
      defaultLevel: 11,
      maxProblems: 50,
      ...options
    };
  }

  async generateWorksheet(request) {
    const level = request.level || this.config.defaultLevel;
    const count = request.count || this.getDefaultCount(level);
    const skillId = getSkillIdFromLevel(level);
    
    const { problems, answers } = generateFallbackProblems(skillId, count);
    
    return {
      problems,
      answers,
      metadata: {
        level,
        skillName: this.getSkillName(level),
        tier: 1,
        generationTime: 50,
        problemCount: problems.length
      }
    };
  }

  generateHTML(worksheetData) {
    const { problems, answers, metadata } = worksheetData;
    const config = this.getLayoutConfig(metadata.level);
    
    const problemsHTML = problems.map((problem, index) => `
      <div class="problem">
        <span class="problem-number">${index + 1}.</span>
        <span class="problem-text">${problem}</span>
      </div>
    `).join('');

    return `
      <div class="worksheet" style="font-family: Arial, sans-serif; max-width: 8.5in; margin: 0 auto; padding: 40px;">
        <div class="header" style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 15px;">
          <h1>${metadata.skillName}</h1>
          <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666;">
            <span>Name: ___________________</span>
            <span>Level ${metadata.level}</span>
            <span>Date: ___________________</span>
          </div>
        </div>
        
        <div class="problems-grid" style="display: grid; grid-template-columns: repeat(${config.columns}, 1fr); gap: 20px;">
          ${problemsHTML}
        </div>
      </div>
      
      <style>
        .problem { font-size: ${config.fontSize}px; padding: 15px; border: 1px solid #eee; border-radius: 8px; background: #fafafa; }
        .problem-number { font-weight: bold; margin-right: 8px; }
        @media print { @page { margin: 0.5in; } }
      </style>
    `;
  }

  getSkillName(level) {
    const skills = {
      1: "Counting to 10",
      11: "Adding Within 10", 
      15: "Adding Within 20",
      21: "Adding with Regrouping"
    };
    return skills[level] || `Level ${level} Math`;
  }

  getDefaultCount(level) {
    return level <= 10 ? 8 : 20;
  }

  getLayoutConfig(level) {
    return {
      fontSize: level <= 10 ? 20 : 16,
      columns: level <= 10 ? 2 : 4
    };
  }
}

function createWorksheetGenerator(options = {}) {
  const plugin = new MathWorksheetPlugin(options);
  
  return {
    async generate(level, count) {
      const worksheet = await plugin.generateWorksheet({ level, count });
      const html = plugin.generateHTML(worksheet);
      return { worksheet, html };
    }
  };
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MathWorksheetPlugin, createWorksheetGenerator };
}

// Export for browser
if (typeof window !== 'undefined') {
  window.MathWorksheetPlugin = MathWorksheetPlugin;
  window.createWorksheetGenerator = createWorksheetGenerator;
}
EOF

echo "🔌 Created plugin interface"

# Create demo HTML
cat > examples/basic-usage.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Math Worksheet Plugin Demo</title>
    
    <script src="../src/core/fallback-generator.js"></script>
    <script src="../src/integrations/plugin-interface.js"></script>
    
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .controls { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        select, input, button { padding: 8px; margin: 5px; }
        button { background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #005fa3; }
        #output { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>🧮 Math Worksheet Generator Demo</h1>
    
    <div class="controls">
        <h3>Generate Worksheet</h3>
        <label>Level: 
            <select id="level">
                <option value="1">Level 1: Counting to 10</option>
                <option value="11" selected>Level 11: Adding Within 10</option>
                <option value="15">Level 15: Adding Within 20</option>
                <option value="21">Level 21: Addition with Regrouping</option>
            </select>
        </label>
        <label>Problems: 
            <input type="number" id="count" value="10" min="1" max="50">
        </label>
        <button onclick="generateWorksheet()">Generate Worksheet</button>
    </div>
    
    <div id="output">
        <p>Click "Generate Worksheet" to see your math problems!</p>
    </div>

    <script>
        function generateWorksheet() {
            const level = parseInt(document.getElementById('level').value);
            const count = parseInt(document.getElementById('count').value);
            
            const generator = createWorksheetGenerator();
            generator.generate(level, count).then(result => {
                document.getElementById('output').innerHTML = result.html;
            });
        }
        
        // Generate initial worksheet
        generateWorksheet();
    </script>
</body>
</html>
EOF

echo "🌐 Created demo page"

# Create README
cat > README.md << 'EOF'
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
```

### Node.js  
```javascript
const { generateWorksheet } = require('./src/index.js');

generateWorksheet(11, 20).then(result => {
  console.log(result.worksheet.problems);
});
```

## 📖 Demo

Open `examples/basic-usage.html` in your browser to see it in action!

## 🎯 Supported Levels

| Level | Skill | Grade |
|-------|-------|-------|
| 1-2 | Counting & Number Recognition | PreK |
| 3-10 | Basic Addition & Subtraction | Kindergarten |  
| 11-20 | Advanced Addition & Subtraction | 1st Grade |
| 21-28 | Regrouping & Multiplication | 2nd Grade |
| 29-32 | Three-Digit Arithmetic | 3rd Grade |

## 🔧 Setup Instructions

1. **Replace the placeholder code** in `src/core/fallback-generator.js` with your original fallback generator
2. **Test the demo** by opening `examples/basic-usage.html`
3. **Integrate** into your existing website using the examples

## 📄 License

MIT License - Feel free to use in any project!
EOF

echo "📖 Created README"

echo ""
echo "✅ Setup complete! Your project structure:"
echo ""
tree . 2>/dev/null || find . -type f -name "*.js" -o -name "*.html" -o -name "*.json" -o -name "*.md" | head -10
echo ""
echo "🚀 Next steps:"
echo "1. Replace the code in src/core/fallback-generator.js with your original code"
echo "2. Test by opening examples/basic-usage.html in your browser"
echo "3. Commit to GitHub: git add . && git commit -m 'Initial setup' && git push"
echo ""
echo "🎉 You're ready to go!"
