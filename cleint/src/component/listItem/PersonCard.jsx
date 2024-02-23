import React from 'react'
import { Card } from 'antd';
import RemoveContact from '../buttons/RemoveContact';
import { useState } from 'react';
import UpdateContact from '../forms/UpdateContact';
import { EditOutlined } from '@ant-design/icons';
import CarCards from './CarCards';
import Car from '../list/Car';
import SinglePage from '../Pages/SinglePage';
import { Navigate } from "react-router-dom";

const PersonCard = ({ id, firstName, lastName }) => {
    const style = getStyle()
    const [editMode, setEditMode] = useState()

    const handleClickEdit = () => {
        setEditMode(!editMode)
    }


    return (
        <div>
            <Card style={style.card} key={`person_${id}`} actions={[<EditOutlined key='edit' onClick={handleClickEdit} />, <RemoveContact id={id} />]}>
                {
                    editMode ? <UpdateContact id={id} firstName={firstName} lastName={lastName} handleClickEdit={handleClickEdit}/> : <> {firstName} {lastName} </>
                }
                <Car personId={id}/>
                <a href={`/single-page/${id}`}>Link to</a>
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

export default PersonCard