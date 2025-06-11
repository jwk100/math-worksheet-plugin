/**
 * Math Worksheet Fallback Generator
 * PUT YOUR ORIGINAL CODE FROM PASTE.TXT HERE
 * This is just a simplified version for demo
 */

function generateFallbackProblems(skillId, count) {
  console.log('Fallback generation called for skillId:', skillId, 'count:', count);
  
  const problems = [];
  const answers = [];

  // Simple demo implementation - replace with your full code
  if (skillId === 'counting-to-10' || skillId.includes('counting')) {
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 5) + 1;
      problems.push(`Count the dots: ${'●'.repeat(num)}`);
      answers.push(num.toString());
    }
  } else if (skillId === 'adding-within-10' || skillId.includes('addition')) {
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
  
  return { problems, answers };
}

function getSkillIdFromLevel(level) {
  const levelToSkillMap = {
    1: 'counting-to-10',
    2: 'number-recognition-1-10',
    3: 'counting-to-20',
    9: 'adding-within-5',
    11: 'adding-within-10',
    15: 'adding-within-20',
    21: 'adding-with-regrouping',
    26: 'multiplication-2s'
  };
  
  return levelToSkillMap[level] || 'addition';
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateFallbackProblems, getSkillIdFromLevel };
}

// Export for browser (IMPORTANT - this was missing!)
if (typeof window !== 'undefined') {
  window.generateFallbackProblems = generateFallbackProblems;
  window.getSkillIdFromLevel = getSkillIdFromLevel;
}
