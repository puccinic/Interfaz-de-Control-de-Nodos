import Form from 'react-bootstrap/Form'

function SelectList(props) {

    return <Form>
        <Form.Group className="groupcont"controlId="SelectNode">
            <Form.Label className="subtitulo">Seleccionar Nodo</Form.Label>
            <Form.Control as="select" custom onChange={e => props.select(Number(e.target.value))}>
                {
                    props.list.map(
                        (item, index) => <option value={item} key={index}>Nodo {item}</option>
                    )
                }
            </Form.Control>
        </Form.Group>
    </Form>
}

export default SelectList