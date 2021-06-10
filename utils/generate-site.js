const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if error, reject Promise, send error to Promise's catch method
            if(err) {
                reject(err);
                //return out of the fcn to make sure Promise doesn't accidentally excecute resolve method too
                return;
            }

            //if things went well, resolve Promise, send successful data to then method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if(err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File copied!'
            });
        });
    });
}

module.exports = {writeFile, copyFile};