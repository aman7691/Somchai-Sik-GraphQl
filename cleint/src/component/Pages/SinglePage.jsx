import React from 'react'
import { useParams } from 'react-router-dom';
import { GET_USER_ID, PERSON_CAR } from '../graphQl/Queries';
import { useMutation, useQuery } from '@apollo/client';
import { Card, List } from 'antd';

const SinglePage = () => {
  let { id } = useParams();
  const style = getStyle()

  const personQuery = useQuery(GET_USER_ID, { variables: { "peopleId": `${id}` } });
  const personCar = useQuery(PERSON_CAR, { variables: { "personId": `${id}` } });
  
  if (personQuery.loading || personCar.loading) return <div>Loading...</div>;
  if (personQuery.error || personCar.error) return <div>{personQuery.error.message || personCar.error.message}</div>;
  if (!personQuery.data.people) return <div>Data Not Found</div>

  return (
    <div>
      <Card style={style.card}>
        <h1>{ `${personQuery.data.people.firstName} ${personQuery.data.people.lastName }` }</h1>
        <List>
          { personCar.data.personIdCar.map((carPerson) => {
            return <Card type="inner" key={carPerson.id}>
              { `${carPerson.year} ${carPerson.make} -> $${carPerson.price}` }
            </Card>
          })}
          
        </List>

      </Card>
      
      
    </div>
  )
}

const getStyle = () => ({
  card: {
      width: "1000px",
      marginBottom: 25
  }
})


export default SinglePage