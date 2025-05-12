let btn = document.getElementById("btn");
let username = document.getElementById("userName");
let text = document.getElementById("textarea");
let image = document.getElementById("img");
let containerUsers = document.getElementById("displayUsers");


btn.addEventListener("click", () => {
  fetch('https://68219a91259dad2655afc3cc.mockapi.io/api/users/user', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      textarea: text.value,
      img: image.src
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(() => {
      allUsers();
    })

});

function allUsers() {
  fetch('https://68219a91259dad2655afc3cc.mockapi.io/api/users/user')
    .then(response => response.json())
    .then(data => {
      data.forEach(user => {
        let display = document.createElement("div");
        display.style.border = "1px solid gray";
        display.style.padding = "10px";
        display.style.borderRadius = "5px";

        let userInput = document.createElement("h4");
        userInput.innerText = user.username;

        let usertext = document.createElement("p");
        usertext.innerText = user.textarea;

        let userImg = document.createElement("img");
        userImg.src = user.img;
        userImg.style.width = "100px";

        let btnDel = document.createElement("button");
        btnDel.innerText = "Delete";
        btnDel.style.backgroundColor = "red";
        btnDel.style.color = "white";
btnDel.style.border="none"
    btnDel.style.borderRadius="5px"
      
        btnDel.addEventListener("click", () => {
          fetch(`https://68219a91259dad2655afc3cc.mockapi.io/api/users/user/${user.id}`, {
            method: 'DELETE',
          })

        });

        display.appendChild(userInput);
        display.appendChild(usertext);
        display.appendChild(userImg);
        display.appendChild(btnDel);

        containerUsers.appendChild(display);
      });
    });
}

window.onload = allUsers;
