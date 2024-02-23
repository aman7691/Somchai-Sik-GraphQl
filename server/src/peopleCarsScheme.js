import find from 'lodash.find'
import remove from 'lodash.remove'
import filter from 'lodash.filter'


const peopleArray = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const carsArray = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]

const typeDefs = `
type People {
  id: String!
  firstName: String!
  lastName: String!
}

type Cars {
  id: String!
  year: String!
  make: String!
  model: String!
  price: String!
  personId: String!
}

type Query {
  people(id:  String): People
  car(id:  String): Cars
  personIdCar(personId:  String): [Cars]
  peoples: [People]
  cars: [Cars]
  }

  type Mutation {
    addPeople(id:String!, firstName:String!, lastName:String!) :  People
    updatePeople(id:String!, firstName:String, lastName:String) : People
    removePeople(id:String!) : People
    removeCar(id:String!) : Cars
    addCar(id:String!, year:String!, make:String!, model:String!, price:String!, personId:String!) : Cars
    updateCar(id:String! ,year:String, make:String, model:String, price:String ) : Cars
  }
`

const resolvers = {
  Query: {
    peoples: () => peopleArray,
    people: (root, args) => {
      return find(peopleArray, { id: args.id })
    },
    cars: () => carsArray,
    car: (root, args) => {
      return find(carsArray, { id: args.id })
    },
    personIdCar: (root, args) => {
      return filter(carsArray, { personId: args.personId })
    }
  },
  Mutation: {
    addPeople: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      }
      peopleArray.push(newPerson);
      return newPerson;
    },

    updatePeople: (root, args) => {
      const people = find(peopleArray, { id: args.id });
      if (!people) {
        throw new Error(`Couldn't find a user with the id of ${args.id}`);
      } else {
        people.firstName = args.firstName,
          people.lastName = args.lastName

        return people
      }
    },
    removePeople: (root, args) => {
      const removePeople = find(peopleArray, { id: args.id });
      if (!removePeople) {
        throw new Error(`Couldn't find a user with the id of ${args.id}`);
      }
      remove(peopleArray, c => {
        return c.id === removePeople.id
      })
      return removePeople
    },

    // ================================

    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId
      };

      carsArray.push(newCar);

      return newCar;
    },
    removeCar:(root, args) => {
      const car = find(carsArray, { id: args.id });
      if(!car){
        throw new Error("Could not find a car with that ID.")
      }
      remove(carsArray, c => {
        return c.id === car.id
      })
      return car
    },

    updateCar: (root, args) => {
      const car = find(carsArray, { id: args.id });
      if (!car) {
        throw new Error(`Couldn't find a user with the id of ${args.id}`);
      } else {
          car.year = args.year,
          car.make = args.make,
          car.model = args.model,
          car.price = args.price
          

        return car
      }
    },


  },
};

export { typeDefs, resolvers }
