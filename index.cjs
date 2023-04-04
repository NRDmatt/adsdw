const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer.cjs');
const Intern = require('./lib/Intern.cjs');
const Manager = require('./lib/Manager.cjs');
const generateHTML = require('./src/generateHTML.cjs');
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


function addManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name?",
      },
      {
        type: 'input',
        name: 'id',
        message: "What is the team manager's ID?",
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the team manager's email?",
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "What is the team manager's office number?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      team.push(manager);
      addTeamMember();
    });
}

function addTeamMember() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'memberType',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', 'Finish building my team'],
      },
    ])
    .then((answer) => {
      if (answer.memberType === 'Engineer') {
        addEngineer();
      } else if (answer.memberType === 'Intern') {
        addIntern();
      } else {
        generateHTML(team);
      }
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the engineer's name?",
      },
      {
        type: 'input',
        name: 'id',
        message: "What is the engineer's ID?",
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the engineer's email?",
      },
      {
        type: 'input',
        name: 'github',
        message: "What is the engineer's GitHub username?",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      team.push(engineer);
      addTeamMember();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is the intern's name?",
      },
      {
        type: 'input',
        name: 'id',
        message: "What is the intern's ID?",
      },
      {
        type: 'input',
        name: 'email',
        message: "What is the intern's email?",
      },
      {
        type: 'input',
        name: 'school',
        message: "What is the intern's school?",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      team.push(intern);
      addTeamMember();
    });
}

addManager();