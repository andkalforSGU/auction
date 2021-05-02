function loadUsers() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let users = JSON.parse(this.responseText);
            let toTable = '<tr>\n' +
                '<th>User ID</th>\n' +
                '<th>User Login</th>\n' +
                '<th>User Password</th>\n'
            '</tr>';

            users.forEach(user => {
                toTable += '<tr>\n' +
                    '<td>'+user.id+'</td>\n' +
                    '<td>'+user.login+'</td>\n' +
                    '<td>'+user.password+'</td>\n' +
                    '<td><button onclick="deleteUser('+user.id+')">Delete</button></td>'+
                '</tr>'
            })

            document.getElementById("usersList").innerHTML = toTable;
        }
    };

    xmlhttp.open("GET", "http://localhost:8080/users/findAll", true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send();
}

function createUser() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", "http://localhost:8080/users/save");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send(JSON.stringify({login: login, password: password}));

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            loadUsers();
        }
    };
}

function deleteUser(id) {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("DELETE", "http://localhost:8080/users/delete/"+id+"");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            loadUsers();
        }
    };
}

loadUsers();