const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const emitter = new EventEmitter;

fs.mkdir('./06-build-page//project-dist/assets/fonts', {recursive: true}, (err) => {
  err ? console.log(err.message) : null;
  fs.readdir(path.join(__dirname, './assets/fonts'), {withFileTypes: true}, (err, files) => {
    if (err) console.log(err.message);
    for (let file of files) {
        if (err) console.log(err.message);
        if (file.isFile()) {
          fs.copyFile(path.join(__dirname, `./assets/fonts/${file.name}`), path.join(__dirname, `./project-dist/assets/fonts/${file.name}`), err => {
            if (err) console.log(err.message);
          })
        }
    }
  })
});
fs.mkdir('./06-build-page//project-dist/assets/img', {recursive: true}, (err) => {
  err ? console.log(err.message) : null;
  fs.readdir(path.join(__dirname, './assets/img'), {withFileTypes: true}, (err, files) => {
    if (err) console.log(err.message);
    for (let file of files) {
        if (err) console.log(err.message);
        if (file.isFile()) {
          fs.copyFile(path.join(__dirname, `./assets/img/${file.name}`), path.join(__dirname, `./project-dist/assets/img/${file.name}`), err => {
            if (err) console.log(err.message);
          })
        }
    }
  })
});
fs.mkdir('./06-build-page//project-dist/assets/svg', {recursive: true}, (err) => {
  err ? console.log(err.message) : null;
  fs.readdir(path.join(__dirname, './assets/svg'), {withFileTypes: true}, (err, files) => {
    if (err) console.log(err.message);
    for (let file of files) {
        if (err) console.log(err.message);
        if (file.isFile()) {
          fs.copyFile(path.join(__dirname, `./assets/svg/${file.name}`), path.join(__dirname, `./project-dist/assets/svg/${file.name}`), err => {
            if (err) console.log(err.message);
          })
        }
    }
  })
});

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
        const input = fs.createReadStream(`./06-build-page/styles/${file.name}`, 'utf-8');
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
    const output = fs.createWriteStream('./06-build-page/project-dist/style.css');
      for (let item of bundle) {
        output.write(item);
      }
  })
})

const input = fs.createReadStream(`./06-build-page/template.html`, 'utf-8');
let data = '';
input.on('data', (chank) => data += chank);
input.on('end', () => {
  let template = data;
  fs.readdir(path.join(__dirname, './components'), {withFileTypes: true}, (err, files) => {
    if (err) console.log(err.message);
    let count = 0;
    for (let file of files) {
        if (err) console.log(err.message);
        if (file.isFile()) {
          let componentName = path.parse(path.join(__dirname, `./components/${file.name}`)).name;
          const componentStream = fs.createReadStream(`./06-build-page/components/${file.name}`, 'utf-8');
          let data = '';
          componentStream.on('data', (chank) => data += chank);
          componentStream.on('end', () => {
            let component = data;
            template = template.toString().replace(`{{${componentName}}}`, component);
            count++;
            if (files.length === count) {
              emitter.emit('endTemplate');
            }
          });
        }
    }
    emitter.on('endTemplate', () => {
      const output = fs.createWriteStream('./06-build-page/project-dist/index.html');
      output.write(template);
      })
  })
});