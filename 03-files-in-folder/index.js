const fs = require('fs');
const path = require('path');
const { stdout } = process;

fs.readdir(path.join(__dirname, './secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) console.log(err.message);
  for (let file of files) {
      fs.stat(path.join(__dirname, `./secret-folder/${file.name}`), (err, data) => {
      if (err) console.log(err.message);
      let size = data.size;
      let filename = path.parse(path.join(__dirname, `./secret-folder/${file.name}`)).name;
      if (file.isFile()) {
        stdout.write(`${filename} - ${path.extname(file.name)} - ${size}b \n`);
      }
    })
  }
})
