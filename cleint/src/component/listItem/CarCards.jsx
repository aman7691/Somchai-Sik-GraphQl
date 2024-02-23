import React, { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import RemoveContact from '../buttons/RemoveContact';
import UpdateCar from '../forms/UpdateCar';
import RemoveCar from '../buttons/RemoveCar';

const CarCards = ({ id, year, make, model, price, personId }) => {
    const [editMode, setEditMode] = useState(false);

    const handleClickEdit = () => {
        setEditMode(!editMode);
    }

    const subHead = `${year} ${make} ${model} -> $${price}`;

    return (
        <div>
            {editMode ? (
                <UpdateCar
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    onCancel={() => setEditMode(false)}
                    handleClickEdit={handleClickEdit}
                />
            ) : (
                <Card
                    type="inner"
                    title={subHead}
                    actions={[
                        <EditOutlined key='edit' onClick={handleClickEdit} />,
                        <RemoveCar id={id} />
                    ]}
                />
            )}
        </div>
    );
}

export default CarCards;
