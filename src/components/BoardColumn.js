import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeBoard } from '../app/reducers/Boards';
import ColumnCard from './ColumnCard';

const Column = styled.div`
  padding: 10px;
  background-color: #ebecf0;
  min-width: 250px;
  border-radius: 3px;
`;
const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #a0a0a0;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;
const ColumnHeaderTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.2;
`;
const ColumnCardsList = styled.ul``;

const StyledColumnCard = styled(ColumnCard)`
  margin-bottom: 10px;
  list-style: none;
`;
export default function BoardColumn(props) {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isOpenAddCard, setIsAddOpenCard] = useState(false);
  const data = props.data;
  const dispatch = useDispatch();

  function addCard() {
    if (newCardTitle.length > 0) {
      setCards((prevCards) =>
        prevCards.concat({ id: Date.now(), text: newCardTitle })
      );
      setNewCardTitle('');
    }
  }
  function removeCard(id) {
    const newCards = cards.filter((item) => item.id !== id);
    setCards(newCards);
  }

  return (
    <Column className={props.className}>
      {/* header */}
      <ColumnHeader>
        <ColumnHeaderTitle>{data.title}</ColumnHeaderTitle>
        <button onClick={() => dispatch(removeBoard(data.id))}>X</button>
      </ColumnHeader>
      {/* cards */}
      <ColumnCardsList>
        {cards.length > 0 &&
          cards.map((item, index) => (
            <StyledColumnCard
              key={index}
              data={item}
              openCardModal={props.openCardModal}
              removeHandle={removeCard}
            />
          ))}
      </ColumnCardsList>
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
    </Column>
  );
}
