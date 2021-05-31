import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UsersItem from './UsersItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, selectUsers } from '../app/reducers/Users';

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 15px;
`;

function UsersList() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch]);
  const listItems = users.map((item) => {
    return <UsersItem key={item.id} info={item} />;
  });
  return <List>{listItems}</List>;
}

export default UsersList;
