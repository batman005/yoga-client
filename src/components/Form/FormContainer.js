import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const FormContainer = ({ children }) => {
    return (
        <Container style={{ marginTop: '3rem',marginBottom:'3rem' }}>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer;