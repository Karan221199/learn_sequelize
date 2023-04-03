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

module.exports = {
    addUser
}