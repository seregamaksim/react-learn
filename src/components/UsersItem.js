import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const UserItem = styled.li`
  background-color: #f9f9f9;
  list-style: none;
`;
const UserItemWrap = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const UserItemAva = styled.img.attrs((props) => ({
  width: 150,
  height: 150,
  src: props.src,
}))`
  margin-bottom: 14px;
`;
const UserItemName = styled.p`
  font-size: 18px;
  line-height: 24px;
  color: #1f1f1f;
  margin-bottom: 15px;
`;
const UserItemEmail = styled.a`
  font-size: 16px;
  line-height: 22px;
  color: #000;
  position: relative;
  &:hover {
    opacity: 0.7;
    text-decoration: none;
  }
`;
const UserItemLink = styled(Link)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
class UsersItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.info,
    };
  }
  render() {
    return (
      <UserItem>
        <UserItemWrap>
          <UserItemLink to={`/user/${this.state.userInfo.id}`}></UserItemLink>
          <UserItemAva src={this.state.userInfo.picture}></UserItemAva>
          <UserItemName>
            {this.state.userInfo.firstName} {this.state.userInfo.lastName}
          </UserItemName>
          <UserItemEmail href={`mailto: ${this.state.userInfo.email}`}>
            {this.state.userInfo.email}
          </UserItemEmail>
        </UserItemWrap>
      </UserItem>
    );
  }
}

export default UsersItem;
