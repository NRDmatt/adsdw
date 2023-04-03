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
    res.send('Hello World!');
  });
  
  app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:3001/`);
  });

function promptManager() {
  console.log("Let's build your team!");
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the team manager’s name?',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter the team manager’s name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is the team manager’s ID?',
      validate: idInput => {
        if (idInput) {
          return true;
        } else {
          console.log('Please enter the team manager’s ID!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the team manager’s email address?',
      validate: emailInput => {
        if (emailInput) {
          return true;
        } else {
          console.log('Please enter the team manager’s email address!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'What is the team manager’s office number?',
      validate: officeNumberInput => {
        if (officeNumberInput) {
          return true;
        } else {
          console.log('Please enter the team manager’s office number!');
          return false;
        }
      }
    }
  ])
  .then(managerData => {
    const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
    team.push(manager);
    promptTeamMember();
  });
}

function promptTeamMember() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'teamMemberType',
      message: 'Which type of team member would you like to add?',
      choices: [
        'Engineer',
        'Intern',
        'I don’t want to add any more team members'
      ]
    }
  ])
  .then(teamMemberData => {
    if (teamMemberData.teamMemberType === 'Engineer') {
      promptEngineer();
    } else if (teamMemberData.teamMemberType === 'Intern') {
      promptIntern();
    } else {
      writeToFile('./dist/index.html', generateHTML(team));
      console.log('Your team profile has been generated in the dist folder!');
    }
  });
}

function promptEngineer() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the engineer’s name?',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter the engineer’s name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the engineer’s ID?',
        validate: idInput => {
          if (idInput) {
            return true;
          } else {
            console.log('Please enter the engineer’s ID!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the engineer’s email address?',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter the engineer’s email address!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is the engineer’s GitHub username?',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter the engineer’s GitHub username!');
            return false;
          }
        }
      }
    ])
    .then(engineerData => {
      const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
      team.push(engineer);
      promptTeamMember();
    });
  };