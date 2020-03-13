var messageInput = document.querySelector('#message_input_value');
var usernameInput = document.querySelector('#username');
var authorization = document.querySelector('#authorization');
var chat = document.querySelector('#chat');

var username = null;

function connect(event) {
    var socket = new SockJS('/WS');
    username = usernameInput.value.trim();
    usernameInput.value = '';
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    event.preventDefault();
}

function onConnected(frame) {
    stompClient.subscribe('/topic/public', draw);

    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({
            author: username,
            text:'Join ' + username + '!'
        })
    );

    document.querySelector('#username_form').classList.add('d-none');
    document.querySelector('#disconnect').classList.remove('d-none');
    document.querySelector('#input_form').classList.remove('d-none');
}

function onError(error) {
    console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
}

function draw(response) {
    var data = JSON.parse(response.body);

    var $message;
    $message = $($('.message_template').clone().html());
    $message.addClass('left').find('.text').html(data.text);
    $message.find('.author').html(data.author);
    $('.messages').append($message);

    return setTimeout(function () {
        return $message.addClass('appeared');
    }, 0);
}

function disconnect(){
    stompClient.disconnect();
    document.querySelector('#username_form').classList.remove('d-none');
    document.querySelector('#disconnect').classList.add('d-none');
    document.querySelector('#input_form').classList.add('d-none');
}

function sendMessage(event){
    var chatMessage = {
        author: username,
        text: messageInput.value
    };
    messageInput.value = '';
    stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
    event.preventDefault();
}

authorization.addEventListener('submit', connect, true)
chat.addEventListener('submit', sendMessage, true)