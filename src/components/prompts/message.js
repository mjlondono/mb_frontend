import React from 'react';
import { Modal } from 'react-bootstrap';
import { isUndefined, isNull } from 'util';
import "./prompts.css";


export default class MessagePrompts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            show: false,
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.show) this.setState({ show: true }, this.hideMessage());

    }

    hideMessage() {

        setTimeout(() => {

            this.setState({ show: false });

        }, this.props.durtion);

    }

    onExited() {

        if (!isUndefined(this.props.onExited) && !isNull(this.props.onExited))
            this.props.onExited();

    }

    render() {
        return (

            <Modal id="message-prompt" certered show={this.state.show}
                onExited={() => this.onExited()}>
                <Modal.Body>

                    {this.props.text}

                </Modal.Body>
            </Modal>
        );
    }
}
