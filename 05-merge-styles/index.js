const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const emitter = new EventEmitter;

fs.readdir(path.join(__dirname, './styles'), {withFileTypes: true}, (err, files) => {
  if (err) console.log(err.message);
  const bundle = [];
  let count = 0;
  for (let file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      count++;
  }}
  for (let file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const input = fs.createReadStream(`./05-merge-styles/styles/${file.name}`, 'utf-8');
        let data = '';
        input.on('data', (chank) => data += chank);
        input.on('end', () => {
          bundle.push(data);
          if (bundle.length === count) {
            emitter.emit('endRead')
          }
        })
      }
  }

  emitter.on('endRead', () => {
    const output = fs.createWriteStream('./05-merge-styles/project-dist/bundle.css');
      for (let item of bundle) {
        output.write(item);
      }
  })
})