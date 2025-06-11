/**
 * Main entry point for the Math Worksheet Plugin
 */

// Import core modules
const { generateFallbackProblems, getSkillIdFromLevel } = require('./core/fallback-generator.js');
const { MathWorksheetPlugin, createWorksheetGenerator } = require('./integrations/plugin-interface.js');

// Main exports
module.exports = {
  // Core functions
  generateFallbackProblems,
  getSkillIdFromLevel,
  
  // Main plugin class
  MathWorksheetPlugin,
  
  // Easy-to-use wrapper
  createWorksheetGenerator,
  
  // Quick generate function
  async generateWorksheet(level, count = 20) {
    const generator = createWorksheetGenerator();
    return await generator.generate(level, count);
  }
};
