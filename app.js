if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/router');
const { errorHandler } = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({ extended: false, limit: '5mb' }))

app.use(router)
app.use(errorHandler)

module.exports = app