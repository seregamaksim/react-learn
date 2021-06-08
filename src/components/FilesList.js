import styled from 'styled-components';
import FileItem from './FileItem';

const FileList = styled.ul`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;
export default function FilesList({ files, deleteFile }) {
  // const formatedFiles = files ? Array.from(files) : null;
  return (
    <div>
      <FileList>
        {files
          ? files.map((item, index) => (
              <FileItem
                className="test"
                index={index}
                key={index}
                data={item}
                files={files}
                onDelete={deleteFile}
              />
            ))
          : ''}
      </FileList>
    </div>
  );
}
