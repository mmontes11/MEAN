var users = [];
var numUsers = 0;
var addedUser = false;

module.exports = function (socket) {

    socket.on('USER_CONNECTED', function (socketData) {
        socket.username = socketData.username;

        if (socket.username && !users[socket.username]) {
            users [socket.username] = socket.username;
            numUsers++;
            addedUser = true;

            socket.emit('WELCOME', {
                username: socket.username,
                numUsers: numUsers
            });

            socket.broadcast.emit('USER_JOINED', {
                username: socket.username,
                numUsers: numUsers
            });

            console.log('User connected: ' + socket.username);
            console.log('Total connected users: ' + numUsers);
        }
    });

    socket.on('USER_DISCONNECTED', function (socketData) {
        if (socket.username && addedUser) {
            delete users[socket.username];
            numUsers--;

            socket.broadcast.emit('USER_LEFT', {
                username: socket.username,
                numUsers: numUsers
            });

            console.log('User disconnected: ' + socket.username);
            console.log('Total connected users: ' + numUsers);
        }
    });
}