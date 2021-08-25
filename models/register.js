const mongoose = require('mongoose')
const Schema = mongoose.Schema
var bcrypt = require('bcryptjs');

const userData = new Schema ({
    firstname:{
        type: 'String',
        required: true,
      },
    lastname:{
        type: 'String',
        required: true,
      },
    username:{
        type: 'String',
        required: true,
      },
    passwords:{
        type: 'String',
        required: true,
      },
})

// encrypt password before save
// userData.post('save', function(doc) {
//     const user = doc;
//     console.log('88888888888888888')
//     console.log(user.username)
//     console.log('88888888888888888')
    // bcrypt.hash(user.passwords, 10, function(err, hash) {
    //     console.log(hash)
  
    //   });
    userData.pre('save',async function(next){
            try{
                const salt = await bcrypt.genSalt()
                this.passwords = await bcrypt.hash(this.passwords, salt)
                next()
            } catch(error){
                next(error)
            }
        })
        

//   });
module.exports = mongoose.model('register',userData)