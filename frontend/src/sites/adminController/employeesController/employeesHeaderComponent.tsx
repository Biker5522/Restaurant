import { Navbar, Container, NavbarBrand, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../css.css';
export const EmployeesHeaderComponent = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<NavbarBrand href="/">Employees</NavbarBrand>
				<Nav>
					<NavItem>
						<Link className="btn btn-primary" to="../Employees/Add">
							Add Employee
						</Link>
					</NavItem>
				</Nav>
			</Container>
		</Navbar>
	);
};
