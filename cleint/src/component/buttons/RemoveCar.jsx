import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { GET_CAR, GET_USER, REMOVE_CAR } from '../graphQl/Queries';
import filter from 'lodash.filter'


const RemoveCar = ({id}) => {
    const [removeCar] = useMutation(REMOVE_CAR, {
        update: (cache, { data: { removeCar } }) => {
          const { cars } = cache.readQuery({ query: GET_CAR });
          console.log(cars);
          cache.writeQuery({
            query: GET_CAR,
            data: {
              cars: filter(cars, c => c.id !== removeCar.id)
            }
          });
        }
      });
    
      const handleClickButton = () => {
        console.log("Clicked!");
    
        if (window.confirm("Are you sure you want to delete this car?")) {
          removeCar({ variables: { id } });
        }
      };
    
      return (
        <DeleteOutlined
          onClick={handleClickButton}
          key="delete"
          style={{ color: "red" }}
        />
      );
}

export default RemoveCar