import React from 'react';
import { Container, Row } from 'react-bootstrap';
import "../productos.css";
import DataGrid from '../../grid/grid';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import ConfirmationPromprs from '../../prompts/confirmation';
import MessagePrompts from "../../prompts/message";

const columns = [
    {
        dataField: "_id",
        text: "ID",
        hidden: true,
    },
    {
        dataField: "id_producto",
        text: "Id"
    },
    {
        dataField: "nombre",
        text: 'Nombre'
    },
    {
        dataField: "descripcion",
        text: "Descripcion"
    },
    {
        dataField: "marca",
        text: "Marca"
    },
    {
        dataField: "valor",
        text: "Valor"
    },

];

export default class productosBuscar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            loading: false,
            idProducto: null,

            confirmation: {
                title: 'Eliminar Producto',
                text: '¿Desea Eliminar el Producto?',
                show: false,
            },

            message: {
                text: '',
                show: false,
            },

        };

        this.onClickEditButton = this.onClickEditButton.bind(this);
        this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    componentDidMount() {
        request
            .get(this.props.url)
            .then((response) => {
                this.setState({ rows: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onClickEditButton(row) {

        //console.log(row)
        this.props.setIdProducto(row._id);
        this.props.changeTab('editar');

    }

    onClickDeleteButton(row) {

        //console.log(row)

        this.setState({
            idProducto: row._id,
            confirmation: {
                ...this.state.confirmation,
                show: true,
            },
        });
        //,this.eliminarProducto()

    }

    onCancel() {
        this.setState({
            confirmation: { ...this.state.confirmation, show: false, },
        });
    }

    onConfirm() {
        this.setState({
            confirmation: { ...this.state.confirmation, show: false, },
        },
            this.eliminarProducto());
    }

    eliminarProducto() {
        this.setState({ loading: true });
        request
            .delete(`/productos/${this.state.idProducto}`)
            .then((response) => {

                this.setState({
                    loading: false,
                    message: {
                        text: response.data.msg,
                        show: true,
                    },
                });
                //this.setState({ loading: false });
                if (response.data.exito) this.reLoadPage();
            })
            .catch((err) => {
                console.error(err);
                this.setState({ loading: false });
            });

    }

    reLoadPage() {

        setTimeout(() => {

            window.location.reload();
        });
    }

    render() {

        return (

            <Container id="productos-buscar-container">

                <ConfirmationPromprs
                    show={this.state.confirmation.show}
                    title={this.state.confirmation.title}
                    text={this.state.confirmation.text}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                />
                <MessagePrompts
                    text={this.state.message.text}
                    show={this.state.message.show}
                    duration={3500}
                    onExited={this.onExitedMessage}
                />
                <Loading show={this.state.Loading} />
                <Row>
                    <h1>Buscar Productos</h1>
                </Row>
                <Row>

                    <DataGrid url="/productos" columns={columns}
                        showEditButton={true}
                        showDeleteButton={true}
                        onClickEditButton={this.onClickEditButton}
                        onClickDeleteButton={this.onClickDeleteButton}
                    />

                </Row>
            </Container>
        );
    }
}
