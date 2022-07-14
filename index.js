const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Puerto
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes


//Start server
app.listen(app.get('port'), () => {
    console.log(`Server in listen in PORT ${app.get('port')}`);
});