import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const UserItem = styled.li`
  background-color: #f9f9f9;
  list-style: none;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
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
function UsersItem(props) {
  const [userInfo, setUserInfo] = useState(props.info);

  return (
    <UserItem>
      <UserItemWrap>
        <UserItemLink to={`/${userInfo.id}`}></UserItemLink>
        {
          <UserItemAva
            src={`https://picsum.photos/id/${userInfo.id}/150`}
          ></UserItemAva>
        }
        <UserItemName>{userInfo.name}</UserItemName>
        <UserItemEmail href={`mailto: ${userInfo.email}`}>
          {userInfo.email}
        </UserItemEmail>
      </UserItemWrap>
    </UserItem>
  );
}

export default UsersItem;
