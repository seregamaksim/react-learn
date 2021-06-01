import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UserPost from './UserPost';

const ShowUserPosts = styled.ul`
  display: ${(props) => (props.show ? 'block' : 'none')};
  margin-top: 30px;
`;
const StyledUserPost = styled(UserPost)`
  padding-bottom: 10px;
  border-bottom: 1px solid #dadada;
  margin-bottom: 20px;
`;

export default function UserPosts(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${props.id}/posts`)
      .then(({ data }) => {
        setPosts(data);
      });
  }, []);
  let listPosts = posts.map((post) => {
    return <StyledUserPost key={post.id} data={post} />;
  });
  return <ShowUserPosts show={props.show}>{listPosts}</ShowUserPosts>;
}
