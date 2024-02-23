import React from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, ADD_CAR, GET_CAR } from '../graphQl/Queries';
import {v4 as uuid} from "uuid";

const AddCar = () => {
    const { loading, error, data } = useQuery(GET_USER);
    const [addCar] = useMutation(ADD_CAR);
    const style = getStyle();

    const onFinish = (values) => {
        const { year, make, model, price, Select } = values;
        const id = uuid();
        console.log(`Success: ${year}, ${make}, ${model}, ${price}, ${Select}`);

        addCar({
            variables: {
                id,
                make,
                model,
                personId: Select,
                year,
                price
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CAR });
                cache.writeQuery({
                  query: GET_CAR,
                  data: { ...data, cars: [...data.cars, addCar] }
                });
              }
        })
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div style={{ width: "100%" }} className='addCarDiv'>
            <h1 style={style.title}>People And their Cars</h1>
            <Form
                layout='inline'
                onFinish={onFinish}
                style={{ maxWidth: "100%", justifyContent: "center" }}
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
                    <Input style={{ width: 100 }} />
                </Form.Item>
                <Form.Item label="Name" name="Select" rules={[{ required: true, message: 'Please input!' }]}>
                    <Select style={{ width: 100 }}>
                        {data.peoples.map(person => (
                            <Select.Option key={person.id} value={person.id}>
                                {person.firstName} {person.lastName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const getStyle = () => ({
    title: {
        fontSize: 20,
        padding: "15px",
        marginBottom: "50px",
        borderBottom: "1px  solid #ccc",
        textAlign: "center"
    }
});

export default AddCar;
