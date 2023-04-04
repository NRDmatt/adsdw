const fs = require('fs');
const inquirer = require('inquirer');
// const generateHTML = require('./src/generateHTML.cjs');
const Manager = require('./lib/Manager.cjs');
const Engineer = require('./lib/Engineer.cjs');
const Intern = require('./lib/Intern.cjs');
const express = require('express');
const app = express();
const port = 3001;

const team = [];

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let employees = [];

function promptManager(res) {
    res.send(`<form action="/manager" method="post">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name">
        <label for="id">ID:</label>
        <input type="text" name="id" id="id">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email">
        <label for="officeNumber">Office Number:</label>
        <input type="text" name="officeNumber" id="officeNumber">
        <input type="submit" value="Submit">
    </form>`);
}

function promptEngineer(res) {
    res.send(`<form action="/engineer" method="post">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name">
        <label for="id">ID:</label>
        <input type="text" name="id" id="id">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email">
        <label for="github">GitHub:</label>
        <input type="text" name="github" id="github">
        <input type="submit" value="Submit">
    </form>`);
}

function promptIntern(res) {
    res.send(`<form action="/intern" method="post">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name">
        <label for="id">ID:</label>
        <input type="text" name="id" id="id">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email">
        <label for="school">School:</label>
        <input type="text" name="school" id="school">
        <input type="submit" value="Submit">
    </form>`);
}

function generateHTML(teamArray) {
  let cardArray = []
  for (let i = 0; i < teamArray.length; i++) {
    if (teamArray[i].getRole() === 'Manager') {
      const managerCard = `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${teamArray[i].name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Manager</h6>
            <p class="card-text">ID: ${teamArray[i].id}</p>
            <p class="card-text">Email: <a href="mailto:${teamArray[i].email}">${teamArray[i].email}</a></p>
            <p class="card-text">Office Number: ${teamArray[i].officeNumber}</p>
          </div>
        </div>
      `
      cardArray.push(managerCard)
    } else if (teamArray[i].getRole() === 'Engineer') {
      const engineerCard = `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${teamArray[i].name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Engineer</h6>
            <p class="card-text">ID: ${teamArray[i].id}</p>
            <p class="card-text">Email: <a href="mailto:${teamArray[i].email}">${teamArray[i].email}</a></p>
            <p class="card-text">GitHub: <a href="https://github.com/${teamArray[i].github}" target="_blank">${teamArray[i].github}</a></p>
          </div>
        </div>
      `
      cardArray.push(engineerCard)
    } else {
      const internCard = `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${teamArray[i].name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Intern</h6>
            <p class="card-text">ID: ${teamArray[i].id}</p>
            <p class="card-text">Email: <a href="mailto:${teamArray[i].email}">${teamArray[i].email}</a></p>
            <p class="card-text">School: ${teamArray[i].school}</p>
          </div>
        </div>
      `
      cardArray.push(internCard)
    }
  }

  const htmlString = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-UdTxp8X+g98ZPjGUKnEaV1OO8s1sU6zYU6QPe62C7+/MdXQbSKjnZIgr3kFiJx07F8MnKGRr1rYJvBvtxEivuw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <header>
      <nav class="navbar bg-danger text-white">
        <span class="navbar-brand mb-0 h1">My Team</span>
      </nav>
    </header>
    <main class="container my-4">
      <div class="row justify-content-center">
        ${cards.join('')}
      </div>
    </main>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNSbNbx" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
  </html>
`;

fs.writeFile('./dist/index.html', htmlString, (err) =>
  err ? console.log(err) : console.log('Success!')
  );}