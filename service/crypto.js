var crypto = require('crypto');

var MyCrypto = {};

MyCrypto.encrypt = function(input, password) {
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');

    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');

    var data = new Buffer(input, 'utf8').toString('binary');

    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv.slice(0,16));

    // UPDATE: crypto changed in v0.10
    // https://github.com/joyent/node/wiki/Api-changes-between-v0.8-and-v0.10
    var nodev = process.version.match(/^v(\d+)\.(\d+)/);
    var encrypted;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {
        encrypted = cipher.update(data, 'binary') + cipher.final('binary');
    } else {
        encrypted = cipher.update(data, 'utf8', 'binary') + cipher.final('binary');
    }

    var encoded = new Buffer(encrypted, 'binary').toString('base64');
    return encoded;
}

MyCrypto.decrypt = function(input, password) {
  // Convert urlsafe base64 to normal base64
    var input = input.replace(/\-/g, '+').replace(/_/g, '/');
    // Convert from base64 to binary string
    var edata = new Buffer(input, 'base64').toString('binary')

    // Create key from password
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');

    // Create iv from password and key
    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');

    // Decipher encrypted data
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0,16));

    // UPDATE: crypto changed in v0.10
    // https://github.com/joyent/node/wiki/Api-changes-between-v0.8-and-v0.10
    var nodev = process.version.match(/^v(\d+)\.(\d+)/);
    var decrypted, plaintext;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {
        decrypted = decipher.update(edata, 'binary') + decipher.final('binary');
        plaintext = new Buffer(decrypted, 'binary').toString('utf8');
    } else {
        plaintext = (decipher.update(edata, 'binary', 'utf8') + decipher.final('utf8'));
    }

    return plaintext;
}

module.exports = MyCrypto;
