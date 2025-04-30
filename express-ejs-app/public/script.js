
const getUsers = async () => {
    const response = await fetch("http://localhost:9000/users");
    const users = await response.json();
    generateTable(users);
};

getUsers();

function generateTable(users) {
    let content = "";
    const table = document.querySelector("#tblUsers");
    users.forEach(user => {
        content += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.age}</td>
                    </tr>
                `;
    });
    table.innerHTML = content;
}
