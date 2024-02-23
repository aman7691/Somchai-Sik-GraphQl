import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { REMOVE_PERSON, GET_USER } from '../graphQl/Queries';
import filter from 'lodash.filter'

const RemoveContact = ({ id }) => {
  const [removeContact] = useMutation(REMOVE_PERSON, {
    update: (cache, { data: { removePeople } }) => {
      const { peoples } = cache.readQuery({ query: GET_USER });
      console.log(peoples);
      cache.writeQuery({
        query: GET_USER,
        data: {
          peoples: filter(peoples, c => c.id !== removePeople.id)
        }
      });
    }
  });

  const handleClickButton = () => {
    console.log("Clicked!");

    if (window.confirm("Are you sure you want to delete this person?")) {
      removeContact({ variables: { id } });
    }
  };

  return (
    <DeleteOutlined
      onClick={handleClickButton}
      key="delete"
      style={{ color: "red" }}
    />
  );
};

export default RemoveContact;
