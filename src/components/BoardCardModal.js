import { useState } from 'react';
import styled from 'styled-components';
import isEmpty from '../helpers/isEmpty';

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
  background-color: #cecece;
`;
const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default function BoardCardModal(props) {
  const [descriptionVal, setDescriptionVal] = useState('');
  const cardInfo = props.cardInfo;

  return isEmpty(cardInfo) ? null : (
    <Modal isOpen={props.isOpen}>
      <ModalWrapper>
        <ModalHead>
          <h3>{cardInfo.text}</h3>
          <button onClick={() => props.closeModal(false)}>X</button>
        </ModalHead>
        <hr />
        <p>Description:</p>
        <p>{descriptionVal}</p>
        <div>
          <input
            type="text"
            value={descriptionVal}
            placeholder="Input description"
            onChange={(e) => setDescriptionVal(e.target.value)}
          />
          <button>Add</button>
        </div>
      </ModalWrapper>
    </Modal>
  );
}
