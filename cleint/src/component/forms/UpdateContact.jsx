import { Form, Input, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { UPDATE_PERSON } from '../graphQl/Queries'
import { useMutation } from '@apollo/client'


const UpdateContact = ({ id, firstName, lastName, handleClickEdit }) => {

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const [updatePerson] = useMutation(UPDATE_PERSON)

  useEffect(() => {
    forceUpdate()
  }, [])


  const handleSubmit = (values) => {
    const { firstName, lastName } = values;
    
    updatePerson({
      variables: { id, firstName, lastName },
    })

    handleClickEdit()
    console.log(firstName)
    console.log(lastName)
    
  }

  return (
    <div>
      <Form
        name='update-person'
        layout='inline'
        style={{justifyContent:"center", padding: "20px"}}
        onFinish={handleSubmit}

        initialValues={{
          firstName,
          lastName
        }}
      >
        <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input placeholder={firstName} value={firstName}  />
        </Form.Item>
        <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your lastName!' }]}>
          <Input placeholder='i.e. john@example.com' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Update</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateContact