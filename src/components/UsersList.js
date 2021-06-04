import { useState, useEffect } from 'react';
import styled from 'styled-components';
import UsersItem from './UsersItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, selectFilteredUsers } from '../app/reducers/Users';
import AddUserModal from './AddUserModal';
import Search from './Search';
import EmptyUsersList from './EmptyUsersList';

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

  cursor: pointer;
  @media (max-width: 600px) {
    margin-bottom: 10px;
  }
`;
const HeadWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
function UsersList() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const users = useSelector(selectFilteredUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch]);
  const listItems = users.map((item) => {
    return <UsersItem key={item.id} info={item} />;
  });
  return (
    <Wrapper>
      <HeadWrap>
        <AddUserBtn onClick={() => setIsOpenModal(true)}>Add user</AddUserBtn>
        <Search></Search>
      </HeadWrap>
      {users.length > 0 ? <List>{listItems}</List> : <EmptyUsersList />}
      <AddUserModal
        open={isOpenModal}
        closeEvent={setIsOpenModal}
      ></AddUserModal>
    </Wrapper>
  );
}

export default UsersList;
