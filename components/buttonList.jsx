import { Fragment } from 'react'

function ButtonList({ action }) {
    return <Fragment>
        <Buttonsc orientacion="false" text="C" nodo="Nodo611" action={() => action(611)} />
        <Buttonsc orientacion="false" text="A" nodo="Nodo652" action={() => action(652)} />
        <Buttonsc orientacion="false" text="A C" nodo="Nodo684" action={() => action(684)} />
        <Buttonsc orientacion="false" text="B C" nodo="Nodo645" action={() => action(645)} />
        <Buttonsc orientacion="false" text="B C" nodo="Nodo646" action={() => action(646)} />
        <Buttonsc orientacion="false" text="A B C" nodo="Nodo632" action={() => action(632)} />
        <Buttonsc orientacion="false" text="A B C" nodo="Nodo633" action={() => action(633)} />
        <Buttonsc orientacion="false" text="A B C" nodo="Nodo634" action={() => action(634)} />
        <Buttonsc orientacion="false" text="A B C" nodo="Nodo675" action={() => action(675)} />
        <Buttonsc orientacion="false" text="A B C" nodo="Nodo692" action={() => action(692)} />
        <Buttonsc orientacion="true" text="A B C" nodo="Nodo671" action={() => action(671)} />
        <Buttonsc orientacion="true" text="A B C" nodo="Nodo680" action={() => action(680)} />
    </Fragment>
}

function Buttonsc(props) {
    return <button className={((props.orientacion == "false") ? "btn-nodo-vertical " : "btn-nodo-horizontal ") + props.nodo + " buttoncolor"}
    onClick={props.action}>
        {props.text}
    </button>
}

export default ButtonList