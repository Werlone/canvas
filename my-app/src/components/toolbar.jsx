import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

/*function Toolbar({ onSave, onLoad, onClear }) {
    return (
        <Navbar className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand href='#home'>
                    <img src="/img/brushlogo.png"
                    width={"30"}
                    height={"30"}
                    className='d-inline-block align-top'
                    alt='Pictari Logo'/>
                </Navbar.Brand>
                <Button onClick={onSave} size="lg" className='m-1'>Save</Button>
                <Button onClick={onLoad} size="lg" className='m-1'>Load</Button>
                <Button onClick={onClear} size="lg" className='m-1'>Clear</Button>
            </Container>
        </Navbar>
    );
  }*/

function Toolbar({onSave, onLoad, onClear}){
    return(
      <Navbar bg="dark" data-bs-theme="dark">
        <Container fluid>
        <Navbar.Brand href='#home'>
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg00.deviantart.net%2Fa57e%2Fi%2F2012%2F125%2F8%2F5%2Fpaint_brush__s_cutiemark_by_misteraibo-d4yn3if.png&f=1&nofb=1&ipt=e0de725cb6f264f9e87c2298323525df99c660f8a92596887250f3b249c2aeaf&ipo=images"
                    width={"30"}
                    height={"30"}
                    className='d-inline-block align-top'
                    alt='Pictari Logo'/>
                </Navbar.Brand>
          <Nav className="me-auto">
            <Button href='#home' size="lg" className='m-1'>Home</Button>
            <Button onClick={onSave} size="lg" className='m-1'>Save</Button>
            <Button onClick={onLoad} size="lg" className='m-1'>Load</Button>
            <Button onClick={onClear} size="lg" className='m-1'>Clear</Button>
          </Nav>
          <Navbar.Brand href='#profile'>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftodaygoodaction.campaignus.me%2Fcommon%2Fimg%2Fdefault_profile.png&f=1&nofb=1&ipt=97286cc70a06d5631a7e38f756f2687e374a68b57798743c8cfba972cb992a7b&ipo=images"
                width={"30"}
                height={"30"}
                className='d-inline-block align-top'
                alt='Profile Picture'/>  
          </Navbar.Brand>
          <Nav>
            <Button className='m-1'>Log Out</Button>
          </Nav>

        </Container>
      </Navbar>
    )
}
  
  export default Toolbar;
  