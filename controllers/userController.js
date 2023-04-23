var db = require('../models')
const { Sequelize ,Op} = require('sequelize');
var Contact = db.contact
const { json } = require('body-parser');
var User = db.user;
var Education = db.education

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

var oneToOneUser = async(req,res)=>{
    // var data = await User.create({firstName:"rahulgggbb",lastName:"dua"})
    // if(data && data.id) {
    //     await Contact.create({permanent_address:"wwdfwd",current_address:"wdwd",user_id:data.id})
    // }

    // var data = await User.findAll({
    //     attributes:['firstName','lastName'],
    //     include:[{
    //         model:Contact,
    //         as:'contactDetails',
    //         attributes:['permanent_address','current_address']
    //     }],
    //     where:{id:3}
    // });

    var data = await Contact.findAll({
        attributes:['permanent_address','current_address'],
        include:[{
            model:User,
            as:'userDetails',
            attributes:['firstName','lastName']
        }],
        where:{id:1}
    });
    res.status(200).json({data:data})
}

var oneToManyUser = async(req,res)=>{
    // var data = await Contact.create({permanent_address:"polo",current_address:"oooo",user_id:1})

    // var data = await User.findAll({
    //     attributes:['firstName','lastName'],
    //     include:[{
    //         model:Contact,
    //         as:'contactDetails',
    //         attributes:['permanent_address','current_address']
    //     }],
    //     where:{id:1}
    // });

    var data = await Contact.findAll({
        attributes:['permanent_address','current_address'],
        include:[{
            model:User,
            as:'userDetails',
            attributes:['firstName','lastName']
        }],
        // where:{id:1}
    });
    res.status(200).json({data:data})
}

var manyToManyUser = async(req,res)=>{
    // var data = await User.create({firstName:"karan",lastName:"middhaaa"})
    // if(data && data.id) {
    //     await Contact.create({permanent_address:"delhi",current_address:"meerut"})
    // }

    // var data = await Contact.findAll({
    //     attributes:['permanent_address','current_address'],
    //     include:[{
    //         model:User,
    //         attributes:['firstName','lastName']
    //     }],   
    // });
    // res.status(200).json({data:data})

    var data = await User.findAll({
        attributes:['firstName','lastName'],
        include:[{
            model:Contact,
            attributes:['permanent_address','current_address']
        }],
    });
    res.status(200).json({data:data})
}

var paranoidUser = async(req,res)=>{
    // var data = await User.create({firstName:"karannn",lastName:"middhaaa"})

    // var data = await User.destroy({
    //     where: {
    //         id: 2
    //       },
    // })

    // var data = await User.restore({
    //     where: {
    //         id: 2
    //       },
    // })

    var data = await User.findAll({
        paranoid:false
    });

    res.status(200).json({data:data})
}

var LoadingUser = async(req,res)=>{
    // var data = await User.create({firstName:"karan",lastName:"middhaaa"})
    // if(data && data.id) {
    //     await Contact.create({permanent_address:"delhi",current_address:"meerut",'UserId':data.id})
    // }

    var data = await User.findOne({
        where:{
            id:2
        },
        include : Contact
    })

    // var contactData = await data.getContacts();
    res.status(200).json({data:data})
}

var eagerLoadingUser = async(req,res)=>{
    var data = await User.findAll({
        // include:[{
        //     model:Contact,
        //     required:false,
        //     right:true
        // },{
        //     model:Education,
        // }]
        // include:{
        //     model: Contact,
        //     include: {
        //         model: Education
        //     }
        // }
        // include:{all:true,nested:true}
        include:{
            model: Contact,
            include: {
                model: Education
            },
            where:{
                id:2
            }
        }

    })
    res.status(200).json({data:data})
}

var creatorUser = async(req,res)=>{
    // var data = await User.create({firstName:"karan",lastName:"middhaaa"})
    // if(data && data.id) {
    //     await Contact.create({permanent_address:"delhi",current_address:"meerut",'UserId':data.id})
    // }
    // var data = await User.findAll({ 
    //     include:{
    //         model: Contact,
    //         include: {
    //             model: Education
    //         },
    //         where:{
    //             id:2
    //         }
    //     }

    // })

    await Contact.bulkCreate([{
        permanent_address:'ram efef colony',
        current_address:'fefefef',
        users:{
            firstName:"fefef",
            lastName:"efef"
        }
    },
    {
        permanent_address:'ram',
        current_address:'mohalwwi',
        users:{
            firstName:"kawwran",
            lastName:"wwww"
        }
    },
    {
        permanent_address:'ram nagaewdewdr colony',
        current_address:'moewdwedhali',
        users:{
            firstName:"edwewd",
            lastName:"edwed"
        }
    }],{
        include: [db.contactUser]
    })

     var data = await User.findAll({ 
        include:{
            model: Contact,
        }

    })
    res.status(200).json({data:data})
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
    validateUser,
    oneToOneUser,
    oneToManyUser,
    manyToManyUser,
    paranoidUser,
    LoadingUser,
    eagerLoadingUser,
    creatorUser
}