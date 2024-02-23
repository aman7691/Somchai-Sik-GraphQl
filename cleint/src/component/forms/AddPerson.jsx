import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Input, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, GET_USER } from '../graphQl/Queries';

const AddPerson = () => {
  // const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState()
  const [addPeople] = useMutation(ADD_PERSON)

  useEffect(() => {
    forceUpdate({})
  }, [])



  const onFinish = (values) => {
    const { firstName, lastName } = values;
    const id = uuidv4()

    addPeople({
      variables: { id, firstName, lastName },
      update: (cache, { data: { addPeople } }) => {
        const data = cache.readQuery({ query: GET_USER });
        cache.writeQuery({
          query: GET_USER,
          data: { ...data, peoples: [...data.peoples, addPeople] }
        });
      }
    });
    form.resetFields();

  };


  return (
    <div>
    

      <Form
        form={form}
        name='add-person'
        layout='inline'
        size='large'
        style={{ marginBottom: '40px' }}
        onFinish={onFinish}

      >
        <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input placeholder='i.e. John' />
        </Form.Item>
        <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your lastName!' }]}>
          <Input placeholder='i.e. john@example.com' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Name</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPerson;
