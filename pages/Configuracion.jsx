import { FaExclamationTriangle, FaDoorOpen } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Title from '../components/title'
import SelectList from '../components/selectList'
import NodeCard from '../components/nodeCard'
import Loading from '../components/loading'
import {useNodesData} from '../customHooks'
import Navbarmain from '../components/navbar'
import Head from 'next/head'


function ConfigPage() {
    const [nodesData, sNode, setNodesData, setSNode] = useNodesData()

    function change(obj) {
        if (nodesData.find(e => e.dir === obj.dir)) {
            alert("Esta dirección se encuentra ocupada.")
        } else {
            const newData = nodesData.map(e => {
                if (e.id === obj.id) {
                    return obj
                }
                return e
            })
            setNodesData(newData)
        }
    }

    function updateContactsList(obj) {
        const newData = nodesData.map(e => {
            if (e.id === obj.id) {
                return obj
            }
            return e
        })
        setNodesData(newData)
    }

    async function save() {
        try {
            const url = window.location.origin.slice(0,window.location.origin.length-5) + ':4000/Datos'
            const response = await fetch(url,
                {
                    method: 'POST',
                    body: JSON.stringify(nodesData),
                    headers:{
                        'Content-Type': 'application/json'
                      }
                })  

            if (!response.ok) throw new Error("Algo salió mal")
            
            const data = await response.json()  
            alert(data)

        } catch (error) {
            console.log(error)
        }
    }

    if (!nodesData) return <Loading textcolor="true" color="light"/>

    const nodesIDs = nodesData.map(e => e.id)

    return <Container>
        <Head>
            <title>Configuración UniGRID</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbarmain dir="Control" text="Volver">
            <FaDoorOpen className="iconovolver"/>
        </Navbarmain>
        <Row>
            <Col lg>
                <Title />
                <div className="divsize">
                </div>
                <SelectList list={nodesIDs} select={setSNode} />
                <Row>
                    <Button className="mx-auto " variant="danger" onClick={save}>
                        Guardar Cambios <FaExclamationTriangle className="iconosmar"/>
                    </Button>
                </Row>
            </Col>
            <Col lg>
                <NodeCard selected={nodesData.find(e => e.id === sNode)} change={change} update={updateContactsList} />
            </Col>
        </Row>
        <Row>

        </Row>
    </Container>
}

export default ConfigPage