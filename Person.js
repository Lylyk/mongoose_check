let {Schema , model} = require('mongoose')

let validator = require('validator')

const personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });
  
  const PersonModel = model('person', personSchema);
  module.exports = PersonModel