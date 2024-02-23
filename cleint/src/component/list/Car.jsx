import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CAR } from '../graphQl/Queries';
import { List } from 'antd';
import CarCards from '../listItem/CarCards';

const Car = ({personId}) => {
    const { loading, error, data } = useQuery(GET_CAR);
    
    


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
   

    const filteredCars = data.cars.filter(car => car.personId === personId);

    

    return (
        <div>
            <List>
                {filteredCars.map((car) => (
                    <CarCards 
                        key={car.id} 
                        id={car.id}
                        year={car.year}
                        make={car.make}
                        model={car.model}
                        price={car.price}
                        personId={car.personId}
                    />
                ))}
            </List>
        </div>
    );
};

export default Car;
