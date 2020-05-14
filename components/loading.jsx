import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

function Loading(){
    return <Container >
        <h1 className="loadingh1">Cargando...</h1>
        <div className="d-flex justify-content-center"> 
            <Spinner className="loadingspinner" variant="light" animation="border"/>
        </div>
    </Container>
    
}

export default Loading