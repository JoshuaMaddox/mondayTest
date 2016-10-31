const mongoose = require('mongoose')
let Client;

const clientSchema = new mongoose.Schema({
  name: {
    first: {type: String, required: true},
    last: {type: String, required: true}
  },
  age: {type: Number, min: 0, max: 120},
  allergies: [String],
  gender: {type: String, enum: ['male', 'female']},
  lastVist:{type: Date}
})

//with in the statics and methods are great places to make api calls

//statics - model / class method - User.findFemale()
clientSchema.statics.findFemale = function() {
  //this is the model
  return this.find({ gender: 'female'})
  //could use instead of the 'this keyword'
  //return User.find({ gender: 'female'}) or
  // //return mongoose.model('User').find({ gender: 'female'})
}
//methods - model / instance method - user.greeting()
clientSchema.methods.greeting = function() {
  //this is the document
  //Use this to get it on the document we are calling it on
  console.log(`Hi I'm ${this.name.first}`)
}

clientSchema.methods.haveBirthday = function(cb) {
  //increment user's age
  //save to database
  //(return the promise)
  this.age++;
  return this.save(cb)
  // return this.save(cb || () => {})
}

CLient = mongoose.model('CLient', clientSchema)

module.exports = CLient