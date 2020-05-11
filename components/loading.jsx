/* import React from "react";
import { MDBSpinner } from 'mdbreact'; */
import Spinner from 'react-bootstrap/Spinner'

function Loading(){
    return <container >
        <h1 className="loadingh1">Cargando...</h1>
        <div className="d-flex justify-content-center"> 
            <Spinner className="loadingspinner" variant="light" animation="border"/>
        </div>
    </container>
    
}

export default Loading