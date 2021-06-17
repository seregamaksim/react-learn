import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeCard } from '../app/reducers/BoardCards';

const CardRemoveBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  border: 0;
  background: none;
  font-size: 14px;
  padding: 8px;
  opacity: 0;
  transition: all 0.3s ease;
  &:hover {
    color: red;
  }
`;
const CardItem = styled.li`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  padding: 6px;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #f4f5f7;
  }
  &:hover ${CardRemoveBtn} {
    opacity: 1;
  }
`;
const CardItemTitleWrap = styled.div`
  max-width: 90%;
`;
const CardItemTitle = styled.p`
  font-size: 14px;
  color: #333;
`;
export default function ColumnCard(props) {
  const data = props.data;
  const dispatch = useDispatch();
  // const test = useSelector(selectTest);
  return (
    <CardItem className={props.className}>
      <CardItemTitleWrap
        onClick={() => {
          props.openCardModal(data);
        }}
      >
        <CardItemTitle>{data.text}</CardItemTitle>
      </CardItemTitleWrap>
      <CardRemoveBtn onClick={() => dispatch(removeCard(data.id))}>
        X
      </CardRemoveBtn>
    </CardItem>
  );
}
