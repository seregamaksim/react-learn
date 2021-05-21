import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { YMaps, Map, ZoomControl, Placemark } from 'react-yandex-maps';
import loadMaps from '../helpers/loadMaps';
import isEmpty from '../helpers/isEmpty';
import { Link } from 'react-router-dom';

const ProfileSection = styled.section`
  /* background-color: yellow; */
  /* display: flex; */
`;
const ProfileWrapper = styled.div`
  padding: 20px;
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
`;
const MainInfoWrap = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 18px;
  line-height: 1.3;
`;
const MainInfo = styled.div``;
const UserName = styled.h2`
  font-size: 22px;
  color: #111;
  margin-bottom: 15px;
`;
const UserLink = styled.a`
  display: block;
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const JobsName = styled.p`
  color: blue;
`;
const MapElem = styled.div`
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
export default function UserProfile(props) {
  const [userId, setUserId] = useState(props.match.params.id);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useState(false);

  useEffect(() => {
    console.log('userData');
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      // .then((res) => res.json())
      .then(
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
            {
              <ProfileImage
                src={`https://picsum.photos/id/${userData.id}/300`}
              ></ProfileImage>
            }
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
            </MainInfo>
          </MainInfoWrap>
          <YMaps>
            <Map
              defaultState={{
                center: location,
                zoom: 9,
                controls: true,
              }}
              width="100%"
              height="450px"
            >
              <ZoomControl options={{ float: 'right' }} />
              <Placemark
                geometry={location}
                properties={{
                  hintContent: 'Это хинт',
                  balloonContent: location,
                }}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              />
            </Map>
          </YMaps>
        </ProfileWrapper>
      </ProfileSection>
    ) : null;
  }
}
