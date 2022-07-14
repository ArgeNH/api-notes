const express = require('express');
const cors = require('cors');
const sequelize = require('./src/database/dbConnection');
require('./src/database/associations');
require('dotenv').config();

const app = express();

//Puerto
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conexion de base de datos
/* sequelize.authenticate()
    .then(() => {
        console.log(`Connected to database`);
    })
    .catch(err => {
        console.log(`Error to conect Database: ${err.message}`);
    }); */

//Routes
app.use('/api/notes', require('./src/routes/notes'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/category', require('./src/routes/category'));

//Start server
app.listen(app.get('port'), () => {
    console.log(`Server in listen in PORT ${app.get('port')}`);
    sequelize.sync({ force: true })
        .then(() => {
            console.log(`Database sync and conected`);
        })
        .catch(err => {
            console.log(`Error to sync database: ${err.message}`);
        });
});