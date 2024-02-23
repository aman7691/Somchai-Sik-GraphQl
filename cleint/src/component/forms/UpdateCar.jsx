import React from 'react'
import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { UPDATE_CAR } from '../graphQl/Queries'
import { Form, Input, Button } from 'antd'


const UpdateCar = ({ id, year, make, model, price ,handleClickEdit }) => {

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [updatePerson] = useMutation(UPDATE_CAR)

    useEffect(() => {
        forceUpdate()
    }, [])


    const handleSubmit = (values) => {
        const { year, make, model, price } = values;

        updatePerson({
            variables: { id, year, make, model, price },
        })

        handleClickEdit()
        // console.log(firstName)
        // console.log(lastName)

    }
    return (
        <div>
            <Form
                name='update-person'
                layout='inline'
                style={{ justifyContent: "center", padding: "20px" }}
                onFinish={handleSubmit}
                initialValues={{
                    year,
                    make,
                    model,
                    price
                }}
            >
                <Form.Item label="Year" name="year" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input style={{ width: 100 }} />
                </Form.Item>
                <Form.Item label="Make" name="make" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input style={{ width: 100 }} />
                </Form.Item>
                <Form.Item label="Model" name="model" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input style={{ width: 100 }} />
                </Form.Item>
                <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Update</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateCar