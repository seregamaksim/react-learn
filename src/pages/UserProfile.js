import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import isEmpty from '../helpers/isEmpty';
import UserMapProfile from '../components/UserMapProfile';
import TabsButton from '../components/TabsButton';
import UserPosts from '../components/UserPosts';
import { useSelector } from 'react-redux';
import { selectUsers } from '../app/reducers/Users';

const ProfileSection = styled.section`
  /* background-color: yellow; */
  /* display: flex; */
`;
const ProfileWrapper = styled.div`
  padding: 15px;
  width: 100%;
  /* display: flex;
  justify-content: space-between;
  align-items: flex-start; */
`;

const ProfileImage = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin-right: 30px;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.3);
  @media (max-width: 700px) {
    margin-bottom: 20px;
  }
`;
const MainInfoWrap = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 18px;
  line-height: 1.3;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;
const MainInfo = styled.div`
  @media (max-width: 700px) {
    align-self: flex-start;
  }
`;
const UserName = styled.h1`
  /* font-size: 22px; */
  color: #111;
  margin-bottom: 15px;
`;
const UserLink = styled.a`
  display: block;
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const MapElem = styled(UserMapProfile)`
  display: ${(props) => (props.show ? 'block' : 'none')};
  width: 100%;
  height: 450px;
  margin-top: 30px;
`;
const Header = styled.header`
  font-size: 18px;
  color: #000;
  padding: 15px;
  & li {
    list-style: none;
  }
`;
const TabsButtons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;
const StyleTabsButton = styled(TabsButton)`
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

export default function UserProfile(props) {
  const allUsers = useSelector(selectUsers);
  const [userId, setUserId] = useState(props.match.params.id);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useState(false);
  const [isOpenMap, setOpenMap] = useState(false);
  const [isOpenPost, setOpenPost] = useState(false);
  const [loadPosts, setLoadPosts] = useState(false);
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    if (allUsers.find((item) => item.id === Number(userId))) {
      let userObj = allUsers.find((item) => {
        return item.id === Number(userId);
      });
      setUserData(userObj);
      setIsLoaded(true);
      setLocation([
        Number(userObj.address.geo.lat),
        Number(userObj.address.geo.lng),
      ]);
    } else {
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`).then(
        ({ data }) => {
          console.log('res', data);
          setIsLoaded(true);
          setUserData(data);
          setLocation([
            Number(data.address.geo.lat),
            Number(data.address.geo.lng),
          ]);
        },
        (error) => {
          console.log('error');
          setIsLoaded(true);
          setError(error);
        }
      );
    }
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return !isEmpty(userData) ? (
      <ProfileSection>
        <Header>
          <ul>
            <li>
              <Link to="/">Back</Link>
            </li>
          </ul>
        </Header>
        <ProfileWrapper>
          <MainInfoWrap>
            <ProfileImage
              src={`https://picsum.photos/id/${userData.id}/300`}
            ></ProfileImage>
            <MainInfo>
              <UserName>{userData.name}</UserName>
              <UserLink href={`mailto: ${userData.email}`}>
                {userData.email}
              </UserLink>
              <UserLink href={`tel: ${userData.phone}`}>
                {userData.phone}
              </UserLink>
              <UserLink href={userData.website}>{userData.website}</UserLink>
              <h3>Jobs</h3>
              <p>{userData.company.name}</p>
              <h3>City</h3>
              <p>{userData.address.city}</p>
            </MainInfo>
          </MainInfoWrap>
          <TabsButtons>
            <StyleTabsButton
              clickHandler={() => {
                setOpenPost(!isOpenPost);
                setOpenMap(false);
                setLoadPosts(true);
              }}
              text={isOpenPost ? 'Hide Posts' : 'Show Posts'}
            ></StyleTabsButton>
            <StyleTabsButton
              text={isOpenMap ? 'Hide Map' : 'Show Map'}
              clickHandler={() => {
                setOpenMap(!isOpenMap);
                setOpenPost(false);
                setLoadMap(true);
              }}
            ></StyleTabsButton>
          </TabsButtons>
          {loadPosts ? <UserPosts show={isOpenPost} id={userId} /> : null}
          {loadMap ? <MapElem show={isOpenMap} location={location} /> : null}
        </ProfileWrapper>
      </ProfileSection>
    ) : null;
  }
}
