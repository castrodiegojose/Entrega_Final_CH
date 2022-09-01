const socket = io();

/// chat ///
const chatTable = document.getElementById("chatTable");
const btnChat = document.getElementById("boton_chat");
const author= document.getElementById('username');
const text = document.getElementById('texto');
const mensajechat = document.getElementById('no_mensaje');

btnChat.addEventListener('click', (e) =>{
    e.preventDefault();
    let chat = {        
        author: author.value,
        text: text.value,
    }
    socket.emit('new-message', chat);
    author.value = '';
    text.value = '';
    if(mensajechat.value !=''){mensajechat.innerHTML = '';}
})

socket.on('message-refresh', (chat)=>{
    let lastchat = chat.length - 1;
    let chatInfo = chatTable.lastElementChild.innerHTML
    chatInfo += `<div>${chat[lastchat].author} : ${chat[lastchat].text}</div> `;
    chatTable.lastElementChild.innerHTML = chatInfo;
})