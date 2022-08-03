import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container, Row, Col} from "react-bootstrap"
import { addGroup, getGroups } from "../actions/GroupActions"
import groupContext from '../context/GroupContext'

const GroupList = ({history}) => {
    
    const {currentGroup, setCurrentGroup} = useContext(groupContext)
    const dispatch = useDispatch()
    const groups = useSelector((state) => state.groups) || []

    useEffect(() => {
        dispatch(getGroups())
    },[groups])

    const handleJoinGroup = (group) => {
        try{
            setCurrentGroup(group)
            console.log(group)
            history.push(`/chat/${group._id}`)
        } catch(err){
            console.log(err.message)
        }
    }
  return (
    <Container>
        <h1>Click on a group to join the chat</h1>
        {
            groups.map((group) => (
                <Card>
                    <Row>
                        <Col md={6} className="text-center">
                            <h3>{group.name}</h3>
                            <h4>creator: {group.creator}</h4>
                        </Col>
                        <Col md={6} className="text-center d-flex justify-content-center align-items-center">
                            <Button onClick={() => handleJoinGroup(group)}>Join group</Button>
                        </Col>
                    </Row>
                </Card>
            ))
        }
    </Container>
  )
}

export default GroupList