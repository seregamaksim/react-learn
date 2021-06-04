import styled from 'styled-components';
import folder from '../img/icons/folder.svg';

const EmptyWrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;
const EmptyImg = styled.img`
  width: 200px;
`;

export default function EmptyUsersList() {
  return (
    <EmptyWrapper>
      <EmptyImg src={folder} alt="Empty users list" />
    </EmptyWrapper>
  );
}
