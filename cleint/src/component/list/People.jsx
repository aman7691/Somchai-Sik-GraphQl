import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_USER } from '../graphQl/Queries'
import { List } from 'antd'
import PersonCard from '../listItem/PersonCard'

const People = () => {

    const style = getStyle()
    const { loading, error, data } = useQuery(GET_USER)

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>


    console.log(`data`, data)


    return (
        <div>
            <List>
                {data.peoples.map((user) => (
                    <PersonCard 
                        id={user.id}
                        firstName={user.firstName}
                        lastName={user.lastName}
                    />
                ))}

            </List>

            {/* <AddCar personData={data}/> */}
        </div>
    )
}

const getStyle = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

export default People