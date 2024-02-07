const socket = io.connect('http://localhost:3000/')

const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')
const sender = document.getElementById('sender')

submitBtn.addEventListener('click', () => {
	socket.emit('chat', {
		message: message.value,
		sender: sender.value
	})
})

socket.on('chat', (data) => {
	feedback.innerHTML = ''
	output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>'
})

message.addEventListener('keypress', () => {
	socket.emit('typing', sender.value)
})

socket.on('typing', (data) => {
	feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>'
})
