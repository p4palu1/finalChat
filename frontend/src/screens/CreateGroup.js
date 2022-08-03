import React, { useState, useEffect } from 'react'
import { addGroup } from '../actions/GroupActions'
import { Form, Button, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

const CreateGroup = ({history}) => {

  const dispatch = useDispatch()
  const [newGroup, setNewGroup] = useState({
    name: '',
    creator: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    try{
      dispatch(addGroup(newGroup))
      history.push("/")
    } catch(err) {
      console.log(err.message);
    }
  }

  return (
    <Container className='mt-4' onSubmit={handleSubmit}>
      <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Group Name</Form.Label>
          <Form.Control onChange={(e) => setNewGroup({
            name: e.target.value,
            creator: newGroup.creator
          })} type="text" placeholder="Enter Group Name" />
          <Form.Text className="text-muted">
            Make it original!
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Creator Name</Form.Label>
          <Form.Control onChange={(e) => setNewGroup({
            creator: e.target.value,
            name: newGroup.name
          })} type="text" placeholder="Who Are You?" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={newGroup.creator === '' || newGroup.name === ''}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default CreateGroup