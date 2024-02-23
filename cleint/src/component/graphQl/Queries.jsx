import { gql } from "@apollo/client";

export const GET_USER_ID = gql`
  query People($peopleId: String) {
    people(id: $peopleId) {
      id
      firstName
      lastName
    }
  }
`

export const GET_USER = gql`
  {
    peoples {
      id
      firstName
      lastName
    }
  }
`
export const ADD_PERSON = gql`
  mutation AddPeople($id: String!, $firstName: String!, $lastName: String!) {
    addPeople(id: $id, firstName: $firstName, lastName: $lastName) {
      firstName
      id
      lastName
    }
  }
`;


export const REMOVE_PERSON = gql`
  mutation RemovePeople($id: String!) {
    removePeople(id: $id) {
      firstName
      id
      lastName
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String, $lastName: String) {
    updatePeople(id: $id, firstName: $firstName, lastName: $lastName) {
      firstName
      id
      lastName
    }
  }
`

export const GET_CAR = gql`
{
  cars {
    id
    make
    model
    personId
    price
    year
  }
}`

export const PERSON_CAR = gql`
  query PersonIdCar($personId: String) {
    personIdCar(personId: $personId) {
      id
      make
      model
      personId
      price
      year
    }
  }
`

export const ADD_CAR = gql`
  mutation AddCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      make
      model
      personId
      year
      price
    }
  }
`

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      make
      model
      personId
      price
      year
    }
  }
`

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: String, $make: String, $model: String, $price: String) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price) {
      id
      make
      model
      personId
      price
      year
    }
  }
`