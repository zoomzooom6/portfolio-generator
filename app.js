const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js')

// const pageHTML = generatePage(name, github);

// const [name, github] = profileDataArgs;

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github username (Required):',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your Github username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?"',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
};

const promptProject = portfolioData => {
    //if no projects array, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }    
    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projName => {
                if (projName) {
                    return true;
                } else {
                    console.log('Please enter a project name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provde a description of the project (Required):',
            validate: projDesc => {
                if (projDesc) {
                    return true;
                } else {
                    console.log('Please provide a project description');
                }
            }
        },
        {
            type: 'input',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)', 
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node', 'SQL']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project (Required):',
            validate: projLink => {
                if (projLink) {
                    return true;
                } else {
                    console.log('Please provide a link to your project');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        fs.writeFile('./dist/index.html', pageHTML, err => {
            if (err) throw new Error(err);
        })
    });
// fs.writeFile('index.html', pageHTML, err => {
//     if(err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// })

//Section 9.1
// const profileDataArgs = process.argv.slice(2, process.argv.length);

// const printProfileData = profileDataArr => {
//     profileDataArr.forEach((profileItem) => console.log(profileItem));
// };

// printProfileData(profileDataArgs); 