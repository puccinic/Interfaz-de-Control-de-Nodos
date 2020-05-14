import { useState, useEffect } from 'react'
import { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FaToggleOff, FaCogs } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Navbarmain from '../components/navbar'
import Loading from '../components/loading'
import { useNodesData, useNodeData } from '../customHooks'


function ControlPage() {
    const [modalVisible, setModalVisible] = useState(false)
    const [nodesData, sNode, setNodesData, setSNode] = useNodesData()
    if (!nodesData) {
        return <Loading/>
    }
    return <Container>
        <Navbarmain dir="Configuracion" text="Configuración de nodos">
            <FaCogs className="iconoconf"/>
        </Navbarmain>
        <div>
            <ButtonList items={nodesData} action={id => {
                setSNode(id)
                setModalVisible(true)
            }} />
            <Modal show={modalVisible} onHide={() => setModalVisible(false)} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <NodeModal id={sNode} />
        </Modal>
        </div>
</Container>
}

function ButtonList({ items, action }) {

    const buttons = items.map((item, cols) => {
        const button = <Button key={cols} onClick={() => action(item.id)} >Nodo {item.id} </Button>
        if (cols % 3 || cols === 0) {
            return button
        }
        return <Fragment key={cols}> <br /> {button}</Fragment>
    })
    return <div>
        {buttons}
    </div>
}

function NodeModal({ id }) {

    const [nodeData, setNodeData] = useNodeData(id)

    if (!nodeData) {
        return <Modal.Body> <Loading /> </Modal.Body>
    }
    return <Fragment>
        <Modal.Header closeButton>
            <Modal.Title>Nodo {nodeData.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ContactList items={nodeData} />
            <Button onClick={async () => {
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

                    setToggle(!toggle)

                } catch (error) {
                    console.log(error)
                }
            }}>Emergencia</Button>
        </Modal.Body>
    </Fragment>
}

function ContactList({ items }) {
    const contacts = items.contacts.map((item, cols) => {
        const contact = <Contact key={cols} {...item} dir={items.dir}>  </Contact>
        if (cols % 3 || cols === 0) {
            return contact
        }
        return <Fragment key={cols}> <br /> {contact}</Fragment>
    })
    return <div>
        {contacts}
    </div>
}

function Contact(props) {
    const [toggle, setToggle] = useState(true)

    async function action() {
        try {
            const response = await fetch('http://localhost:4000/ControlNodo',
                {
                    method: 'POST',
                    body: JSON.stringify({ ...props, value: toggle }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            if (!response.ok) throw new Error("Algo salio mal")

            setToggle(!toggle)

        } catch (error) {
            console.log(error)
        }
    }
    return <div>
        <h3>{props.Name}{props.value ? 'true' : 'false'}</h3>
        <Button onClick={action}>accionar</Button>
    </div>
}

export default ControlPage