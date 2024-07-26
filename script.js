document.getElementById('open_chat').onclick = function () {
    var chatbox = document.getElementById('chatbox');
    if (chatbox.style.display === '' || chatbox.style.display === 'none') {
        chatbox.style.display = 'block';
    }
};

document.getElementById('chat-form').onsubmit = function (event) {
    event.preventDefault();
    sendMessage();
};

function sendMessage() {
    const input = document.getElementById('user_input');
    const message = input.value;
    input.value = '';  // Clear the input after sending

    const messagesContainer = document.getElementById('messages');
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = "You: " + message;
    messagesContainer.appendChild(userDiv);

    // Example POST fetch request
    fetch('http://20.75.236.64:8005/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
        .then(response => response.json())
        .then(data => {
            const botDiv = document.createElement('div');
            botDiv.className = 'message bot-message';
            botDiv.textContent = "Bot: " + data.response;
            messagesContainer.appendChild(botDiv);
        })
        .catch(error => {
            console.error('Error:', error);
            messagesContainer.appendChild(document.createTextNode('Error connecting to the chat service.'));
        });
}
