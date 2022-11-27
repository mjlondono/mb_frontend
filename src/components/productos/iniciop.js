import React from 'react'
import { Container, Row, Nav } from 'react-bootstrap';
import "./productos.css";
import ProductosBuscar from "./crud/buscar";
import ProductosCrear from "./crud/crear";
import ProductosEditar from "./crud/editar";

export default class Productos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            currentTab: 'buscar',
            _id: null,
        };

        this.changeTab = this.changeTab.bind(this);
        this.setIdProducto = this.setIdProducto.bind(this);
        this.getIdProducto = this.getIdProducto.bind(this);

    }

    setIdProducto(id) {

        this.setState({ _id: id });

    }

    getIdProducto() {

        return this.state._id;

    }

    changeTab(tab) {

        this.setState({ currentTab: tab });

    }

    render() {
        return (

            <Container id="productos-container">
                <Row>
                    <Nav fill variant="tabs"
                        defaultActiveKey="/buscar"
                        onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
                    >
                        <Nav.Item>
                            <Nav.Link eventKey="buscar">Buscar</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="crear">Crear</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>

                <Row>
                    {/* {this.state.currentTab === 'buscar' ? (<ProductosBuscar />) :
                        this.state.currentTab === 'crear' ? (<ProductosCrear changeTab={
                            (tab) => this.changeTab(tab)
                        } />) : (<ProductosEditar />)} */}

                    {this.state.currentTab === 'buscar' ? (
                        <ProductosBuscar
                            changeTab={this.changeTab}
                            setIdProducto={this.setIdProducto} />
                    ) : this.state.currentTab === 'crear' ? (
                        <ProductosCrear changeTab={this.changeTab} />
                    ) : (
                        <ProductosEditar
                            changeTab={this.changeTab}
                            getIdProducto={this.getIdProducto} />
                    )}

                </Row>

            </Container >
        );
    }
}
