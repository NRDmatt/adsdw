const fs = require('fs');
const inquirer = require('inquirer');
const generateHTML = require('./src/generateHTML.cjs');
const Manager = require('./lib/Manager.cjs');
const Engineer = require('./lib/Engineer.cjs');
const Intern = require('./lib/Intern.cjs');
const express = require('express');
const app = express();
const port = 3001;

const team = [];

app.get('/', (req, res) => {
  res.send('Hello, World!');
}); 

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


// Prompt user for team manager's information
inquirer.prompt([
  {
    type: 'input',
    message: "What is the team manager's name?",
    name: 'name',
  },
  {
    type: 'input',
    message: "What is the team manager's ID?",
    name: 'id',
  },
  {
    type: 'input',
    message: "What is the team manager's email?",
    name: 'email',
  },
  {
    type: 'input',
    message: "What is the team manager's office number?",
    name: 'officeNumber',
  },
])
  .then((managerAnswers) => {
    // Create a manager object with the user's input
    const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.officeNumber);
    // Array to store all team members
    const teamMembers = [manager];
  
    // Function to prompt user for adding a team member
    // Function to prompt user for adding a team member
function addTeamMember() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What type of team member would you like to add?',
      choices: ['Engineer', 'Intern', 'I do not want to add any more team members'],
      name: 'memberType',
    },
  ])
    .then((memberChoice) => {
      if (memberChoice.memberType === 'Engineer') {
        // If user selects engineer, prompt for engineer information and create a new Engineer object
        inquirer.prompt([
          {
            type: 'input',
            message: "What is the engineer's name?",
            name: 'name',
          },
          {
            type: 'input',
            message: "What is the engineer's ID?",
            name: 'id',
          },
          {
            type: 'input',
            message: "What is the engineer's email?",
            name: 'email',
          },
          {
            type: 'input',
            message: "What is the engineer's GitHub username?",
            name: 'github',
          },
        ])
          .then((engineerAnswers) => {
            const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github);
            teamMembers.push(engineer);
            addTeamMember();
          });
      } else if (memberChoice.memberType === 'Intern') {
        // If user selects intern, prompt for intern information and create a new Intern object
        inquirer.prompt([
          {
            type: 'input',
            message: "What is the intern's name?",
            name: 'name',
          },
          {
            type: 'input',
            message: "What is the intern's ID?",
            name: 'id',
          },
          {
            type: 'input',
            message: "What is the intern's email?",
            name: 'email',
          },
          {
            type: 'input',
            message: "What is the intern's school?",
            name: 'school',
          },
        ])
          .then((internAnswers) => {
            const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school);
            teamMembers.push(intern);
            addTeamMember();
          });
      } else {
        // Once the user is finished adding team members, generate the HTML file with the team member information and write it to a file
        const generatedHTML = generateHTML(teamMembers);
        fs.writeFile('./output/team.html', generatedHTML, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Team profile has been successfully generated in the "output" folder!');
          }
        });
      }
    });
  }});