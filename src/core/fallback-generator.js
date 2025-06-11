/**
 * PrintAcademy AI - Fallback Problem Generator
 * 
 * Generates math problems without external dependencies for all 32 skill levels.
 * Provides instant, reliable worksheet generation when AI is unavailable.
 * 
 * @param {string} skillId - The skill identifier (maps to curriculum levels 1-32)
 * @param {number} count - Number of problems to generate
 * @returns {Object} Object with problems array and answers array
 */
function generateFallbackProblems(skillId, count) {
  console.log('Fallback generation called for skillId:', skillId, 'count:', count);
  
  const problems = [];
  const answers = [];

  // =============================================================================
  // COUNTING SKILLS (Levels 1, 3, 7, 13, 19, 20, 25)
  // =============================================================================
  
  if (skillId === 'first-counting-1-5' || skillId.includes('counting-1-5')) {
    // Level 1: Basic counting with visual aids (PreK)
    const formats = [
      (n) => ({ problem: `Count the dots: ${'●'.repeat(n)}`, answer: n.toString() }),
      (n) => ({ problem: `How many objects: ${'○'.repeat(n)}`, answer: n.toString() }),
      (n) => ({ problem: `Count the stars: ${'★'.repeat(n)}`, answer: n.toString() }),
      (n) => ({ problem: `Count: ${'□'.repeat(n)}`, answer: n.toString() })
    ];
    
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 5) + 1; // 1-5 range
      const formatIndex = i % formats.length; // Cycle through formats for variety
      const { problem, answer } = formats[formatIndex](num);
      problems.push(problem);
      answers.push(answer);
    }
  }
  
  else if (skillId === 'counting-to-10' || skillId === 'counting-1-10') {
    // Level 1: Counting to 10 with missing numbers (PreK)
    for (let i = 0; i < count; i++) {
      const start = Math.floor(Math.random() * 7) + 1; // Start between 1-7
      const missing = start + Math.floor(Math.random() * 3) + 1; // Missing number 2-4 positions ahead
      problems.push(`Continue counting: ${start}, ${start + 1}, ___, ${missing + 1}`);
      answers.push(missing.toString());
    }
  }
  
  else if (skillId === 'counting-to-20') {
    // Level 3: Counting to 20 (Kindergarten)
    for (let i = 0; i < count; i++) {
      const start = Math.floor(Math.random() * 15) + 1; // Start between 1-15
      const missing = start + Math.floor(Math.random() * 4) + 1; // Missing number within range
      problems.push(`Continue: ${start}, ${start + 1}, ___, ${missing + 1}`);
      answers.push(missing.toString());
    }
  }

  // =============================================================================
  // NUMBER RECOGNITION SKILLS (Levels 2, 4, 8, 14)
  // =============================================================================
  
  else if (skillId === 'number-recognition-1-10') {
    // Level 2: Number recognition 1-10 (PreK)
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 10) + 1;
      const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
      problems.push(`What number is this: ${words[num - 1]}`);
      answers.push(num.toString());
    }
  }

  // =============================================================================
  // COMPARISON & PATTERNS (Levels 5, 6)
  // =============================================================================
  
  else if (skillId === 'comparing-numbers') {
    // Number comparison with variety of question types
    const usedPairs = new Set();
    const questionTypes = ['larger', 'smaller', 'compare'];
    
    for (let i = 0; i < count; i++) {
      let a, b, pairKey;
      let attempts = 0;
      
      // Generate unique number pairs to avoid repetition
      do {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 10) + 1;
        while (b === a) b = Math.floor(Math.random() * 10) + 1; // Ensure different numbers
        pairKey = `${Math.min(a, b)}-${Math.max(a, b)}`;
        attempts++;
      } while (usedPairs.has(pairKey) && attempts < 20);
      
      usedPairs.add(pairKey);
      
      // Vary question types for educational diversity
      const typeIndex = i % questionTypes.length;
      if (typeIndex === 0) {
        problems.push(`Which is larger: ${a} or ${b}?`);
        answers.push(Math.max(a, b).toString());
      } else if (typeIndex === 1) {
        problems.push(`Which is smaller: ${a} or ${b}?`);
        answers.push(Math.min(a, b).toString());
      } else {
        problems.push(`${Math.min(a, b)} ___ ${Math.max(a, b)}`);
        answers.push('<');
      }
    }
  }
  
  else if (skillId === 'simple-patterns') {
    // Level 5: Simple AB and ABC patterns (Kindergarten)
    for (let i = 0; i < count; i++) {
      const patterns = [
        {problem: 'Continue: 1, 3, 5, ___', answer: '7'},
        {problem: 'Continue: 2, 4, 6, ___', answer: '8'},
        {problem: 'Pattern: ○●○●___', answer: '○'},
        {problem: 'Continue: A, B, A, B, ___', answer: 'A'}
      ];
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      problems.push(pattern.problem);
      answers.push(pattern.answer);
    }
  }

  // =============================================================================
  // ADDITION SKILLS (Levels 9, 11, 15, 17, 21, 23, 29, 31)
  // =============================================================================
  
  else if (skillId === 'adding-within-3') {
    // Generate all possible combinations for adding within 3, then cycle through them
    const allCombinations = [
      {problem: '0 + 0 =', answer: '0'},
      {problem: '0 + 1 =', answer: '1'},
      {problem: '1 + 0 =', answer: '1'},
      {problem: '0 + 2 =', answer: '2'},
      {problem: '2 + 0 =', answer: '2'},
      {problem: '1 + 1 =', answer: '2'},
      {problem: '0 + 3 =', answer: '3'},
      {problem: '3 + 0 =', answer: '3'},
      {problem: '1 + 2 =', answer: '3'},
      {problem: '2 + 1 =', answer: '3'}
    ];
    
    // Shuffle for variety, then cycle through to ensure comprehensive coverage
    const shuffled = [...allCombinations].sort(() => Math.random() - 0.5);
    for (let i = 0; i < count; i++) {
      const combo = shuffled[i % shuffled.length];
      problems.push(combo.problem);
      answers.push(combo.answer);
    }
  }
  
  else if (skillId === 'adding-within-5') {
    // Level 9: Adding within 5 - comprehensive combinations (Kindergarten)
    const combinations = [];
    for (let a = 0; a <= 5; a++) {
      for (let b = 0; b <= 5 - a; b++) {
        combinations.push({problem: `${a} + ${b} =`, answer: (a + b).toString()});
      }
    }
    const shuffled = [...combinations].sort(() => Math.random() - 0.5);
    for (let i = 0; i < count; i++) {
      const combo = shuffled[i % shuffled.length];
      problems.push(combo.problem);
      answers.push(combo.answer);
    }
  }
  
  else if (skillId === 'adding-within-100-no-regroup' || skillId === 'adding-within-100-with-regroup') {
    // Levels 17, 23: Two-digit addition in vertical format
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 89) + 10; // 10-99 range
      const b = Math.floor(Math.random() * (99 - a)) + 1; // Ensure sum ≤ 99
      const sum = a + b;
      
      // Create vertical format representation for realistic worksheet appearance
      const aStr = a.toString().padStart(2, ' ');
      const bStr = b.toString().padStart(2, ' ');
      const verticalProblem = `  ${aStr}\n+ ${bStr}\n____`;
      
      problems.push(verticalProblem);
      answers.push(sum.toString());
    }
  }

  // =============================================================================
  // SUBTRACTION SKILLS (Levels 10, 12, 16, 18, 22, 24, 30, 32)
  // =============================================================================
  
  else if (skillId === 'subtracting-within-100-no-regroup' || skillId === 'subtracting-within-100-with-regroup') {
    // Levels 18, 24: Two-digit subtraction in vertical format
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 89) + 10; // 10-99 range
      const b = Math.floor(Math.random() * a) + 1; // Ensure b < a for positive results
      const difference = a - b;
      
      // Create vertical format representation
      const aStr = a.toString().padStart(2, ' ');
      const bStr = b.toString().padStart(2, ' ');
      const verticalProblem = `  ${aStr}\n- ${bStr}\n____`;
      
      problems.push(verticalProblem);
      answers.push(difference.toString());
    }
  }

  // =============================================================================
  // SKIP COUNTING (Levels 19, 20, 25)
  // =============================================================================
  
  else if (skillId === 'skip-counting-2s') {
    // Level 19: Skip counting by 2s (1st Grade)
    for (let i = 0; i < count; i++) {
      const start = (Math.floor(Math.random() * 3) + 1) * 2; // Start at 2, 4, or 6
      const sequence = [start, start + 2, start + 4];
      problems.push(`Continue: ${sequence.join(', ')}, ___`);
      answers.push((start + 6).toString());
    }
  }
  
  else if (skillId === 'skip-counting-5s') {
    // Level 20: Skip counting by 5s (1st Grade)
    for (let i = 0; i < count; i++) {
      const start = (Math.floor(Math.random() * 3) + 1) * 5; // Start at 5, 10, or 15
      const sequence = [start, start + 5, start + 10];
      problems.push(`Continue: ${sequence.join(', ')}, ___`);
      answers.push((start + 15).toString());
    }
  }
  
  else if (skillId === 'skip-counting-10s') {
    // Level 25: Skip counting by 10s (2nd Grade)
    for (let i = 0; i < count; i++) {
      const start = (Math.floor(Math.random() * 3) + 1) * 10; // Start at 10, 20, or 30
      const sequence = [start, start + 10, start + 20];
      problems.push(`Continue: ${sequence.join(', ')}, ___`);
      answers.push((start + 30).toString());
    }
  }

  // =============================================================================
  // MULTIPLICATION SKILLS (Levels 26, 27, 28)
  // =============================================================================
  
  else if (skillId === 'multiplication-2s') {
    // Level 26: Multiplication tables for 2 (2nd Grade)
    for (let i = 0; i < count; i++) {
      const factor = Math.floor(Math.random() * 10) + 1; // 1-10
      problems.push(`2 × ${factor} =`);
      answers.push((2 * factor).toString());
    }
  }
  
  else if (skillId === 'multiplication-5s') {
    // Level 27: Multiplication tables for 5 (2nd Grade)
    for (let i = 0; i < count; i++) {
      const factor = Math.floor(Math.random() * 10) + 1; // 1-10
      problems.push(`5 × ${factor} =`);
      answers.push((5 * factor).toString());
    }
  }
  
  else if (skillId === 'multiplication-10s') {
    // Level 28: Multiplication tables for 10 (2nd Grade)
    for (let i = 0; i < count; i++) {
      const factor = Math.floor(Math.random() * 10) + 1; // 1-10
      problems.push(`10 × ${factor} =`);
      answers.push((10 * factor).toString());
    }
  }

  // =============================================================================
  // ADVANCED CONCEPTS (Place Value, Fractions, Division)
  // =============================================================================
  
  else if (skillId === 'place-value-basics') {
    // Place value decomposition for two-digit numbers
    for (let i = 0; i < count; i++) {
      const num = Math.floor(Math.random() * 90) + 10; // 10-99
      const tens = Math.floor(num / 10);
      const ones = num % 10;
      problems.push(`${num} = ___ tens + ___ ones`);
      answers.push(`${tens} tens + ${ones} ones`);
    }
  }
  
  else if (skillId === 'fractions-introduction') {
    // Basic fraction concepts with visual representations
    for (let i = 0; i < count; i++) {
      const fractions = [
        {problem: 'What fraction is shaded: ■■□□', answer: '1/2'},
        {problem: 'What fraction is shaded: ■□□□', answer: '1/4'},
        {problem: '1/2 + 1/2 =', answer: '1'},
        {problem: '1/4 + 1/4 =', answer: '1/2'}
      ];
      const frac = fractions[Math.floor(Math.random() * fractions.length)];
      problems.push(frac.problem);
      answers.push(frac.answer);
    }
  }
  
  else if (skillId === 'division-with-remainders') {
    // Division problems that may have remainders
    for (let i = 0; i < count; i++) {
      const divisor = Math.floor(Math.random() * 8) + 2; // 2-9
      const quotient = Math.floor(Math.random() * 8) + 1; // 1-8
      const remainder = Math.floor(Math.random() * (divisor - 1)); // 0 to divisor-1
      const dividend = divisor * quotient + remainder;
      problems.push(`${dividend} ÷ ${divisor} = ___ R ___`);
      answers.push(`${quotient} R ${remainder}`);
    }
  }

  // =============================================================================
  // WORD PROBLEMS & ADVANCED PROBLEM SOLVING
  // =============================================================================
  
  else if (skillId === 'advanced-problem-solving') {
    // Multi-step word problems requiring reasoning
    for (let i = 0; i < count; i++) {
      const wordProblems = [
        {problem: 'Sara has 8 stickers. She gives 3 to Tom. How many does she have left?', answer: '5'},
        {problem: 'There are 12 apples. 4 are red, the rest are green. How many green apples?', answer: '8'},
        {problem: 'Mark buys 3 packs of 4 pencils each. How many pencils total?', answer: '12'},
        {problem: 'A box has 15 crayons. 6 are broken. How many are not broken?', answer: '9'},
        {problem: 'Emma reads 2 books each week. How many books in 4 weeks?', answer: '8'}
      ];
      const wp = wordProblems[Math.floor(Math.random() * wordProblems.length)];
      problems.push(wp.problem);
      answers.push(wp.answer);
    }
  }

  // =============================================================================
  // GENERAL PATTERN MATCHING FALLBACKS
  // These catch skill IDs that match general patterns but aren't specifically handled above
  // =============================================================================
  
  else if (skillId.includes('addition') || skillId.includes('add')) {
    // General addition fallback for any addition-related skill
    console.log('Matched addition pattern');
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 20) + 1;
      const b = Math.floor(Math.random() * 20) + 1;
      problems.push(`${a} + ${b} =`);
      answers.push((a + b).toString());
    }
  }
  
  else if (skillId.includes('subtraction') || skillId.includes('subtract')) {
    // General subtraction fallback
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 30) + 10; // Start with larger number
      const b = Math.floor(Math.random() * a) + 1; // Subtract smaller number
      problems.push(`${a} - ${b} =`);
      answers.push((a - b).toString());
    }
  }
  
  else if (skillId.includes('multiplication') || skillId.includes('multiply')) {
    // General multiplication fallback
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 12) + 1;
      const b = Math.floor(Math.random() * 12) + 1;
      problems.push(`${a} × ${b} =`);
      answers.push((a * b).toString());
    }
  }
  
  else if (skillId.includes('division') || skillId.includes('divide')) {
    // General division fallback (even division, no remainders)
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * 12) + 1;
      const b = Math.floor(Math.random() * 12) + 1;
      const dividend = a * b; // Ensures even division
      problems.push(`${dividend} ÷ ${b} =`);
      answers.push(a.toString());
    }
  }
  
  else if (skillId.includes('counting')) {
    // General counting fallback
    for (let i = 0; i < count; i++) {
      const start = Math.floor(Math.random() * 10) + 1;
      const missing = start + Math.floor(Math.random() * 5) + 2;
      problems.push(`Count: ${start}, ${start + 1}, ___, ${missing + 1}`);
      answers.push(missing.toString());
    }
  }

  // =============================================================================
  // DEFAULT FALLBACK
  // If no patterns match, provide basic arithmetic suitable for most levels
  // =============================================================================
  
  else {
    console.log('Using default arithmetic for skillId:', skillId);
    // Default to simple addition for any unrecognized skill
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

/**
 * Maps PrintAcademy skill levels (1-32) to internal skill IDs
 * This ensures the fallback generator gets the correct skill type
 */
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
  
  return levelToSkillMap[level] || 'addition'; // Default to addition if level not found
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
