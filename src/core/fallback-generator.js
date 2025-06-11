/**
 * Math Worksheet Fallback Generator
 * COMPLETE VERSION - Supports all 32 levels
 * 
 * TODO: Replace the demo implementations with your original complete code
 */

function generateFallbackProblems(skillId, count) {
  console.log('Fallback generation called for skillId:', skillId, 'count:', count);
  
  const problems = [];
  const answers = [];

  // =============================================================================
  // DEMO IMPLEMENTATIONS (Replace with your original code)
  // =============================================================================
  
  if (skillId === 'counting-to-10' || skillId === 'counting-1-10') {
    // Level 1: Basic counting
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 5) + 1;
      problems.push(`Count the dots: ${'●'.repeat(num)}`);
      answers.push(num.toString());
    }
  }
  
  else if (skillId === 'number-recognition-1-10') {
    // Level 2: Number recognition
    const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 10) + 1;
      problems.push(`What number is this: ${words[num - 1]}`);
      answers.push(num.toString());
    }
  }
  
  else if (skillId === 'counting-to-20') {
    // Level 3: Counting to 20
    for (let i = 0; i < count; i++) {
      const start = Math.floor(Math.random() * 15) + 1;
      const missing = start + Math.floor(Math.random() * 3) + 1;
      problems.push(`Continue: ${start}, ${start + 1}, ___, ${missing + 1}`);
      answers.push(missing.toString());
    }
  }
  
  else if (skillId === 'simple-patterns') {
    // Level 5: Pattern completion
    const patterns = [
      {problem: 'Continue: 1, 3, 5, ___', answer: '7'},
      {problem: 'Continue: 2, 4, 6, ___', answer: '8'},
      {problem: 'Pattern: ○●○●___', answer: '○'},
      {problem: 'Continue: A, B, A, B, ___', answer: 'A'}
    ];
    for (let i = 0; i < count; i++) {
      const pattern = patterns[i % patterns.length];
      problems.push(pattern.problem);
      answers.push(pattern.answer);
    }
  }
  
  else if (skillId === 'basic-shapes') {
    // Level 6: Shape identification
    const shapes = [
      {problem: 'What shape is this: ○', answer: 'circle'},
      {problem: 'What shape is this: △', answer: 'triangle'},
      {problem: 'What shape is this: □', answer: 'square'},
      {problem: 'How many sides does a triangle have?', answer: '3'},
      {problem: 'How many sides does a square have?', answer: '4'}
    ];
    for (let i = 0; i < count; i++) {
      const shape = shapes[i % shapes.length];
      problems.push(shape.problem);
      answers.push(shape.answer);
    }
  }
  
  else if (skillId === 'skip-counting-2s') {
    // Level 19: Skip counting by 2s
    for (let i = 0; i < count; i++) {
      const start = (Math.floor(Math.random() * 3) + 1) * 2;
      problems.push(`Continue: ${start}, ${start + 2}, ${start + 4}, ___`);
      answers.push((start + 6).toString());
    }
  }
  
  else if (skillId === 'skip-counting-5s') {
    // Level 20: Skip counting by 5s
    for (let i = 0; i < count; i++) {
      const start = (Math.floor(Math.random() * 3) + 1) * 5;
      problems.push(`Continue: ${start}, ${start + 5}, ${start + 10}, ___`);
      answers.push((start + 15).toString());
    }
  }
  
  else if (skillId === 'skip-counting-10s') {
    // Level 25: Skip counting by 10s
    for (let i = 0; i < count; i++) {
      const start = (Math.floor(Math.random() * 3) + 1) * 10;
      problems.push(`Continue: ${start}, ${start + 10}, ${start + 20}, ___`);
      answers.push((start + 30).toString());
    }
  }
  
  else if (skillId === 'multiplication-2s') {
    // Level 26: Multiplication by 2
    for (let i = 0; i < count; i++) {
      const factor = Math.floor(Math.random() * 10) + 1;
      problems.push(`2 × ${factor} =`);
      answers.push((2 * factor).toString());
    }
  }
  
  else if (skillId === 'multiplication-5s') {
    // Level 27: Multiplication by 5
    for (let i = 0; i < count; i++) {
      const factor = Math.floor(Math.random() * 10) + 1;
      problems.push(`5 × ${factor} =`);
      answers.push((5 * factor).toString());
    }
  }
  
  else if (skillId === 'multiplication-10s') {
    // Level 28: Multiplication by 10
    for (let i = 0; i < count; i++) {
      const factor = Math.floor(Math.random() * 10) + 1;
      problems.push(`10 × ${factor} =`);
      answers.push((10 * factor).toString());
    }
  }
  
  // =============================================================================
  // PATTERN FALLBACKS - Handle categories of problems
  // =============================================================================
  
  else if (skillId.includes('addition') || skillId.includes('adding')) {
    // General addition problems
    const maxNum = skillId.includes('within-5') ? 5 : 
                   skillId.includes('within-10') ? 10 :
                   skillId.includes('within-20') ? 20 :
                   skillId.includes('within-100') ? 99 : 10;
    
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * maxNum) + 1;
      const b = Math.floor(Math.random() * (maxNum - a)) + 1;
      problems.push(`${a} + ${b} =`);
      answers.push((a + b).toString());
    }
  }
  
  else if (skillId.includes('subtraction') || skillId.includes('subtracting')) {
    // General subtraction problems
    const maxNum = skillId.includes('within-5') ? 5 : 
                   skillId.includes('within-10') ? 10 :
                   skillId.includes('within-20') ? 20 :
                   skillId.includes('within-100') ? 99 : 10;
    
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * maxNum) + 1;
      const b = Math.floor(Math.random() * a) + 1;
      problems.push(`${a} - ${b} =`);
      answers.push((a - b).toString());
    }
  }
  
  else if (skillId.includes('counting')) {
    // General counting problems
    for (let i = 0; i < count; i++) {
      const start = Math.floor(Math.random() * 10) + 1;
      const missing = start + Math.floor(Math.random() * 5) + 2;
      problems.push(`Count: ${start}, ${start + 1}, ___, ${missing + 1}`);
      answers.push(missing.toString());
    }
  }
  
  else if (skillId.includes('number-recognition')) {
    // General number recognition
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 20) + 1;
      problems.push(`What number comes after ${num - 1}?`);
      answers.push(num.toString());
    }
  }
  
  // =============================================================================
  // DEFAULT FALLBACK - Works for any unrecognized skill
  // =============================================================================
  
  else {
    console.log('Using default arithmetic for skillId:', skillId);
    // Default to simple addition
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 15) + 1;
      const b = Math.floor(Math.random() * 15) + 1;
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
    // PreK (Ages 3-4)
    1: 'counting-to-10',
    2: 'number-recognition-1-10',
    
    // Kindergarten (Ages 5-6) 
    3: 'counting-to-20',
    4: 'number-recognition-1-20',
    5: 'simple-patterns',
    6: 'basic-shapes',
    7: 'counting-to-50',
    8: 'number-recognition-1-50',
    9: 'adding-within-5',
    10: 'subtracting-within-5',
    
    // 1st Grade (Ages 6-7)
    11: 'adding-within-10',
    12: 'subtracting-within-10', 
    13: 'counting-to-100',
    14: 'number-recognition-1-100',
    15: 'adding-within-20-no-regroup',
    16: 'subtracting-within-20-no-regroup',
    17: 'adding-within-100-no-regroup',
    18: 'subtracting-within-100-no-regroup',
    19: 'skip-counting-2s',
    20: 'skip-counting-5s',
    
    // 2nd Grade (Ages 7-8)
    21: 'adding-within-20-with-regroup',
    22: 'subtracting-within-20-with-regroup',
    23: 'adding-within-100-with-regroup',
    24: 'subtracting-within-100-with-regroup', 
    25: 'skip-counting-10s',
    26: 'multiplication-2s',
    27: 'multiplication-5s',
    28: 'multiplication-10s',
    
    // 3rd Grade (Ages 8-9)
    29: 'adding-within-1000-no-regroup',
    30: 'subtracting-within-1000-no-regroup',
    31: 'adding-within-1000-with-regroup',
    32: 'subtracting-within-1000-with-regroup'
  };
  
  return levelToSkillMap[level] || 'addition';
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateFallbackProblems, getSkillIdFromLevel };
}

// Export for browser (IMPORTANT!)
if (typeof window !== 'undefined') {
  window.generateFallbackProblems = generateFallbackProblems;
  window.getSkillIdFromLevel = getSkillIdFromLevel;
}
