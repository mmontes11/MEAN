var users = [];
var numUsers = 0;
var addedUser = false;

module.exports = function (socket) {

	console.log('New soccket connection');

	socket.on('USER_CONNECTED', function (socketData) {
		//First of all, we associate the socket with the username
		socket.username = socketData.username;

		if (!users[socket.username]){
			users [socket.username] = socket.username;
			numUsers++;
			addedUser = true;

			console.log('User connected: '+socket.username);
			console.log('Total connected users: '+numUsers);

			//Sends to all clients
			socket.emit('USER_JOINED', {
				username: socket.username,
				numUsers: numUsers
			});
		}		
	});

	socket.on('USER_DISCONNECTED', function (socketData) {
		if (addedUser){
			//Delete the user associated with the socket with no need of using socketData
			delete users[socket.username];
			numUsers--;

			console.log('User disconnected: '+socket.username);
			console.log('Total connected users: '+numUsers);

			//Sends to all clients excepts the one that has been disconnected
			socket.broadcast.emit('USER_LEFT', {
				username: socket.username,
				numUsers: numUsers
			});
		}
	});
}