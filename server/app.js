const express = require('express');
const app = express();
const mongoose = require('mongoose')
const PORT = 5000;
const { MONGOURI } = require('./keys')

require('./models/user');
require('./models/post');

app.use(express.json())
app.use(require('./routs/auth'))
app.use(require('./routs/post'))
app.use(require('./routs/user'))

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.log('ERROR connecting to MongoDB', err)
})

app.listen(PORT, () => {
  console.log('server is running on', PORT)
})