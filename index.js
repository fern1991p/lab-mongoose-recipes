const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let newRecipe = {
      title: "Feijoada",
      level: "Easy Peasy",
      cuisine: "Brazilian"
    }
    return Recipe.create(newRecipe)
  })

  .then((newRecipe)=>{
    console.log(newRecipe)


  })
  .then(() => {
    return Recipe.insertMany(data)
 
  })
  .then((data) => {
   console.log(data)
 
  })

  .then(() => {
  return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
 
  })

  .then((Update) => {
   console.log(Update)
   console.log("Success, the duration was updated")
 
  })

  .then(() => {
    return Recipe.deleteOne({title:"Carrot Cake"})
   
  })

  .then((carrot) => {
    console.log(carrot)
    console.log("Success, carrot cake was deleted")
  
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
