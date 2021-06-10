import { useEffect, useRef, useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import styled from 'styled-components';

const AddFilesBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  border: 1px solid lightskyblue;
  border-style: ${(props) => (props.drag ? 'dashed' : '')};
  border-radius: 10px;
  position: relative;
  cursor: pointer;
`;

const StyledFileInput = styled.input`
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
`;
const AddFilesButton = styled.button`
  background-color: lightblue;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
`;

const CountBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CountFiles = styled.p`
  /* margin-bottom: 10px; */
`;
const AddFilesBlockOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 222;
`;

function changeInputFile(onSubmit, filesList) {
  const files = Array.from(filesList);
  console.log('files', files);
  onSubmit(files);
}
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}
export default function FormAddFiles(props) {
  const inputFileRef = useRef(null);
  const dropElem = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});

  useEffect(() => {
    let dropDiv = dropElem.current;
    dropDiv.addEventListener('dragenter', handleDragIn);
    dropDiv.addEventListener('dragleave', handleDragOut);
    dropDiv.addEventListener('dragover', handleDrag);
    dropDiv.addEventListener('drop', handleDrop);

    return () => {
      dropDiv.removeEventListener('dragenter', handleDragIn);
      dropDiv.removeEventListener('dragleave', handleDragOut);
      dropDiv.removeEventListener('dragover', handleDrag);
      dropDiv.removeEventListener('drop', handleDrop);
    };
  }, [dropElem]);

  function handleDrag(e) {
    preventDefaults(e);
  }
  function handleDragIn(e) {
    preventDefaults(e);
    setDragCounter((prevDragCounter) => prevDragCounter++);
    setIsDrag(true);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setDragging(true);
    }
  }
  function handleDragOut(e) {
    preventDefaults(e);
    setDragCounter((prevDragCounter) => prevDragCounter--);
    setIsDrag(false);
    if (dragCounter > 0) return;
    setDragging(false);
  }
  function handleDrop(e) {
    preventDefaults(e);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      changeInputFile(props.onSubmit, e.dataTransfer.files);
      e.dataTransfer.clearData();
      setIsDrag(false);
      setDragCounter(0);
    }
  }
  function triggerInput() {
    inputFileRef.current.click();
  }
  function clickFilesBlock() {
    if (props.filesCount > 0) {
      return false;
    }
    triggerInput();
  }
  // async function submitForm() {
  //   let uploadValues = props.files;
  //   let formData = new FormData();
  //   formData.append('files', uploadValues);
  //   let resp = await fetch('http://localhost:3000/gallery', {
  //     method: 'post',
  //     // body: formData,
  //     body: uploadValues,
  //   });
  //   let respJson = await resp.json();
  //   console.log('respJson', respJson);
  // }
  return (
    <AddFilesBlock
      onClick={clickFilesBlock}
      drag={isDrag}
      ref={dropElem}
      className={props.className}
    >
      {isDrag && <AddFilesBlockOverlay />}
      <Form
        onSubmit={() => console.log('submit')}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <label>
              <Field name="files">
                {({ input: { value, onChange, ...input } }) => (
                  <StyledFileInput
                    {...input}
                    type="file"
                    multiple
                    onChange={({ target }) => {
                      setUploadedFiles(target.files);
                      changeInputFile(props.onSubmit, target.files);
                      onChange(target.files);
                    }}
                    ref={inputFileRef}
                  />
                )}
              </Field>
            </label>
            {/* {props.filesCount > 0 && <button type="submit">Send</button>} */}
          </form>
        )}
      />
      <CountBtnWrap>
        {props.filesCount > 0 && (
          <CountFiles>Files added {props.filesCount}</CountFiles>
        )}
        {!props.filesCount && <p>Drop files here or click to upload</p>}
      </CountBtnWrap>
    </AddFilesBlock>
  );
}
