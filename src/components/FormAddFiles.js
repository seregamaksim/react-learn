import { useRef } from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';

const AddFilesBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  border: 1px solid lightskyblue;
  border-radius: 10px;
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
  margin-bottom: 10px;
`;

function changeInputFile(onSubmit, target) {
  // console.log('target.files', target.files);
  const files = Array.from(target.files);
  console.log('files', files);
  onSubmit(files);
}
export default function FormAddFiles(props) {
  const inputFileRef = useRef(null);

  const triggerInput = () => {
    inputFileRef.current.click();
  };

  return (
    <AddFilesBlock className={props.className}>
      <Form
        onSubmit={props.onSubmit}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <label>
              <Field name="files">
                {({ input: { value, onChange, ...input } }) => (
                  <StyledFileInput
                    {...input}
                    type="file"
                    multiple
                    onChange={({ target }) =>
                      changeInputFile(props.onSubmit, target)
                    }
                    ref={inputFileRef}
                  />
                )}
              </Field>
            </label>
          </form>
        )}
      />
      <CountBtnWrap>
        {props.filesCount > 0 ? (
          <CountFiles>Files added {props.filesCount}</CountFiles>
        ) : null}
        <AddFilesButton onClick={triggerInput}>Add files</AddFilesButton>
      </CountBtnWrap>
    </AddFilesBlock>
  );
}
