const fs = require('fs');
const { stdout } = process;
const path = require('path');
const input = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

input.on('data', chunk => stdout.write(chunk));