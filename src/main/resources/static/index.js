// function loadUsers() {
//     let xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             let users = JSON.parse(this.responseText);
//
//             console.log(users);
//
//             let toTable = '<tr>\n' +
//                 '<th>User ID</th>\n' +
//                 '<th>User Login</th>\n' +
//                 '<th>User Password</th>\n' +
//                 '<th>Is Admin</th>\n' +
//             '</tr>';
//
//             users.forEach(user => {
//                 toTable += '<tr>\n' +
//                     '<td>'+user.id+'</td>\n' +
//                     '<td>'+user.login+'</td>\n' +
//                     '<td>'+user.password+'</td>\n' +
//                     '<td>'+user.is_adm+'</td>\n' +
//                     '<td><button onclick="deleteUser('+user.id+')">Delete</button></td>'+
//                 '</tr>'
//             })
//
//             document.getElementById("usersList").innerHTML = toTable;
//         }
//     };
//
//     xmlhttp.open("GET", "http://localhost:8080/users/findAll", true);
//     xmlhttp.setRequestHeader("Content-type", "application/json");
//     xmlhttp.send();
// }
//
// function createUser() {
//     let login = document.getElementById("login").value;
//     let password = document.getElementById("password").value;
//     let isAdm = document.getElementById("isAdm").value;
//
//     let xmlhttp = new XMLHttpRequest();
//
//     xmlhttp.open("POST", "http://localhost:8080/users/save");
//     xmlhttp.setRequestHeader("Content-type", "application/json");
//     xmlhttp.send(JSON.stringify({login: login, password: password}));
//
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState === 4 && this.status === 200) {
//             loadUsers();
//         }
//     };
// }
//
// function deleteUser(id) {
//     let xmlhttp = new XMLHttpRequest();
//
//     xmlhttp.open("DELETE", "http://localhost:8080/users/delete/"+id+"");
//     xmlhttp.setRequestHeader("Content-type", "application/json");
//     xmlhttp.send();
//
//     xmlhttp.onreadystatechange = function() {
//         if (this.readyState === 4 && this.status === 200) {
//             loadUsers();
//         }
//     };
// }
//
// loadUsers();

const LoginHTML = '<form class="frm">\n' +
    '        <label for="login"></label><div id="vallog" class="val-log"><input id="login" placeholder="Login" class="inpt"></div>\n' +
    '        <label for="password"></label><div id="valpas" class="val-pas"><input id="password" type="password" placeholder="Password" class="inpt"></div>\n' +
    '        <div class="cntr"><button onclick="singIn()" class="btn green" type="button">Sign In</button>\n' +
    '        <button onClick="inner(SignUpHTML)" class="btn blue" type="button">Sign Up</button></div>\n' +
    '</form>';

const SignUpHTML = '<form class="frm">\n' +
    '        <label for="login"></label> <div id="vallog" class="val-log"><input id="login" placeholder="Login" class="inpt"></div>\n' +
    '        <label for="password"></label> <div id="valpas" class="val-pas"><input id="password" type="password" placeholder="Password" class="inpt"> </div>\n' +
    '        <button onclick="regist()" class="btn-max blue" type="button">Register</button>\n' +
    '</form>';

const SucHTML = '<span class="suc">Successfully!</span>';

const mainPage = async (user, productList) => {
    let allLots = '';
    let allUsersLotsList = '';

    await allUsersLots(user).then(async lotsList => {
        if (lotsList) {
            lotsList = lotsList.reverse();
            allUsersLotsList += '<div class="lotsList">\n';
            lotsList.forEach( lot => {
                allUsersLotsList += '<div>Name: '+lot.name+'</div>\n' +
                    '<div>Description: '+lot.description+'</div>\n' +
                    '<button type="button" class="btn-lot val-text" id="delLot" data-id="'+lot.id+'">Delete</button>'
            });
            allUsersLotsList += '</div>';
        }
    });

    productList = productList.reverse();
    allLots += '<div class="lotsList">\n';
    await productList.forEach( lot => {

        console.log(lot);
        console.log(productList);

        let btn = '<button type="button" class="btn-lot blue" id="delLot" data-id="'+lot.id+'">Buy</button>';

        allLots += '<div>Name: '+lot.name+'</div>' +
            '<div>Description: '+lot.description+'</div>\n' +
            btn;
        });
    allLots += '</div>';

    return(
        '<div class="mainContainer"> ' +
        `<div class="form-c"><span class="loginView">`+user.login+`</span>\n` +
        `<form class="frm">\n` +
        `        <label for="name"></label> <div id="vallog" class="val-log"><input id="name" placeholder="name" class="inpt-lot"></div>\n` +
        `        <label for="description"></label> <div id="valpas" class="val-pas"><input id="description" placeholder="description" class="inpt-lot"> </div>\n` +
        `        <button id="addLot" class="inpt-lot blue" type="button">Add lot</button>\n` +
        `</form></div>\n` +
        `<div class="listsCont">
            <div class="preListCont">
                Your lots:` + allUsersLotsList + `
            </div>
            <div class="preListCont">
                All lots:` + allLots + `
            </div>
        </div>\n` +
        '</div>'
    );
}

async function getUserByLogin(login) {
    let res = await fetch("http://localhost:8080/users/findByLogin?login=" + login);
    return res.text();
}

function shortPas() {
    inner(SignUpHTML);
    document.getElementById("vallog").innerHTML = '<span class="val-text">Password is empty.</span>' +
        '<input id="login" placeholder="Login" class="inpt">';
    document.getElementById("valpas").innerHTML = '<input id="password" placeholder="Password" class="inpt val" type="password">';
    regist();
}

function noLogin() {
    inner(LoginHTML);
    document.getElementById("vallog").innerHTML = '<span class="val-text">Login not found.</span>' +
        '<input id="login" placeholder="Login" class="inpt val">';
}

function noPas() {
    inner(LoginHTML);
    document.getElementById("vallog").innerHTML = '<span class="val-text">Password is wrong.</span>' +
        '<input id="login" placeholder="Login" class="inpt">';
    document.getElementById("valpas").innerHTML = '<input id="password" placeholder="Password" class="inpt val" type="password">';
}

async function regist() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    if (!password) {
        return shortPas();
    }

    getUserByLogin(login).then(async user => {
        if (user) {
            document.getElementById("vallog").innerHTML = '<span class="val-text">Login is busy.</span>' +
                '<input id="login" placeholder="Login" class="inpt val">';
        } else {

            let user = JSON.stringify({
                "login": login,
                "password": password
            })

            await fetch('http://localhost:8080/users/save', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json;charset=utf-8"
                },
                body: user
            });

            inner(SucHTML);
            setTimeout(() => {
                inner(LoginHTML);
            }, 1500);
        }
    });
}

