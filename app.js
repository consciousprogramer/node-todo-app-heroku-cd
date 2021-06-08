const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();

const mongoose = require('mongoose')
// const connecturl = `mongodb+srv://${process.env.process.env.NODE_TODO_MONGO_ATLAS_KRISHNA_USER}:${process.env.NODE_TODO_MONGO_ATLAS_KRISHNA_PASS}@node-rest-shop.buuvm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const connecturl = `mongodb+srv://${process.env.NODE_TODO_MONGO_ATLAS_ROHIT_USER}:${process.env.NODE_TODO_MONGO_ATLAS_ROHIT_PASS}@nodejs.fsqgg.mongodb.net/tasks?retryWrites=true&w=majority`

const nunjucks = require('nunjucks')
const taskRouter = require('./routes/task')
const app = express()

app.set('view-engine', 'html')

nunjucks.configure('view', {
    autoescape: false,
    express: app
})

app.use(bodyParser.urlencoded({ extended: false }));
// All middlewares must go below

app.use(taskRouter)

mongoose.connect(connecturl, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('==============CONNECTED TO ATLAS============='))

app.listen(3000, () => console.log('server started...'))