import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'
import { useNavigate } from 'react-router-dom';


function AdmHeader() {

    const location=useNavigate()

const logout=(e)=>{
    if(localStorage.getItem("uid")){
      alert("You are about to log out !")
        localStorage.removeItem("uid");
        localStorage.removeItem("uname")
        location("/login")
    }
}

  return (
    <div>

{/* <Navbar bg="dark" className=' w-100  m-0' variant="dark">
        <Container>
          <Navbar.Brand href="#home"> <i class="fa-solid fa-building fa-2x"></i> <strong> Employee Manager</strong></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}


      <Navbar collapseOnSelect expand="lg" bg="" className=' nav' variant="dark">
      <Container>
        <Navbar.Brand href="/admViewAll"> <i class="fa-solid fa-building fa-2x"></i> <strong> Sportscademy</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
            <Nav.Link className='text-light' href="/admViewAll">Home</Nav.Link>
            {/* <Nav.Link  className='text-light' href="/reports">My courses</Nav.Link> */}
            {/* <Nav.Link href="#pricing">Logout</Nav.Link> */}
            <button onClick={(e)=>logout(e)} className="btn btn-danger rounded-pill "> Logout</button>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </div>
  )
}

export default AdmHeader