import { useState } from 'react';
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
const CommentList = styled.ul`
  padding-left: 30px;
  padding-top: 20px;
`;
const CommentItem = styled.li`
  list-style: none;
  margin-bottom: 20px;
  border: 1px solid #dadada;
  border-radius: 5px;
  padding: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  h4 {
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
`;
export default function UserPost(props) {
  const [postData, setPostData] = useState(props.data);
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(false);

  function loadComment(commentId) {
    if (comments.length === 0) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${commentId}/comments`)
        .then((res) => {
          console.log('res', res.data);
          setComments(res.data);
        });
    }
  }
  return (
    <PostItem className={props.className}>
      <h3>{postData.title}</h3>
      <p>{postData.body}</p>
      <button
        onClick={() => {
          setShowComment(!showComment);
          loadComment(postData.id);
        }}
      >
        {showComment ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComment ? (
        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <h4>{comment.name}</h4>
              <p>{comment.body}</p>
              <a href={`mailto:${comment.email}`}>{comment.email}</a>
            </CommentItem>
          ))}
        </CommentList>
      ) : null}
    </PostItem>
  );
}
