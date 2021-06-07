import FormAddFiles from '../components/FormAddFiles';
import FilesList from '../components/FilesList';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 15px;
`;
const FormAddFilesStyled = styled(FormAddFiles)`
  margin-bottom: 20px;
`;

export default function PhotoGallery() {
  const [files, setFiles] = useState(null);
  const [filesCount, setFilesCount] = useState(0);
  useEffect(() => {
    if (files) {
      setFilesCount(files.length);
    }
  }, [files]);
  return (
    <Wrapper>
      <FormAddFilesStyled filesCount={filesCount} onSubmit={setFiles} />
      <FilesList files={files}></FilesList>
    </Wrapper>
  );
}
