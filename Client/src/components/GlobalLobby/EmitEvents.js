export default class EmitEvents {
  constructor(bind){
    this.bind = bind;
  };

  getUsers = () => {
    let socket = this.bind.props.socket;
    if (socket) {
      socket.emit("get_users");
    } else {
      this.bind.setState({
        error: "No estas conectado"
      });
    }
  };
  
  acceptChallenge = (challengeIndex) => {
    const { challenges } = this.bind.state;
    let socket = this.bind.props.socket;
    const challengerInfo = challenges[challengeIndex];
    if (socket) {
      socket.emit("accept_challenge", { ...challengerInfo, userId: socket.id });
    } else {
      this.bind.setState({
        error: "No estas conectado"
      });
    }
  };
  
  sendChallenge = (userId) => {
    let socket = this.bind.props.socket;
    if (socket) {
      socket.emit("send_challenge", { userId, challengerId: socket.id })
    } else {
      this.bind.setState({
        error: "No estas conectado"
      });
    }
  };
  
  handleConnect = () => {
    const username = document.getElementById("username").value || "Player";
    if(!this.bind.props.socket){
      this.bind.props.createSocket(username);
      this.bind.setState({
        error: ""
      });
    } else {
      this.bind.setState({
        error: "Ya estas conectado"
      });
    }
  };
  
  handleChangeUsername = () => {
    const username = document.getElementById("username").value || "Player";
    let socket = this.bind.props.socket;
    if (socket) {
      socket.emit("change_username", { username: username });
    } else {
      this.bind.setState({
        error: "No estas conectado"
      });
    }
  };

}

