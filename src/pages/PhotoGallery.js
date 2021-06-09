import FormAddFiles from '../components/FormAddFiles';
import FilesList from '../components/FilesList';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 15px;
`;
const FormAddFilesStyled = styled(FormAddFiles)`
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export default function PhotoGallery() {
  const [files, setFiles] = useState([]);
  const [filesCount, setFilesCount] = useState(0);
  useEffect(() => {
    if (files) {
      setFilesCount(files.length);
    }
  }, [files]);

  function removeFile(id = null) {
    if (typeof id === 'number') {
      const newFiles = files.filter((item, index) => index !== id);
      setFiles(newFiles);
    }
  }
  return (
    <Wrapper>
      <FormAddFilesStyled filesCount={filesCount} onSubmit={setFiles} />
      <FilesList files={files} deleteFile={removeFile}></FilesList>
    </Wrapper>
  );
}
