import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import ContactItem from './contactItem'

function NodeCard(props) {
    const [newDir, setNewDir] = useState('')
    const [newContact, setNewContact] = useState({
        Name: '',
        In: '',
        Out: ''
    })

    function changeDir() {
        if (typeof newDir === 'number' && newDir % 1 === 0) {
            props.change({ ...props.selected, dir: newDir })
        } else {
            alert('Ingrese una dirección valida')
        }
    }

    function deleteContact(obj) {
        const newContactList = props.selected.contacts.filter(e => e != obj)
        props.update({...props.selected, contacts: newContactList})

    }
    function updateNewContact(obj) {
        setNewContact({ ...newContact, ...obj })
    }

    function addContact() {
        const { In, Out } = newContact
        if (In % 1 === 0 && Out % 1 === 0) {
            if (props.selected.contacts.find(e => e.Name === newContact.Name)) {
                alert('Este contactor ya existe')
            } else {
                const inRepeated = props.selected.contacts.find(e => e.In === newContact.In)
                const outRepeated = props.selected.contacts.find(e => e.Out === newContact.Out)
                if (inRepeated || outRepeated) {
                    alert('No se puede repetir entrada/salida')
                } else {
                    const newContactList = [...props.selected.contacts, newContact]
                    props.update({ ...props.selected, contacts: newContactList })
                }
            }
        } else {
            alert('Parametros invalidos')
        }
    }

    return <Card>
        <Card.Body>
            <Card.Title>Nodo {props.selected.id}</Card.Title>
            <Card.Text>Dirección {props.selected.dir} </Card.Text>
        </Card.Body>
        <Form>
            <Form.Row>
                <Col>
                    <Form.Control placeholder="Nueva dirección" onChange={e => setNewDir(Number(e.target.value))} />
                </Col>
                <Col>
                    <Button variant="primary" onClick={changeDir} > {props.selected.dir ? 'Cambiar Dirección' : 'Nueva Direccion'} </Button>
                </Col>
            </Form.Row>
        </Form>
        <Card.Body>
            <Card.Title>Contactores</Card.Title>
            <ListGroup>
                {
                    props.selected.contacts.map(
                        (item, index) => <ContactItem key={index} contact={item} del={deleteContact}/> 
                    )
                }
            </ListGroup>
        </Card.Body>
        <Form>
            <Form.Row>
                <Col>
                    <Form.Control placeholder="Nombre" onChange=
                        {e => updateNewContact({ Name: e.target.value })} />
                </Col>
                <Col>
                    <Form.Control placeholder="Entrada" onChange=
                        {e => updateNewContact({ In: e.target.value })} />
                </Col>
                <Col>
                    <Form.Control placeholder="Salida" onChange=
                        {e => updateNewContact({ Out: e.target.value })} />
                </Col>
                <Col>
                    <Button variant="primary" onClick={addContact}>Añadir Contactor</Button>
                </Col>
            </Form.Row>
        </Form>
    </Card>
}

export default NodeCard