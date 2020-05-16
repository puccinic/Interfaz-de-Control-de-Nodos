import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

function Loading(props){
    return <Container >
        <h1 className={(props.textcolor == "true") ? "loadingh1" : "loadingh1variant"}>
            Cargando...
        </h1>
        <div className={((props.textcolor == "true") ? "" : "spinnerdivspace ")+ "d-flex justify-content-center"}> 
            <Spinner className="loadingspinner" variant={props.color} animation="border"/>
        </div>
    </Container>
    
}

export default Loading