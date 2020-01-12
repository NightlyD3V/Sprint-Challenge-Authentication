const db = require('../database/dbConfig');

function newUser(user) {
    return db('users')
    .insert(user)
    .then((res) => {
        return {id: res[0]}
    });
}