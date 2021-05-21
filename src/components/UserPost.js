import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PostItem = styled.li`
  list-style: none;
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #111;
  }
  p {
    font-size: 16px;
    color: #444;
    margin-bottom: 15px;
  }
`;
function getComments(userId) {
  let comments;
  axios
    .get(`https://jsonplaceholder.typicode.com/posts/${userId}/comments`)
    .then((res) => {
      console.log('res', res.data);
      comments = res.data;
    });
  return comments;
}
export default function UserPost(props) {
  const [postData, setPostData] = useState(props.data);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${postData.userId}/comments`
      )
      .then((res) => {
        console.log('res', res.data);
        setComments(res.data);
      });
    // setComments(getComments(postData.userId));
  }, []);

  return (
    <PostItem className={props.className}>
      <h3>{postData.title}</h3>
      <p>{postData.body}</p>
      <button
      // onClick={() => {
      //   setComments(getComments(postData.userId));
      // }}
      >
        Show Comments
      </button>
      {comments.map((comment) => (
        <p>{comment.name}</p>
      ))}
    </PostItem>
  );
}
