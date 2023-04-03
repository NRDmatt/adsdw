function generateCard(member) {
    // Destructure properties from the member object
    const { name, id, email } = member;
  
    let specialInfo = '';
  
    // Check if the member is an Engineer or Intern and generate the corresponding specialInfo
    if (member.getRole() === 'Engineer') {
      specialInfo = `<li class="list-group-item">GitHub: ${member.getGithub()}</li>`;
    } else if (member.getRole() === 'Intern') {
      specialInfo = `<li class="list-group-item">School: ${member.getSchool()}</li>`;
    }
  
    // Generate and return the HTML for the member's card
    return `
      <div class="col mb-4">
        <div class="card">
          <div class="card-header bg-primary text-light">
            <h2 class="card-title">${name}</h2>
            <h3 class="card-title"><i class="fas fa-${member.getRole().toLowerCase()}"></i> ${member.getRole()}</h3>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item">ID: ${id}</li>
              <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
              ${specialInfo}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
  
  module.exports = generateCard;