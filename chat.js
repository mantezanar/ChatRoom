const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const obj = {
  Cdisplay : document.querySelector("main")
}




// Ocupar Nick del Almacenamiento Local
const clientId = sessionStorage.getItem('nick');

// Establecer la conexión websocket utilizando Socket.IO
const socket = io('http://190.92.148.107:4042/');

socket.on('connect', () => {
  console.log('Conexión establecida.');

  // Enviar el identificador del cliente al servidor
  socket.emit('register', clientId);
});

socket.on('chat', (message) => {
  displayMessage(message);
});

socket.on('disconnect', () => {
  console.log('Conexión cerrada.');
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();

  if (message !== '') {
    const chatMessage = {
      clientId,
      message
    };

    socket.emit('chat', chatMessage);
    displayMessage(chatMessage);

    messageInput.value = '';
  }
});

function displayMessage(message) {
  if(message.clientId === clientId){
    displayMyMSG(message);
  }
  else{
    displayFriendMSG(message)
  }
}

function displayMyMSG(message){
  obj.Cdisplay.insertAdjacentHTML("beforeend", `
  <div class="my-msg">
      <div class="rounded-pill">
          <div class="title">${message.clientId}</div>
          <div class="content-msg">
              ${message.message}
          </div>
      </div>
  </div>
  
  `)
}

function displayFriendMSG(data){
  obj.Cdisplay.insertAdjacentHTML("beforeend", `
  <div class="friend-msg">
      <div class"rounded-pill">
          <div class="title">${data.clientId}</div>
          <div class="content-msg">
              ${data.message}
          </div>
      </div>
  </div>

  `)
}

