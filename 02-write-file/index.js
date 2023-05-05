const fs = require('fs');
const { stdin, stdout } = process;

fs.writeFile('./02-write-file/text.txt', '', error => {
  error ? console.log(error.message) : null;
});

stdout.write('Write message!\n');
const writeStream = fs.createWriteStream('./02-write-file/text.txt');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    writeStream.write(data.toString());
  }
});

process.on('exit', () => stdout.write('Thank you! Goodbye!'));
process.on('SIGINT', () => {
  process.exit();
});