const fs = require('fs');

const filePath = './.env'; 

try {
    const state = fs.statSync(filePath);

    console.log(state);
} catch (error) {
    console.error('Error reading the file:', error.message);
}
