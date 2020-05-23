import { useState } from 'react'
import Head from 'next/head'
import Modal from 'react-bootstrap/Modal'
import { FaCogs } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Navbarmain from '../components/navbar'
import ButtonList from '../components/buttonList'
import NodeModal from '../components/nodeModal'


function ControlPage() {
    const [modalVisible, setModalVisible] = useState(false)
    const [sNode, setSNode] = useState(null)

    function action(id) {
        setSNode(id)
        setModalVisible(true)
    }

    return <Container>
        <Head>
            <title>UniGRID: Control de nodos</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbarmain dir="Configuracion" text="Configuración de nodos">
            <FaCogs className="iconoconf" />
        </Navbarmain>
        <div className="contenedor">
            <img src="/UniGRID_Diagram.png" alt="UniGRID-Diagram" className="imagenprincipal" />
            <ButtonList action={action}/>
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

export default ControlPage