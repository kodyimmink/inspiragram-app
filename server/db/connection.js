import monk from 'monk';

//database
const db = monk('localhost/inspiragram-app');

//collections
const users = db.get('users');

//indicies
users.createIndex('username', {unique: true});

export { db, users };