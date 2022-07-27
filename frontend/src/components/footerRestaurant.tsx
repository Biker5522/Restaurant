import 'bootstrap/dist/css/bootstrap.min.css';
import '../css.css';
import { Col, Container, Row } from 'react-bootstrap';
export const Footer = () => {
	return (
		<footer>
			<Container>
				<Row className="Footer">
					<Col className="text-center py-2">Copyright: Dawid Cichy</Col>
				</Row>
			</Container>
		</footer>
	);
};
export default Footer;
