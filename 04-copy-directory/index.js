const fs = require('fs');
const path = require('path');
const { stdout } = process;

fs.mkdir('./04-copy-directory/files-copy', {recursive: true}, (err) => {
  err ? console.log(err.message) : null;
});

fs.readdir(path.join(__dirname, './files'), {withFileTypes: true}, (err, files) => {
  if (err) console.log(err.message);
  for (let file of files) {
      if (err) console.log(err.message);
      if (file.isFile()) {
        fs.copyFile(path.join(__dirname, `./files/${file.name}`), path.join(__dirname, `./files-copy/${file.name}`), err => {
          if (err) console.log(err.message);
        })
      }
  }
})