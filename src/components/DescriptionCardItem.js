import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  updateDescription,
  removeDescription,
} from '../app/reducers/BoardCardsDescription';

const ModalDescrEditBtn = styled.button`
  border: 0;
  background: none;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;
const ModalDescrTextarea = styled.textarea`
  width: 100%;
  border: 0;
  background: transparent;
  resize: none;
  &:focus {
    background-color: #fff;
    border: 1px solid #cecece;
    resize: vertical;
  }
`;
const ModalDescrItemBtns = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  pointer-events: none;
  opacity: 0;
`;
const ModalDescrItem = styled.div`
  position: relative;
  &:hover {
    ${ModalDescrItemBtns} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

export default function DescriptionCardItem(props) {
  const [descrInfo, setDescrInfo] = useState(props.info);
  const [isOpenEditDescr, setIsOpenEditDescr] = useState(false);
  const [editableDescr, setEditableDescr] = useState(descrInfo.body);
  const [oldDescrVal, setOldDescrVal] = useState(descrInfo.body);
  const dispatch = useDispatch();
  const editTextareaRef = useRef(null);
  // console.log(editTextareaRef.current.value);
  return (
    <ModalDescrItem>
      <ModalDescrItemBtns>
        <ModalDescrEditBtn
          onClick={() => {
            editTextareaRef.current.focus();
            setOldDescrVal(editTextareaRef.current.value);
            setIsOpenEditDescr(true);
          }}
        >
          ✏️
        </ModalDescrEditBtn>
        <ModalDescrEditBtn
          onClick={() => dispatch(removeDescription(descrInfo.id))}
        >
          X
        </ModalDescrEditBtn>
      </ModalDescrItemBtns>
      <ModalDescrTextarea
        value={editableDescr}
        onChange={(e) => setEditableDescr(e.target.value)}
        spellCheck="false"
        // onFocus={() => {
        //   setIsOpenEditDescr(true);
        // }}
        // onBlur={() => {
        //   setIsOpenEditDescr(false);
        // }}
        ref={editTextareaRef}
      ></ModalDescrTextarea>
      <p style={{ display: 'none' }}>{editableDescr}</p>
      {isOpenEditDescr && editableDescr !== oldDescrVal && (
        <button
          onClick={() => {
            setIsOpenEditDescr(false);
            dispatch(
              updateDescription({
                id: descrInfo.id,
                body: editableDescr,
              })
            );
          }}
        >
          Update descr
        </button>
      )}
    </ModalDescrItem>
  );
}
