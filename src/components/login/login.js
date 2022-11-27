import React from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./login.css";
import { isNull } from 'util';
import Cookies from 'universal-cookie';
import { calcularExpirarSesion } from "../helper/helper";
import Loading from '../loading/loading';


import app from "../../app.json";

const { APIHOST } = app;

const cookies = new Cookies();

export default class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            usuario: '',
            contrasena: '',
        };
    }

    iniciarSesion() {
        //alert(`usuario: ${this.state.usuario} - contrasena: ${this.state.contrasena}`);

        this.setState({ loading: true });

        axios.post(`${APIHOST}/usuarios/login`, {
            usuario: this.state.usuario,
            contrasena: this.state.contrasena,
        })
            .then((response) => {
                //console.log(response);
                if (isNull(response.data.token)) {
                    alert("usuario y/o contraseña invalidas");
                } else {

                    cookies.set('_s', response.data.token,
                        {
                            path: '/',
                            expires: calcularExpirarSesion(),
                        });

                    this.props.history.push(window.open('/productos'));

                }

                this.setState({ loading: false });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <Container id="login-container">
                <Loading show={this.state.loading} />
                <Row>
                    <Col>
                        <Row>
                            <h2>Iniciar Sesión</h2>
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
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control
                                            onChange={(e) =>
                                                this.setState({ usuario: e.target.value })} />
                                        {/*this.state.usuario - placeholder="Ingrese AQUI su USUARIO"*/}
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password"
                                            onChange={(e) =>
                                                this.setState({ contrasena: e.target.value })} />
                                        {/*this.state.contrasena - placeholder="Ingrese AQUI su CONTRASEÑA"*/}
                                    </Form.Group>

                                    <Button variant="dark"
                                        onClick={() => {
                                            this.iniciarSesion();
                                        }}
                                    >
                                        Iniciar Sesión
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
