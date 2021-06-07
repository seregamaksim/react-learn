import styled from 'styled-components';
import FileItem from './FileItem';

const FileList = styled.ul`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;
export default function FilesList({ files }) {
  const formatedFiles = files ? Array.from(files) : null;
  return (
    <div>
      <FileList>
        {formatedFiles
          ? formatedFiles.map((item, index) => (
              <FileItem className="test" key={index} data={item} />
            ))
          : ''}
      </FileList>
    </div>
  );
}
