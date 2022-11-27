import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompts from "../../prompts/message";

export default class productosCrear extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            rediret: false,

            message: {
                text: '',
                show: false,
            },

            loading: false,

            producto: {

                id_producto: '',
                nombre: '',
                descripcion: '',
                marca: '',
                valor: '',

            },

        };

        this.onExitedMessage = this.onExitedMessage.bind(this);

    }

    setValue(iniciop, value) {

        this.setState({
            producto: {

                ...this.state.producto,
                [iniciop]: value,

            },
        });
    }

    guardarProductos() {

        this.setState({ loading: true });
        request
            .post('/productos', this.state.producto)
            .then((response) => {

                if (response.data.exito) {

                    this.setState({
                        rediret: response.data.exito,

                        message: {
                            text: response.data.msg,
                            show: true,
                        },
                    });
                }

                this.setState({ loading: false });

            })
            .catch((err) => {
                console.error(err);
                this.setState({ loading: true });
            });
    }

    onExitedMessage() {

        if (this.state.rediret) this.props.changeTab('buscar');

    }

    render() {
        return (
            <Container id="productos-crear-container">
                <MessagePrompts
                    text={this.state.message.text}
                    show={this.state.message.show}
                    duration={3500}
                    onExited={this.onExitedMessage}
                />
                <Loading show={this.state.loading} />
                <Row>
                    <h1>Ingresar Productos</h1>
                </Row>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Codigo</Form.Label>
                            <Form.Control
                                onChange={(e) => this.setValue('id_producto', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                onChange={(e) => this.setValue('nombre', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                onChange={(e) => this.setValue('descripcion', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                onChange={(e) => this.setValue('marca', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                onChange={(e) => this.setValue('valor', e.target.value)}
                            />
                        </Form.Group>


                        <Button variant="dark" onClick={() => console.log(this.guardarProductos())}>
                            Guardar
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}
