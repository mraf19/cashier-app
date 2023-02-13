import React from "react";
import { Container, Navbar } from "react-bootstrap";

function NavbarComponent() {
	return (
		<Navbar variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Aplikasi Kasir</Navbar.Brand>
			</Container>
		</Navbar>
	);
}

export default NavbarComponent;
