const crypto = require('crypto');

// TODO
function genPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return {
        salt: salt,
        hash: genHash
    };

}
//passw from form and salt from database
function validPassword(password, hash, salt) {
        const hashVerify =crypto.pbkdf2Sync(password, salt,10000, 64, 'sha512').toString('hex')
        return hash===hashVerify;//returns true or false
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;