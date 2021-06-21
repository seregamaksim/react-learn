import { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addDescriptionId, updateTitle } from '../app/reducers/BoardCards';
import {
  addDescription,
  updateDescription,
  removeDescription,
} from '../app/reducers/BoardCardsDescription';
import isEmpty from '../helpers/isEmpty';
import DescriptionCardItem from './DescriptionCardItem';

const Modal = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.33);
`;
const ModalWrapper = styled.div`
  padding: 15px;
  background-color: #ebecf0;
  width: 60vw;
`;
const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ModalTextarea = styled.textarea`
  width: 100%;
  max-width: 100%;
  resize: vertical;
`;
const ModalDescrWrap = styled.div`
  margin-bottom: 10px;
`;
const ModalDescrHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  display: none;
`;
const ModalTitleTextarea = styled.textarea`
  background: transparent;
  font-size: 18px;
  font-weight: bold;
  border: 0;
  resize: none;
  min-height: 24px;
  height: 28px;
  border-radius: 5px;
  flex: 1;
  overflow: hidden;
  &:focus {
    background: #fff;
    border: 1px solid #cecece;
  }
`;

function BoardCardModal(props) {
  const [descriptionVal, setDescriptionVal] = useState('');
  const [defaultTitle, setDefaultTitle] = useState('');

  const cardInfo = props.cardInfo;
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  useEffect(() => {
    setDefaultTitle(props.cardInfo.text);
  }, [cardInfo]);
  function addNewDescr() {
    if (descriptionVal.length > 0) {
      const id = Date.now();
      dispatch(
        addDescription({
          cardId: props.cardId,
          body: descriptionVal,
          id,
        })
      );
      dispatch(
        addDescriptionId({
          cardId: props.cardId,
          id,
        })
      );
      setDescriptionVal('');
    }
  }
  function updateCardTitle() {
    dispatch(updateTitle({ cardId: props.cardId, title: defaultTitle }));
  }
  return isEmpty(cardInfo) ? null : (
    <Modal isOpen={props.isOpen}>
      <ModalWrapper>
        <ModalHead>
          <ModalTitle>{defaultTitle}</ModalTitle>
          <ModalTitleTextarea
            ref={textareaRef}
            value={defaultTitle}
            onChange={(e) => setDefaultTitle(e.target.value)}
            onBlur={(e) => {
              if (e.target.value.length === 0) {
                e.preventDefault();
                textareaRef.current.focus();
                return false;
              }
              updateCardTitle();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (e.target.value.length === 0) {
                  return false;
                }
                textareaRef.current.blur();
                updateCardTitle();
              }
            }}
            spellCheck="false"
          />

          <button onClick={() => props.closeModal(false)}>X</button>
        </ModalHead>
        <hr />
        {props.description && (
          <ModalDescrWrap>
            <ModalDescrHead>
              <h4>Description:</h4>
            </ModalDescrHead>
            <div>
              {props.description.map((item) => (
                <DescriptionCardItem key={item.id} info={item} />
              ))}
            </div>
          </ModalDescrWrap>
        )}

        <div>
          <ModalTextarea
            value={descriptionVal}
            placeholder="Input description"
            onChange={(e) => setDescriptionVal(e.target.value)}
          ></ModalTextarea>
          <button onClick={addNewDescr}>Add</button>
        </div>
      </ModalWrapper>
    </Modal>
  );
}

const mapStateToProps = (state, ownProps) => {
  if (isEmpty(ownProps.cardInfo)) {
    return {};
  }
  const { id } = ownProps.cardInfo;
  const descriptions = state.boardCardsDescriptions.descriptions.filter(
    (item) => item.cardId === id
  );
  return {
    cardId: id,
    description: descriptions.length > 0 ? descriptions : null,
  };
};
export default connect(mapStateToProps)(BoardCardModal);
