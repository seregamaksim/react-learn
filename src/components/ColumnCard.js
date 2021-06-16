import styled from 'styled-components';

const CardItem = styled.li`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  padding: 6px;
  cursor: pointer;
  &:hover {
    background-color: #f4f5f7;
  }
`;
export default function ColumnCard(props) {
  const data = props.data;
  return (
    <CardItem className={props.className}>
      <div
        onClick={() => {
          props.openCardModal(data);
        }}
      >
        {data.text}{' '}
      </div>
      <button
        // style={{ display: 'inline-block', position: 'relative', zIndex: '10' }}
        onClick={() => props.removeHandle(data.id)}
      >
        X
      </button>
    </CardItem>
  );
}
