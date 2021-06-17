import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addBoard, selectBoards } from '../app/reducers/Boards';
import BoardColumn from '../components/BoardColumn';
import BoardCardModal from '../components/BoardCardModal';

const Board = styled.div`
  display: flex;
  height: calc(100vh - 44px);
  width: 100%;
  overflow: auto;
  padding: 15px;
`;

const AddColumnBlock = styled.div`
  position: relative;
`;
const AddColumnBlockPopup = styled.div`
  display: ${(props) => (props.popupOpen ? 'block' : 'none')};
  position: absolute;
  left: 0;
  top: 0;
  width: 250px;
  padding: 10px;
  background-color: #cecece;
`;
const AddColumnBtn = styled.button`
  border: 0;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.2;
  color: #fff;
  background-color: lightblue;
  padding: 10px 15px;
  cursor: pointer;
  min-width: 250px;
`;
const StyledBoardColumn = styled(BoardColumn)`
  margin-right: 10px;
`;
const ColumnList = styled.div`
  display: flex;
  align-items: flex-start;
`;
export default function Trello() {
  const [titleColumnValue, setTitleColumnValue] = useState('');
  const [popupTitleColumnOpen, setPopupTitleColumnOpen] = useState(false);
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [cardInfo, setCardInfo] = useState({});
  const boards = useSelector(selectBoards);
  const dispatch = useDispatch();

  const boardList = boards.map((item, index) => {
    return (
      <StyledBoardColumn
        key={index}
        data={item}
        openCardModal={openCardModal}
      />
    );
  });
  function addColumn() {
    if (titleColumnValue.length > 0) {
      dispatch(addBoard({ id: Date.now(), title: titleColumnValue }));
      setTitleColumnValue('');
    }
  }
  function openCardModal(data) {
    setCardInfo(data);
    setIsOpenCard(true);
  }
  return (
    <>
      <Board>
        <ColumnList>{boardList}</ColumnList>
        <AddColumnBlock>
          <AddColumnBtn
            onClick={() => setPopupTitleColumnOpen(!popupTitleColumnOpen)}
          >
            Add one more column
          </AddColumnBtn>
          <AddColumnBlockPopup popupOpen={popupTitleColumnOpen}>
            <input
              name="title-column"
              type="text"
              value={titleColumnValue}
              onChange={(e) => setTitleColumnValue(e.target.value)}
            />
            <div>
              <button onClick={addColumn}>Add</button>
              <button onClick={() => setPopupTitleColumnOpen(false)}>
                Close
              </button>
            </div>
          </AddColumnBlockPopup>
        </AddColumnBlock>
      </Board>
      <BoardCardModal
        isOpen={isOpenCard}
        closeModal={setIsOpenCard}
        cardInfo={cardInfo}
      />
    </>
  );
}
