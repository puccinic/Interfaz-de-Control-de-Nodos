/* import React from "react";
import { MDBSpinner } from 'mdbreact'; */
import Spinner from 'react-bootstrap/Spinner'

function Loading(){
    return <container>
        <h1 className="loadingspinner">Cargando...</h1>
        <Spinner animation="border" variant="primary" />
    </container>
    
}

export default Loading