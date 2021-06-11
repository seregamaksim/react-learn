import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addBoard, selectBoards } from '../app/reducers/Boards';
import BoardColumn from '../components/BoardColumn';

const Board = styled.div`
  display: flex;
`;

const AddColumnBlock = styled.div`
  position: relative;
`;
const AddColumnBlockPopup = styled.div`
  display: ${(props) => (props.popupOpen ? 'block' : 'none')};
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  padding: 10px;
  background-color: #cecece;
`;
const StyledBoardColumn = styled(BoardColumn)`
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;
export default function Trello() {
  const [titleColumnValue, setTitleColumnValue] = useState('');
  const [popupTitleColumnOpen, setPopupTitleColumnOpen] = useState(false);
  const boards = useSelector(selectBoards);
  const dispatch = useDispatch();

  const boardList = boards.map((item, index) => {
    return <StyledBoardColumn key={index} data={item} />;
  });
  function addColumn() {
    if (titleColumnValue.length > 0) {
      dispatch(addBoard({ id: Date.now(), title: titleColumnValue }));
      setTitleColumnValue('');
    }
  }
  return (
    <Board>
      <div style={{ display: 'flex' }}>{boardList}</div>
      <AddColumnBlock>
        <button onClick={() => setPopupTitleColumnOpen(!popupTitleColumnOpen)}>
          Add column
        </button>
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
  );
}
