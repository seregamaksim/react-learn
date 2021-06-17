import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addNewCard, selectCards } from '../app/reducers/BoardCards';
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
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isOpenAddCard, setIsAddOpenCard] = useState(false);
  const dispatch = useDispatch();
  const allCards = useSelector(selectCards);
  const data = props.data;

  function addCard() {
    if (newCardTitle.length > 0) {
      dispatch(
        addNewCard({
          columnId: data.id,
          id: Date.now(),
          text: newCardTitle,
        })
      );
      setNewCardTitle('');
    }
  }

  return (
    <Column className={props.className}>
      <ColumnHeader>
        <ColumnHeaderTitle>{data.title}</ColumnHeaderTitle>
        <button onClick={() => dispatch(removeBoard(data.id))}>X</button>
      </ColumnHeader>
      <ColumnCardsList>
        {allCards.length > 0 &&
          allCards
            .filter((item) => item.columnId === data.id)
            .map((item, index) => (
              <StyledColumnCard
                key={index}
                data={item}
                openCardModal={props.openCardModal}
              />
            ))}
      </ColumnCardsList>
      <div>
        {!isOpenAddCard && (
          <button
            onClick={() => {
              setIsAddOpenCard(true);
              // console.log('inputRef', inputRef.current);
            }}
          >
            Add one more card
          </button>
        )}
        {isOpenAddCard && (
          <div>
            <input
              type="text"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  addCard();
                }
              }}
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
