import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UsersItem from './UsersItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, selectUsers } from '../app/reducers/Users';
import AddUserModal from './AddUserModal';

const Wrapper = styled.div`
  padding: 20px 15px;
`;
const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 15px 0;
`;
const AddUserBtn = styled.button`
  border: 0;
  border-radius: 10px;
  background-color: lightblue;
  padding: 10px 15px;
  color: #333;
  margin-bottom: 30px;
  cursor: pointer;
`;

function UsersList() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch]);
  const listItems = users.map((item: { id: number }) => {
    return <UsersItem key={item.id} info={item} />;
  });
  return (
    <Wrapper>
      <AddUserBtn onClick={() => setIsOpenModal(true)}>Add user</AddUserBtn>
      <List>{listItems}</List>
      <AddUserModal
        open={isOpenModal}
        closeEvent={setIsOpenModal}
      ></AddUserModal>
    </Wrapper>
  );
}

export default UsersList;
