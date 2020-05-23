import { Fragment } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import {FaExclamationTriangle} from 'react-icons/fa'
import Loading from '../components/loading'
import ContactList from '../components/contactList'
import { useNodeData } from '../customHooks'

function NodeModal({ id }) {

    const [nodeData, errorMessage] = useNodeData(id)

    if (!nodeData && !errorMessage) {
        return <Modal.Body> <Loading textcolor="false" color="dark" /> </Modal.Body>
    } else if (errorMessage) {
        return <Modal.Body> {errorMessage} </Modal.Body>
    }
    return <Fragment>
        <Modal.Header closeButton>
            <Modal.Title className="w-100 text-center">Nodo {nodeData.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ContactList items={nodeData} />
            <Row>
                <Button className="mx-auto rowemerbutton" variant="danger" onClick={async () => {
                    try {
                        const response = await fetch('http://localhost:4000/Emergencia',
                            {
                                method: 'POST',
                                body: JSON.stringify({ id: id }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })

                        if (!response.ok) throw new Error("Algo salio mal")
                        
                        const data =  await response.json()
                        if (typeof data !== 'string') alert('No se pudieron apagar todos los contactores.')

                    } catch (error) {
                        console.log(error)
                    }
                }}><FaExclamationTriangle className="iconosalerta" />¡EMERGENCIA!<FaExclamationTriangle className="iconosalerta" /></Button>
            </Row>
        </Modal.Body>
    </Fragment>
}

export default NodeModal