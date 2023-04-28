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

app.get('/query',userCtrl.queryUser)

app.get('/finders', userCtrl.findersUser)

app.get('/get-set-virtual', userCtrl.getSetVirtualUser)

app.get('/validate', userCtrl.validateUser)

app.get('/one-to-one', userCtrl.oneToOneUser)

app.get('/one-to-many', userCtrl.oneToManyUser)

app.get('/many-to-many', userCtrl.manyToManyUser)

app.get('/paranoid', userCtrl.paranoidUser)

app.get('/loading', userCtrl.LoadingUser)

app.get('/eager', userCtrl.eagerLoadingUser)

app.get('/creator', userCtrl.creatorUser)

app.get('/m-n-associations', userCtrl.mNAssocationsUser)

app.get('/m2m2m', userCtrl.m2m2mUser)

app.get('/scopes',userCtrl.scopeUser)

app.get('/transaction',userCtrl.transactionUser)

app.get('/hooks',userCtrl.hooksUser)
// User.sync({ force: true });
// Contact.sync({ force: true });

app.listen(3001)