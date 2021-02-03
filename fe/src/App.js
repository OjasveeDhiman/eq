import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import Home from './components/Home';
import Poi from './components/Poi';
import Edaily from './components/events/daily';
import Ehourly from './components/events/hourly';
import Sdaily from './components/stats/daily';
import Shourly from './components/stats/hourly';
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <header>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">EQ Works</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Events" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/events/daily">Daily</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/events/hourly">Hourly</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Stats" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/stats/daily">Daily</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/stats/hourly">Hourly</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/poi">POI</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
      </header>
      <Container>
        <Switch>
          <Route path='/' exact={true} component={Home} />
          <Route path='/poi' exact={true} component={Poi} />
          <Route path='/events/daily' exact={true} component={Edaily} />
          <Route path='/events/hourly' exact={true} component={Ehourly}/>
          <Route path='/stats/daily' exact={true} component={Sdaily}/>
          <Route path='/stats/hourly' exact={true} component={Shourly}/>
        </Switch>        
      </Container>
    </BrowserRouter>
  );
}

export default App;
