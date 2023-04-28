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

var mNAssocationsUser = async(req,res)=>{
    // const amidala = await db.customer.create({ username: 'p4dm3', points: 1000 });
    // const queen = await db.profile.create({ name: 'Queen' });
    // await amidala.addProfile(queen, { through: { selfGranted: false } });
    // const result = await db.customer.findOne({
    //     where: { username: 'p4dm3' },
    //     include: db.profile
    // });

    // const amidala = await db.customer.create({
    //     username: 'p4dm3',
    //     points: 1000,
    //     profiles: [{
    //       name: 'Queen',
    //       grants: {
    //         selfGranted: true
    //       }
    //     }]
    //   }, {
    //     include: db.profile
    // });
      
    // const result = await db.customer.findOne({
    //     where: { username: 'p4dm3' },
    //     include: db.profile
    // });

    // var result = await db.customer.findAll({
    //     include: {
    //       model: db.grant,
    //       include: db.profile
    //     }
    // });

    var result  = await db.customer.findOne({
        include: {
            model: db.profile,
            through: {
              attributes: ['selfGranted']
            }
        }
    });

    res.status(200).json({data:result})
}

var m2m2mUser = async(req,res)=>{
    // await db.player.bulkCreate([
    //     { username: 's0me0ne' },
    //     { username: 'empty' },
    //     { username: 'greenhead' },
    //     { username: 'not_spock' },
    //     { username: 'bowl_of_petunias' }
    // ]);
    // await db.game.bulkCreate([
    //     { name: 'The Big Clash' },
    //     { name: 'Winter Showdown' },
    //     { name: 'Summer Beatdown' }
    // ]);
    // await db.team.bulkCreate([
    //     { name: 'The Martians' },
    //     { name: 'The Earthlings' },
    //     { name: 'The Plutonians' }
    // ]);

  

    // await db.gameTeam.bulkCreate([
    //     { GameId: 1, TeamId: 1 },   // this GameTeam will get id 1
    //     { GameId: 1, TeamId: 2 },   // this GameTeam will get id 2
    //     { GameId: 2, TeamId: 1 },   // this GameTeam will get id 3
    //     { GameId: 2, TeamId: 3 },   // this GameTeam will get id 4
    //     { GameId: 3, TeamId: 2 },   // this GameTeam will get id 5
    //     { GameId: 3, TeamId: 3 }    // this GameTeam will get id 6
    //   ]);

    //   await db.playerGameTeam.bulkCreate([
    //     // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
    //     { PlayerId: 1, GameTeamId: 3 },   // s0me0ne played for The Martians
    //     { PlayerId: 3, GameTeamId: 3 },   // greenhead played for The Martians
    //     { PlayerId: 4, GameTeamId: 4 },   // not_spock played for The Plutonians
    //     { PlayerId: 5, GameTeamId: 4 }    // bowl_of_petunias played for The Plutonians
    //   ]);

    const game = await db.game.findOne({
        where: {
          name: "Winter Showdown"
        },
        include: {
          model: db.gameTeam,
          include: [
            {
              model: db.player,
              through: { attributes: [] } // Hide unwanted `PlayerGameTeam` nested object from results
            },
            db.team
          ]
        }
    });

    console.log(`Found game: "${game.name}"`);
  for (let i = 0; i < game.GameTeams.length; i++) {
    const team = game.GameTeams[i].Team;
    const players = game.GameTeams[i].Players;
    console.log(`- Team "${team.name}" played game "${game.name}" with the following players:`);
    console.log(players.map(p => `--- ${p.username}`).join('\n'));
  }
    res.status(200).json({data:game})
}

var scopeUser = async(req,res)=>{

    // db.user.addScope('checkStatus',{
    //     where: {
    //         status:0
    //     }
    // })

    db.user.addScope('checkLastName',{
        where: {
            lastName:'efef ,Indian'
        }
    })

    db.user.addScope('includeContact',{
        include:{
            model:Contact,
            attributes:['current_address']
        }
    })

    db.user.addScope('userAttributes',{
        attributes:['lastName']
    })

    var data= await db.user.scope(['includeContact','checkLastName','userAttributes']).findAll({
    });
    res.status(200).json({data:data})
}

var transactionUser = async(req,res)=>{
    // const t = await db.sequelize.transaction();
    // try {
    //     var data = await User.create({firstName:"manoj",lastName:"middhaaa"}, { transaction: t })
    //     if(data && data.id) {
    //         await Contact.create({permanent_address:"delhi",current_address:"meerut",'UserId':null}, { transaction: t })
    //     }
    //     await t.commit();
    // }
    // catch(e){
    //     await t.rollback(); 
    //     console.log(e)
    // }

    try {

        const data = await db.sequelize.transaction(async (t) => {
      
        //   const user = await User.create({
        //     firstName: 'abrahwdwam',
        //     lastName: 'Lincoln'
        //   }, { transaction: t });
      
        //   if(user && user.id) {
        //     await Contact.bulkCreate([{permanent_address:"deldfdfhi",current_address:"meeredeut",'UserId':user.id},{permanent_address:"deded",current_address:"cdcefef",'UserId':null}], { transaction: t })
        //     }
      
        //   return user;
        const data = await Contact.bulkCreate([{
            permanent_address:'ram efef colony',
            current_address:'fefefef',
            users:{
                firstName:"fdsdwwqdefef",
                lastName:"efef"
            }
        },
        {
            permanent_address:'ram',
            current_address:'mohalwwi',
            users:{
                firstName:"kawwdqwqdwdwdwran",
                lastName:"wwww"
            }
        },
        {
            permanent_address:'ram nagaewdewdr colony',
            current_address:'moewdwedhali',
            users:{
                firstName:"Adwewd",
                lastName:"edwed"
            }
        }],{
            include: [db.contactUser]
        })

        return data
        });
        res.status(200).json({data:data})
        // If the execution reaches this line, the transaction has been committed successfully
        // `result` is whatever w   as returned from the transaction callback (the `user`, in this case)
      
      } catch (error) {
      console.log(error)
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
      
      }
}

var hooksUser = async(req,res)=>{
    var data = await User.create({firstName:"mssssasdsnoj",lastName:"middwdwdwhaaa",status:0});
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
    creatorUser,
    mNAssocationsUser,
    m2m2mUser,
    scopeUser,
    transactionUser,
    hooksUser
}