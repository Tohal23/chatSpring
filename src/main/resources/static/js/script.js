var messageInput = document.querySelector('#message_input_value');
var usernameInput = document.querySelector('#username');
var connButton = document.querySelector('#connect');
var usernameForm = document.querySelector('#username_form');

var username = null;

function connect() {
	var socket = new SockJS('/WS');
	username = document.querySelector('#username').value.trim();
	stompClient = Stomp.over(socket);
	stompClient.connect({}, onConnected, onError);
}

function onConnected(frame) {
    stompClient.subscribe('/topic/public', draw);

    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({author: username, text:'Join ' + username + ' !', type: 'JOIN'})
    );

}

function onError(error) {chat
    console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
}

function draw(response) {
    var data = JSON.parse(response.body);
	console.log("drawing...");
    var $message;
    $message = $($('.message_template').clone().html());
    $message.addClass('left').find('.text').html(data.text);
    $message.find('.author').html(data.author);
    $('.messages').append($message);
    return setTimeout(function () {
        return $message.addClass('appeared');
    }, 0);
    usernameForm.classList.add('d-none');
    connButton.classList.add('d-none');
}

function disconnect(){
    var chatMessage = {
                    author: username,
                    text: messageInput.value,
                    type: 'LEFT'
                };

    stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
	stompClient.disconnect();
	connButton.classList.remove('d-none');
    usernameInput.classList.remove('d-none');
}

function sendMessage(){
    var chatMessage = {
                author: username,
                text: document.querySelector('#message_input_value').value,
                type: 'MESSAGE'
            };

	stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
}