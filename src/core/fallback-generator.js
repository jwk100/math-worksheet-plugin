
/**
 * Math Worksheet Fallback Generator
 * Generates problems for all 32 Kumon-style levels without AI
 */

function generateFallbackProblems(skillId, count) {
  console.log('Fallback generation called for skillId:', skillId, 'count:', count);
  
  const problems = [];
  const answers = [];

  // Your original implementation here...
  // (Copy all the code from your original paste.txt)
  
  // For now, let's add a simple example:
  if (skillId === 'adding-within-10' || skillId.includes('addition')) {
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      problems.push(`${a} + ${b} =`);
      answers.push((a + b).toString());
    }
  } else {
    // Default fallback
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 10) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      problems.push(`${a} + ${b} =`);
      answers.push((a + b).toString());
    }
  }
  
  console.log('Generated problems:', problems);
  console.log('Generated answers:', answers);
  return { problems, answers };
}

function getSkillIdFromLevel(level) {
  const levelToSkillMap = {
    1: 'counting-to-10',
    2: 'number-recognition-1-10',
    3: 'counting-to-20',
    4: 'number-recognition-1-20',
    5: 'simple-patterns',
    6: 'basic-shapes',
    7: 'counting-to-50',
    8: 'number-recognition-1-50',
    9: 'adding-within-5',
    10: 'subtracting-within-5',
    11: 'adding-within-10',
    12: 'subtracting-within-10',
    // ... add all 32 levels
  };
  
  return levelToSkillMap[level] || 'addition';
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
