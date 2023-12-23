const fs = require('fs');

const filePath = './.env'; 

try {
    const stats = fs.statSync(filePath);

    console.log(stats);
} catch (error) {
    console.error('Error reading the file:', error.message);
}
