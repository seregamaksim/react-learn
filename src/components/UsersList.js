import React, { Component } from "react";
import styled from "styled-components";
import UsersItem from "./UsersItem";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  async componentDidMount() {
    const BASE_URL = "https://dummyapi.io/data/api";
    const APP_ID = "60a4c30ff5cfa16a43cda348";
    const request = await fetch(`${BASE_URL}/user?limit=10`, {
      headers: { "app-id": APP_ID },
    });
    const response = await request.json();

    this.setState({ users: response.data });
    console.log("response", this.state.users);
  }
  render() {
    const listItems = this.state.users.map((item) => {
      return <UsersItem key={item.id} info={item} />;
    });
    return (
      //   <Router>
      <List>{listItems}</List>
      //   </Router>
    );
  }
}

export default UsersList;
