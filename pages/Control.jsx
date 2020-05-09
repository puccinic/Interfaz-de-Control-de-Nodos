import { useState } from 'react'
import { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import { useNodesData } from '../customHooks'

function ControlPage() {
    const [modalVisible, setModalVisible] = useState(false)
    const [nodesData, sNode, setNodesData, setSNode] = useNodesData()
    if (!nodesData) {
        return <h1>Cargando Datos...</h1>
    }

    return <div>
        <ButtonList items={nodesData} action={id => {
            setSNode(id)
            setModalVisible(true)
        }} />
        <Modal show={modalVisible} onClose={() => setModalVisible(false)} node={sNode}/>
    </div>
}

function ButtonList({ items, action }) {

    const buttons = items.map((item, cols) => {
        const button = <Button key={item.id} onClick={() => action(item.id)} >Nodo {item.id} </Button>
        if (cols % 3 || cols === 0) {
            console.log(cols)
            return button
        }
        return <Fragment key={cols}> <br /> {button}</Fragment>
    })
    return <div>
        {buttons}
    </div>
}

function Modal({ show, onClose, node }) {
    if (!show) {
        return <h1>No se ve</h1>
    }

    // The gray background
    const backdropStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 50
    }

    // The modal "window"
    const modalStyle = {
        backgroundColor: '#fff',
        borderRadius: 5,
        maxWidth: 500,
        minHeight: 300,
        margin: '0 auto',
        padding: 30
    }

    return (
        <div className="backdrop" style={{ backdropStyle }}>
            <div className="modal" style={{ modalStyle }}>
                <h1>Nodo {node}</h1>

                <div className="footer">
                    <button onClick={onClose}>
                        Close
              </button>
                </div>
            </div>
        </div>
    );
}

export default ControlPage