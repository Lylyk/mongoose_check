require('./database.js');
//Create a new instance of Person and save it to the database:

const Person = require('./Person.js');
const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Pasta']
});

person.save()
.then(data => {
  console.log('Person saved:', data);
})
.catch(err => {
  console.error(err);
});

//Create Many Records with model.create():
//Create multiple Person records at once using Model.create():

const peopleArray = [
    { name: 'Alice', age: 28, favoriteFoods: ['Sushi', 'Salad'] },
    { name: 'Bob', age: 34, favoriteFoods: ['Burger', 'Steak'] },
    { name: 'Charlie', age: 22, favoriteFoods: ['Pizza', 'Pasta'] }
  ];
  

const createManyPeople = async (arrayOfPeople) => {
    try {
      const people = await Person.create(arrayOfPeople);
      console.log('People saved:', people);
    } catch (err) {
      console.error(err);
    }
  };
  
  createManyPeople(peopleArray);


//Use model.find() to Search Your Database:
//Find all people with a specific name: 

const findPeopleByName = async (name) => {
    try {
      const people = await Person.find({ name: name });
      console.log('People found:', people);
    } catch (err) {
      console.error(err);
    }
  };
  
  // Example: Finding people named 'Alice'
  findPeopleByName('Alice');

  const findPersonById = async (personId) => {
    try {
      const person = await Person.findById(personId);
      console.log('Person found by ID:', person);
    } catch (err) {
      console.error(err);
    }
  };


// Example: Finding a person by their ID
findPersonById('66cb7ba8619675c5c7594d5f');

const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    if (!person) {
      console.error('Person not found');
      return;
    }

    person.favoriteFoods.push('hamburger');
    const updatedPerson = await person.save();
    console.log('Updated Person:', updatedPerson);
  } catch (err) {
    console.error(err);
  }
};


// Example: Find, edit, and save a person by their ID
findEditThenSave('66cb7ba8619675c5c7594d5f');

const removeById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    if (!removedPerson) {
      console.log('Person not found');
      return;
    }
    console.log('Removed Person:', removedPerson);
  } catch (err) {
    console.error(err);
  }
};

// Example: Removing a person by their ID
removeById('66cb7ba8619675c5c7594d5d');

const removeManyPeople = async () => {
  try {
    const result = await Person.deleteMany({ name: "Mary" });
    console.log('People removed:', result.deletedCount);
  } catch (err) {
    console.error(err);
  }
};


const queryChain = async () => {
  try {
    const data = await Person.find({ favoriteFoods: 'salad' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec();
    
    console.log('Query result:', data);
  } catch (err) {
    console.error('Error occurred:', err);
  }
};

// Call the function
queryChain();
