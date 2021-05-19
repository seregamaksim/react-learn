import React, { Component } from "react";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.match.params.id,
      userData: [],
    };
    console.log("props.match.params", this.state.userId);
  }
  async componentDidMount() {
    const BASE_URL = "https://dummyapi.io/data/api";
    const APP_ID = "60a4c30ff5cfa16a43cda348";
    const request = await fetch(`${BASE_URL}/user/${this.state.userId}`, {
      headers: { "app-id": APP_ID },
    });
    const response = await request.json();

    this.setState({ userData: response });
    console.log("response", this.state.userData);
  }
  render() {
    return (
      <h1>
        {this.state.userData.firstName} {this.state.userData.lastName}
      </h1>
    );
  }
}
