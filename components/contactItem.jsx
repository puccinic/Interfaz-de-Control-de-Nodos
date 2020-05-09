import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

function ContactItem(props) {
    return <ListGroup.Item>
        Nombre: {props.contact.Name} Entrada: {props.contact.In} Salida: {props.contact.Out}
        <Button onClick={e => props.del(props.contact)}>
            Borrar</Button>
    </ListGroup.Item>

}

export default ContactItem