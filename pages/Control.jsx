import { useState } from 'react'
import { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FaCogs } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Navbarmain from '../components/navbar'
import Loading from '../components/loading'
import { useNodeData } from '../customHooks'
import Buttonsc from '../components/boton'


function ControlPage() {
    const [modalVisible, setModalVisible] = useState(false)
    const [sNode, setSNode] = useState(null)
    
    function action(id){
        setSNode(id)
        setModalVisible(true)
    }

    return <Container>
        <Navbarmain dir="Configuracion" text="Configuración de nodos">
            <FaCogs className="iconoconf"/>
        </Navbarmain>
        <div className="contenedor">

            <img src="/UniGRID_Diagram.png" alt="UniGRID-Diagram" className="imagenprincipal" />

            {/* Principio componente */}
            <Buttonsc orientacion="false" text="C" nodo="Nodo611" action={()=> action(611)}/>
            <Buttonsc orientacion="false" text="A" nodo="Nodo652" action={()=> action(652)}/>
            <Buttonsc orientacion="false" text="A C" nodo="Nodo684" action={()=> action(684)}/>
            <Buttonsc orientacion="false" text="B C" nodo="Nodo645" action={()=> action(645)}/>
            <Buttonsc orientacion="false" text="B C" nodo="Nodo646" action={()=> action(646)}/>
            <Buttonsc orientacion="false" text="A B C" nodo="Nodo632" action={()=> action(632)}/>
            <Buttonsc orientacion="false" text="A B C" nodo="Nodo633" action={()=> action(633)}/>
            <Buttonsc orientacion="false" text="A B C" nodo="Nodo634" action={()=> action(634)}/>
            <Buttonsc orientacion="false" text="A B C" nodo="Nodo675" action={()=> action(675)}/>
            <Buttonsc orientacion="false" text="A B C" nodo="Nodo692" action={()=> action(692)}/>
            <Buttonsc orientacion="true" text="A B C" nodo="Nodo671" action={()=> action(671)}/>
            <Buttonsc orientacion="true" text="A B C" nodo="Nodo680" action={()=> action(680)}/>
            {/* Final componente */}


        </div>
        <div>
        <Modal show={modalVisible} onHide={() => setModalVisible(false)} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
        <NodeModal id={sNode} />
        </Modal>
        </div>
</Container>
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