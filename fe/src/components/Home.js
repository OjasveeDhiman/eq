import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Home = ()=>{
 return(<Row>
            <Col md={{ span: 12 }} style={{ textAlign: 'center', fontSize:62, color:'blueviolet', fontWeight:900, fontFamily:'cursive', lineHeight:'80vh', height:'100vh'}}>{`EQ WORKS`}</Col>
        </Row>
      )
}

export default Home;