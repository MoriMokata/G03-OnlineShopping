const bcrypt = require('bcryptjs');

const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const compareHash = async (plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, success) => {
            if (err) {
                reject(new Error('Error bcrypt compare'));
            } else {
                resolve(success);
            }
        });
    });
}

module.exports = {
    makeHash,
    compareHash,
}