/**
 * Main Plugin Interface for Easy Integration
 * FIXED VERSION - Works in browser and Node.js
 */

// Import fallback generator (works in both environments)
let generateFallbackProblems, getSkillIdFromLevel;

if (typeof require !== 'undefined') {
  // Node.js environment
  ({ generateFallbackProblems, getSkillIdFromLevel } = require('../core/fallback-generator.js'));
} else {
  // Browser environment - functions should be on window
  generateFallbackProblems = window.generateFallbackProblems;
  getSkillIdFromLevel = window.getSkillIdFromLevel;
}

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
        <span class="problem-text">${problem.replace(/\n/g, '<br>')}</span>
      </div>
    `).join('');

    return `
      <div class="worksheet" style="
        font-family: Arial, sans-serif;
        max-width: 8.5in;
        margin: 0 auto;
        padding: 40px;
        background: white;
      ">
        <div class="header" style="
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #333;
          padding-bottom: 15px;
        ">
          <h1 style="font-size: 24px; margin-bottom: 5px;">${metadata.skillName}</h1>
          <div style="display: flex; justify-content: space-between; font-size: 14px; color: #666;">
            <span>Name: ___________________</span>
            <span>Level ${metadata.level}</span>
            <span>Date: ___________________</span>
          </div>
        </div>
        
        <div class="problems-grid" style="
          display: grid;
          grid-template-columns: repeat(${config.columns}, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        ">
          ${problemsHTML}
        </div>
      </div>
      
      <style>
        .problem {
          font-size: ${config.fontSize}px;
          line-height: 1.6;
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
          background: #fafafa;
          min-height: 60px;
        }
        .problem-number {
          font-weight: bold;
          margin-right: 8px;
          color: #007acc;
        }
        .problem-text {
          font-family: monospace;
        }
        @media print {
          @page { margin: 0.5in; }
          .worksheet { padding: 20px; }
        }
      </style>
    `;
  }

  getSkillName(level) {
    const skills = {
      1: "Counting to 10",
      2: "Number Recognition 1-10", 
      3: "Counting to 20",
      9: "Adding Within 5",
      11: "Adding Within 10",
      15: "Adding Within 20",
      21: "Adding With Regrouping",
      26: "Multiplication 2s"
    };
    return skills[level] || `Level ${level} Math`;
  }

  getDefaultCount(level) {
    return level <= 10 ? 8 : level <= 20 ? 20 : 25;
  }

  getLayoutConfig(level) {
    return {
      fontSize: level <= 10 ? 20 : level <= 20 ? 18 : 16,
      columns: level <= 10 ? 2 : level <= 20 ? 4 : 5
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

// Export for browser (IMPORTANT!)
if (typeof window !== 'undefined') {
  window.MathWorksheetPlugin = MathWorksheetPlugin;
  window.createWorksheetGenerator = createWorksheetGenerator;
}
