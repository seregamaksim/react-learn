import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeBoard } from '../app/reducers/Boards';

export default function BoardColumn(props) {
  const [cards, setCards] = useState([]);
  const data = props.data;
  const dispatch = useDispatch();
  return (
    <div className={props.className}>
      <div>
        <p>{data.title}</p>
        <button onClick={() => dispatch(removeBoard(data.id))}>X</button>
      </div>
      <ul>{cards.length > 0 && cards.map((item) => <li>{item.text}</li>)}</ul>
      <button
        onClick={() => {
          setCards((prevCards) => prevCards.concat({ text: 'test' }));
        }}
      >
        Add card
      </button>
    </div>
  );
}
