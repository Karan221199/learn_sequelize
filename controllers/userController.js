var db = require('../models')
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

module.exports = {
    addUser,
    getUsers,
    getUser,
    postUser,
    deleteUser,
    updateUser
}