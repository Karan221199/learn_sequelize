var db = require('../models')
const { Sequelize ,Op} = require('sequelize');
const { json } = require('body-parser');
var User = db.user;

var addUser = async(req,res) => {
    const jane = await User.create({ firstName: "karan",lastName:"middha" });
    // const jane = User.build({ firstName: "Jane" });
    console.log(jane instanceof User); // true
    console.log(jane.firstName); // "Jane"

    // jane.set({ firstName: "abc",lastName:"middha" });
    jane.update({ firstName: "def",lastName:"middha" });
    await jane.save();
    
    console.log('Jane was saved to the database!');
    console.log(jane.toJSON()); 
    res.status(200).json(jane.toJSON())
}

var getUsers = async(req,res) => {
    const data = await User.findAll({});

    res.status(200).json(data)
}

var getUser = async(req,res) => {
    const data = await User.findOne({
        where:{
            id: req.params.id
        }
    });

    res.status(200).json(data)
}

var postUser = async(req,res) => {
    var postData = req.body;
    if(postData.length>1){
        const data  = await User.bulkCreate(postData);
        res.status(200).json({data:data})
    }
    else {
        const data  = await User.create(postData);
        res.status(200).json({data:data})
    }
    
}

var deleteUser = async(req,res) => {
    const data = await User.destroy({
        where:{
            id: req.params.id
        }
    });

    res.status(200).json(data)
}

var updateUser = async(req,res) => {
    var updatedData = req.body;
    const data = await User.update(updatedData,{
        where:{
            id: req.params.id
        }
    });

    res.status(200).json(data)
}

var queryUser = async(req,res) => {

    const user = await User.count({
        where: {
          id: {
            [Op.gt]: 4
          }
        }
      });
    res.status(200).json({data:user})
}

var findersUser = async(req,res) => {

    const { count, rows } = await User.findAndCountAll({
        where: { lastName: 'middha' },
    });
      
    res.status(200).json({data:rows,count:count})
}

var getSetVirtualUser = async(req,res) => {

    // const data = await User.findAll({
    //     where: { lastName: 'middha' },
    // });
      
    const data = await User.create({
        firstName:'Nani',
        lastName:'swdwdwd'
    })
    res.status(200).json({data:data})
}

var validateUser = async(req,res) => {
    let messages = []
    var data = {}
    try{
        data = await User.create({
            firstName:'sjsjsjsj',
            lastName:'swdwdwd'
        })
    }
    catch(e) {
        let message;
        e.errors.forEach(error=>{
            switch(error.validatorKey) {
                case 'isAlpha':
                    message = "Only alphabets are allowed";
                    break;
                case 'isLowercase':
                    message = "Only lowercase is allowed";
                    break;
            }
            messages[error.path] = message;
        })
        
    }
    console.log(JSON.parse(messages))
    res.json(JSON.parse(messages))
    // res.status(200).json({data:data,messages:messages})
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUser,
    deleteUser,
    updateUser,
    queryUser,
    findersUser,
    getSetVirtualUser,
    validateUser
}