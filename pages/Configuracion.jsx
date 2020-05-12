import { FaExclamationTriangle } from 'react-icons/fa';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Title from '../components/title'
import SelectList from '../components/selectList'
import NodeCard from '../components/nodeCard'
import Loading from '../components/loading'
import {useNodesData} from '../customHooks'


function ConfigPage() {
    const [nodesData, sNode, setNodesData, setSNode] = useNodesData()

    function change(obj) {
        if (nodesData.find(e => e.dir === obj.dir)) {
            alert("Esta dirección se encuentra ocupada")
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
            const response = await fetch('http://localhost:4000/Datos',
                {
                    method: 'POST',
                    body: JSON.stringify(nodesData),
                    headers:{
                        'Content-Type': 'application/json'
                      }
                })  

            if (!response.ok) throw new Error("Algo salio mal")
            
            const data = await response.json()  
            alert(data)

        } catch (error) {
            console.log(error)
        }
    }

    if (!nodesData) return <Loading/>

    const nodesIDs = nodesData.map(e => e.id)

    return <Container>
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
    </Container>
}

export default ConfigPage