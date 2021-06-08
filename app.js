const fs = require('fs');
const generatePage = require('./src/page-template.js')

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

fs.writeFile('index.html', generatePage(name, github), err => {
    if(err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!');
})

//Section 9.1
/*const profileDataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = profileDataArr => {
    profileDataArr.forEach((profileItem) => console.log(profileItem));
};

printProfileData(profileDataArgs); */