var socket = io.connect(); 

var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages'); 

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) { 
  var li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});
