"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const password_cryptographer_1 = require("./password-cryptographer");
const tsmongo_1 = require("tsmongo");
var userDAO;
(function (userDAO) {
    function create(user, password, cb) {
        const userCopy = JSON.parse(JSON.stringify(user));
        tsmongo_1.dao.readOneByField('email', userCopy.email, 'users', (dbResp) => {
            // Condition to create a new is user is no user with this email exists
            // This means that a database error is actually what you expect when creating a new user!
            if (dbResp.error) {
                password_cryptographer_1.passwordCryptographer.doHash(password).then((hash) => {
                    userCopy.password = {
                        hash: hash,
                        algorithm: 'bcrypt'
                    };
                    tsmongo_1.dao.create(userCopy, 'users', cb);
                }, (err) => {
                    return cb({
                        error: {
                            message: 'Problem during hashing'
                        }
                    });
                });
            }
            else {
                // if a user with this email exists, deny creation
                return cb({
                    error: {
                        message: 'User already exists'
                    }
                });
            }
        });
    }
    userDAO.create = create;
    function getByMail(email, cb) {
        tsmongo_1.dao.readOneByField('email', email, 'Users', cb);
    }
    userDAO.getByMail = getByMail;
    function getById(id, cb) {
        tsmongo_1.dao.read(id, 'Users', cb);
    }
    userDAO.getById = getById;
})(userDAO = exports.userDAO || (exports.userDAO = {}));
