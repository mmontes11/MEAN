var log = require('./log'),
    users = [],
    numUsers = 0,
    addedUser = false;

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

            var messageUser = 'User connected: ' + socket.username;
            var messageTotal = 'Total connected users: ' + numUsers;
            console.log(messageUser);
            console.log(messageTotal);
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

            var messageUser = 'User disconnected: ' + socket.username;
            var messageTotal = 'Total connected users: ' + numUsers;
            console.log(messageUser);
            console.log(messageTotal);
        }
    });
}