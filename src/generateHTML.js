function generateCard(employee) {
    let card = `
      <div class="card">
        <div class="card-header">
          <h2>${employee.getName()}</h2>
          <h3>${employee.getRole()}</h3>
        </div>
        <div class="card-body">
          <ul>
            <li>ID: ${employee.getId()}</li>
            <li>Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
    `;
  
    if (employee.getRole() === "Manager") {
      card += `
        <li>Office Number: ${employee.getOfficeNumber()}</li>
      `;
    }
  
    if (employee.getRole() === "Engineer") {
      card += `
        <li>GitHub: <a href="https://github.com/${employee.getGithub()}" target="_blank">${employee.getGithub()}</a></li>
      `;
    }
  
    if (employee.getRole() === "Intern") {
      card += `
        <li>School: ${employee.getSchool()}</li>
      `;
    }
  
    card += `
          </ul>
        </div>
      </div>
    `;
  
    return card;
  }
  
  module.exports = generateCard;