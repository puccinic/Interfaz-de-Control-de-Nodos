import { FaPlug} from 'react-icons/fa'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navbarmain(props){
    return <Navbar collapseOnSelect expand="lg" className="navbar-custom" variant="dark">
            <Navbar.Brand className="navbarbrand">
                <FaPlug className="icononavbar"/>UniGRID
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link className="centradoNavLink" href={props.dir}>
                        {props.text} {props.children}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
    </Navbar>
}

export default Navbarmain