import filesize from 'filesize';
import styled from 'styled-components';
import getFileExtention from '../helpers/getFileExtention';
import documentIcon from '../img/icons/document.svg';

const ItemInfoWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transform: translateY(100%);
  transition: all 0.3s ease;
  color: #fff;
`;
const ItemDeleteBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  padding: 10px;
  opacity: 0;
  z-index: 2;
  transition: all 0.3s ease;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
const Item = styled.li`
  overflow: hidden;
  &:hover {
    ${ItemInfoWrap} {
      transform: none;
    }
    ${ItemDeleteBtn} {
      opacity: 1;
    }
  }
`;

const ItemWrapper = styled.div`
  position: relative;
`;

const ItemImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ItemImage = styled.img.attrs({
  width: 200,
  height: 200,
})`
  object-fit: cover;
`;

export default function FileItem(props) {
  const dataFile = props.data;
  const isImage = dataFile.type.includes('image');
  const image = (
    <ItemImage src={URL.createObjectURL(dataFile)} alt={dataFile.name} />
  );
  const imageDocument = <ItemImage src={documentIcon} alt={dataFile.name} />;

  return (
    <>
      <Item className={props.className}>
        <ItemWrapper>
          <ItemDeleteBtn>X</ItemDeleteBtn>

          <ItemImageWrap>{isImage ? image : imageDocument}</ItemImageWrap>
          <ItemInfoWrap>
            <p>{dataFile.name.replace(/\.[^/.]+$/, '')}</p>
            <p>{filesize(dataFile.size)}</p>
            <p>{getFileExtention(dataFile.name)}</p>
          </ItemInfoWrap>
        </ItemWrapper>
      </Item>
    </>
  );
}
