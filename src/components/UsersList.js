import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UsersItem from './UsersItem';

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

function UsersList() {
  console.log('render');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then(({ data }) => setUsers(data));
  }, []);
  console.log('response', users);
  const listItems = users.map((item) => {
    return <UsersItem key={item.id} info={item} />;
  });
  return <List>{listItems}</List>;
}

export default UsersList;
