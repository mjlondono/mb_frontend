import React from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./comerciante.css";
import app from "../../app.json";

const { APIHOST } = app;

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            contrasena: ''
        };
    }

    iniciarSesion() {
        //alert(`usuario: ${this.state.usuario} - contrasena: ${this.state.contrasena}`);

        axios.post(`${APIHOST}/usuarios/login`, {
            usuario: this.state.usuario,
            contrasena: this.state.contrasena,
        })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <Container id="login-container">
                <Row>
                    <Col>
                        <Row>
                            <h2>Registrar Usuario</h2>
                        </Row>
                        <Row>
                            <Col

                                sm="12"
                                xm="12"
                                md={{ span: 4, offset: 4 }}
                                lg={{ span: 4, offset: 4 }}
                                xl={{ span: 4, offset: 4 }}
                            >
                                <Form>
                                    <Form.Group >
                                        <Form.Label>Nombres</Form.Label>
                                        <Form.Control
                                            onChange={(e) =>
                                                this.setState({ usuario: e.target.value })} />
                                        {/*this.state.usuario - placeholder="Ingrese AQUI su USUARIO"*/}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Apellidos</Form.Label>
                                        <Form.Control
                                            onChange={(e) =>
                                                this.setState({ usuario: e.target.value })} />
                                        {/*this.state.usuario - placeholder="Ingrese AQUI su USUARIO"*/}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Cedula</Form.Label>
                                        <Form.Control
                                            onChange={(e) =>
                                                this.setState({ usuario: e.target.value })} />
                                        {/*this.state.usuario - placeholder="Ingrese AQUI su USUARIO"*/}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Telefono</Form.Label>
                                        <Form.Control
                                            onChange={(e) =>
                                                this.setState({ usuario: e.target.value })} />
                                        {/*this.state.usuario - placeholder="Ingrese AQUI su USUARIO"*/}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Correo</Form.Label>
                                        <Form.Control
                                            onChange={(e) =>
                                                this.setState({ usuario: e.target.value })} />
                                        {/*this.state.usuario - placeholder="Ingrese AQUI su USUARIO"*/}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Direccion</Form.Label>
                                        <Form.Control
                                            onChange={(e) =>
                                                this.setState({ usuario: e.target.value })} />
                                        {/*this.state.usuario - placeholder="Ingrese AQUI su USUARIO"*/}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Pais</Form.Label>
                                        <Form.Control type="password"
                                            onChange={(e) =>
                                                this.setState({ contrasena: e.target.value })} />
                                        {/*this.state.contrasena - placeholder="Ingrese AQUI su CONTRASEÑA"*/}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Departamento</Form.Label>
                                        <Form.Control type="password"
                                            onChange={(e) =>
                                                this.setState({ contrasena: e.target.value })} />
                                        {/*this.state.contrasena - placeholder="Ingrese AQUI su CONTRASEÑA"*/}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Ciudad</Form.Label>
                                        <Form.Control type="password"
                                            onChange={(e) =>
                                                this.setState({ contrasena: e.target.value })} />
                                        {/*this.state.contrasena - placeholder="Ingrese AQUI su CONTRASEÑA"*/}
                                    </Form.Group>


                                    <Button variant="primary" type="submit"
                                        onClick={() => {
                                            this.iniciarSesion();
                                        }}
                                    >
                                        Registrar
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
