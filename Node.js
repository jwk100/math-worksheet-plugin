const { generateWorksheet } = require('math-worksheet-plugin');

const result = await generateWorksheet(11, 20);
console.log(result.worksheet.problems);
