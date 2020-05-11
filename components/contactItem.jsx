import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

function ContactItem(props) {
    return <ListGroup.Item className="textolista d-flex justify-content-between align-items-center">
    Nombre: {props.contact.Name} Entrada: {props.contact.In} Salida: {props.contact.Out}      
    <badge>
        <Button className="float-right" variant="outline-danger" onClick={e => props.del(props.contact)}>
            Borrar
        </Button>
    </badge>
    </ListGroup.Item>

}

export default ContactItem