async function singIn() {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;


    getUserByLogin(login).then(async u => {
        let user;

        if (u) {
            user = JSON.parse(u);
        } else return noLogin();

        if (user.password === password) {
            await inner(await mainPage(user, await allLots()), user);
        } else return noPas();
    });
}

async function newLot(user) {
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;

    let lot = {
        name: name,
        description: description,
        user_id: user.id
    }

    await fetch('http://localhost:8080/lots/save', {
        method: 'POST',
        headers: {
            "Content-type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(lot)
    });

    await inner(await mainPage(user, await allLots()), user);
}

async function allUsersLots(user) {
    let res = await fetch('http://localhost:8080/lots/findAllByUserId/'+user.id);
    return await res.json();
}

async function allLots() {
    let res = await fetch('http://localhost:8080/lots/findAll');
    return await res.json();
}

async function deleteLot(id, user) {
    await fetch('http://localhost:8080/lots/delete/' + id, {
        method: 'DELETE'
    })

    await inner(await mainPage(user, await allLots()), user);
}

async function inner(HTML, user) {

    document.getElementById('container').innerHTML = HTML;

    try {
        let delLot = document.getElementById("delLot");
        let lotId = delLot.dataset.id;

        delLot.onclick = async () => {
            await deleteLot(lotId, user);
        }
    } catch (e) {}

    try {
        document.getElementById("addLot").onclick = () => {
            newLot(user);
        };
    } catch (e) {}
}

inner(LoginHTML);

//------------------------------------------------------

function inArray(arr, obj) {
    let flag = false;

    arr.forEach(o => {
        if (JSON.stringify(o) === JSON.stringify(obj))
            return flag = true;
    })

    return flag;
}