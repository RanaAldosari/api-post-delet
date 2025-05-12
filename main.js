let btn = document.getElementById("btn");
let username = document.getElementById("userName");
let text = document.getElementById("textarea");
let image = document.getElementById("img");
let containerUsers = document.getElementById("displayUsers");


let nameError=document.getElementById("name-error")
let textError=document.getElementById("text-error")
let imgError=document.getElementById("img-error")



btn.addEventListener("click", () => {
if(username.value.length<4){
  alert("username must be more then 4 charachters !")
        return

}
if(text.value.length<6){
  alert("your phraghraph mst be more than 6 characters !")
return
}
if(image.src===""){
alert("please upload your image!")
return
}

fetch("https://68219a91259dad2655afc3cc.mockapi.io/api/users/user")
.then(response => response.json())
  .then(data => 
  {
    let userFind=data.find(user=>user.username ===username.value)
    if(userFind){
nameError.innerText="the username already exists"
nameError.style.color="red"
return;
    }}
  );

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
// if(username.length<4){
// nameError.innerText=`username must be more than 4 characters`
// }
// if(text.length<6){
// textError.innerText=`your phragraph must be more than characters`
// }
// if(image===""){
// imgError.innerText="must be uplad image"
// }
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
