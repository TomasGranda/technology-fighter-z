import React, { Component } from 'react';


class MultiplayerTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: "",
            error: ""
        };
    }

    handleConnect = () => {
        this.setState({
            socket: ""
        });
    };

    emitMsg = (msg) => {
        const socket = this.state.socket;
        if (socket) {
            socket.emit("new_message", { message: msg });
        } else {
            this.setState({ error: "Not connected" })
            setTimeout(() => {
                this.setState({ error: "" })
            }, 2000);
        }
    }

    componentWillUnmount() {
        const socket = this.state.socket;
        if (socket) {
            socket.disconnect();
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.error}</p>
                <button onClick={this.handleConnect} >Connect</button>
                <button onClick={() => this.emitMsg("asd")} >Hola 2</button>
            </div>
        );
    }
}

export default MultiplayerTest;