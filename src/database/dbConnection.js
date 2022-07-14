const Sequelize = require('sequelize');
const { ConnectionString } = require('connection-string');
require('dotenv').config();

const cs = new ConnectionString(process.env.JAWSDB_URL);
const { name } = cs.hosts?.[0];

const sequelize = new Sequelize('d9kijblr3o7wovcp', 'xcc2iv2snalxgede', process.env.PASSWORD_DB, {
    host: name,
    dialect: 'mysql'
});

module.exports = sequelize;