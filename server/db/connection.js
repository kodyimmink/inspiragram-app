import monk from 'monk';

//database
const db = monk('localhost/inspiragram-app');

//collections
const users = db.get('users');
const likes = db.get('likes');
const inspirations = db.get('inspirations');

//indicies
users.createIndex('username', {unique: true});

export { users, likes, inspirations };