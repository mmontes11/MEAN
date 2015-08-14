var jwt = require('jsonwebtoken');
var secret = require('../../config/secret');
var db = require('../../db/models/userModel');
var base64 = require('js-base64').Base64;

exports.logIn = function (req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
        return res.sendStatus(401);
    }
    password= base64.decode(password);

    db.userModel.findOne({username: username}, function (err, user) {
        if (err) {
            console.log(err);
            return res.sendStatus(401);
        }
        if (user == undefined) {
            return res.sendStatus(401);
        }
        user.comparePassword(password, function (isMatch) {
            if (!isMatch) {
                console.log("Attempt failed to login with " + user.username);
                return res.sendStatus(403);
            }
            var token = jwt.sign({id: user._id}, secret.secretToken, {expiresInMinutes: 60});
            return res.json({token: token});
        });
    });
};

exports.logOut = function (req, res) {
    if (req.user) {
        delete req.user;
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(401);
    }
};

exports.signUp = function (req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';
    var passwordConfirmation = req.body.passwordConfirmation || '';

    if (username == '' || password == '' || password != passwordConfirmation) {
        return res.sendStatus(400);
    }

    var user = new db.userModel();
    user.username = username;
    user.password = base64.decode(password);

    user.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: 'User Already Exists',
                userAlreadyExists: true
            });
        }

        db.userModel.count(function (err, counter) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (counter == 1) {
                db.userModel.update({username: user.username}, {is_admin: true}, function (err) {
                    if (err) {
                        console.log(err);
                        return res.sendStatus(500);
                    }
                    console.log('First user created as an Admin');
                    return res.sendStatus(201);
                });
            }
            else {
                return res.sendStatus(201);
            }
        });
    });
};