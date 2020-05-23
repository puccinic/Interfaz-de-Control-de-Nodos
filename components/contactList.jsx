import { Fragment } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function ContactList({ items }) {
    const contacts = items.contacts.map((item, cols) => {
        const contact = <Contact key={cols} {...item} dir={items.dir}>  </Contact>
        if (cols % 3 || cols === 0) {
            return contact
        }
        return <Fragment key={cols}> <br /> {contact}</Fragment>
    })
    return <Row>
        {contacts}
    </Row>
}

function Contact(props) {

    async function action() {
        try {
            const response = await fetch('http://localhost:4000/ControlNodo',
                {
                    method: 'POST',
                    body: JSON.stringify({ ...props, value: !props.value }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            if (!response.ok) throw new Error('Algo salio mal')
            
            const data =  await response.json()
            
            if (data.message === 'Hubo un error accionando el contactor.' ) alert(data.message)

        } catch (error) {
            console.log(error)
        }
    }
    return <Col xs="6" sm="6" md="6" lg="4" className="text-center">
        <div className="contactorimagediv">
            <img src="/Contactor.png" alt="imagen-contactor" className="imagencontactor" />
            <button className={((props.value == true) ? "buttongreen " : "buttonred ") + "round-button"} onClick={action} />
        </div>
        <h3 className="contactorname">{props.Name} {props.value}</h3>
    </Col>
}

export default ContactList