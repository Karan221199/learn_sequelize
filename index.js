const express = require('express');
const bodyParser = require('body-parser');
require('./models/index')

var userCtrl = require('./controllers/userController')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.get('/users',userCtrl.getUsers)

app.get('/add',userCtrl.addUser)

app.get('/users/:id',userCtrl.getUser)

app.post('/users',userCtrl.postUser)

app.delete('/users/:id',userCtrl.deleteUser)

app.put('/users/:id',userCtrl.updateUser)

// User.sync({ force: true });
// Contact.sync({ force: true });

app.listen(3001)