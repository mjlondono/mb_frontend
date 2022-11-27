import React from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompts from "../../prompts/message";
import ConfirmationPrompts from "../../prompts/confirmation";

export default class ProductosEditar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            idProducto: this.props.getIdProducto(),
            rediret: false,

            message: {
                text: '',
                show: false,
            },

            confirmation: {
                title: 'Modificar Producto',
                text: '¿Desea Modificar el Producto?',
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
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);

    }

    componentDidMount() {

        this.getProducto();
    }

    getProducto() {
        this.setState({ loading: true });
        request
            .get(`/productos/${this.state.idProducto}`)
            .then((response) => {
                this.setState({
                    producto: response.data,
                    loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    setValue(iniciop, value) {

        this.setState({
            producto: {

                ...this.state.producto,
                [iniciop]: value,

            },
        });
    }

    guardarProducto() {

        this.setState({ loading: true });
        request
            .put(`/productos/${this.state.idProducto}`, this.state.producto)
            .then((response) => {

                if (response.data.exito) {

                    this.props.changeTab('bucar');
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

    onCancel() {
        this.setState({
            confirmation: { ...this.state.confirmation, show: false, },
        })
    }

    onConfirm() {
        this.setState({
            confirmation: { ...this.state.confirmation, show: false, },
        },
            this.guardarProducto());
    }

    render() {
        return (
            <Container id="productos-crear-container">
                <MessagePrompts
                    text={this.state.message.text}
                    show={this.state.message.show}
                    duration={2500}
                    onExited={this.onExitedMessage}
                />
                <ConfirmationPrompts
                    show={this.state.confirmation.show}
                    title={this.state.confirmation.title}
                    text={this.state.confirmation.text}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                />
                <Loading show={this.state.loading} />
                <Row>
                    <h1>Editar Productos</h1>
                </Row>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Codigo</Form.Label>
                            <Form.Control
                                value={this.state.producto.id_producto}
                                onChange={(e) => this.setValue('id_producto', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                value={this.state.producto.nombre}
                                onChange={(e) => this.setValue('nombre', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control
                                value={this.state.producto.descripcion}
                                onChange={(e) => this.setValue('descripcion', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                value={this.state.producto.marca}
                                onChange={(e) => this.setValue('marca', e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label>Valor</Form.Label>
                            <Form.Control
                                value={this.state.producto.valor}
                                onChange={(e) => this.setValue('valor', e.target.value)}
                            />
                        </Form.Group>


                        <Button variant="dark"
                            onClick={() =>
                                this.setState({
                                    confirmation: { ...this.state.confirmation, show: true },
                                })
                            }
                        >
                            Guardar
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
    }
}
