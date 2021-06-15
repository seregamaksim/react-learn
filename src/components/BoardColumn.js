import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeBoard } from '../app/reducers/Boards';
import ColumnCard from './ColumnCard';

export default function BoardColumn(props) {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isOpenAddCard, setIsAddOpenCard] = useState(false);
  const data = props.data;
  const dispatch = useDispatch();
  function addCard() {
    if (newCardTitle.length > 0) {
      setCards((prevCards) => prevCards.concat({ text: newCardTitle }));
      setNewCardTitle('');
    }
  }

  return (
    <div className={props.className}>
      {/* header */}
      <div>
        <p>{data.title}</p>
        <button onClick={() => dispatch(removeBoard(data.id))}>X</button>
      </div>
      {/* cards */}
      <ul>
        {cards.length > 0 &&
          cards.map((item, index) => <ColumnCard key={index} data={item} />)}
      </ul>
      {/* footer */}
      <div>
        {!isOpenAddCard && (
          <button onClick={() => setIsAddOpenCard(true)}>
            Add one more card
          </button>
        )}
        {isOpenAddCard && (
          <div>
            <input
              type="text"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Input title card"
            />
            <div>
              <button onClick={addCard}>Add card</button>
              <button onClick={() => setIsAddOpenCard(false)}>X</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
