function Buttonsc(props){
    return <button className = {((props.orientacion == "false") ? "btn-nodo-vertical " : "btn-nodo-horizontal ") + props.nodo }>
        {props.text}
    </button>
}

export default Buttonsc

  
        