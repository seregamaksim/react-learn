import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { filterUsers } from '../app/reducers/Users';

const SearchWrapper = styled.div`
  display: flex;
`;
const SearchInput = styled.input`
  padding: 5px;
  font-size: 14px;
  line-height: 1.2;
  margin-right: 5px;
  flex-grow: 1;
`;
const SearchTypeSelect = styled.select`
  font-size: 14px;
  line-height: 1.2;
  padding: 5px;
`;
export default function Search() {
  const [valInput, setValInput] = useState('');
  const [valSelect, setValSelect] = useState('name');
  const dispatch = useDispatch();

  return (
    <SearchWrapper>
      <SearchInput
        placeholder={`Search by ${valSelect}`}
        type="text"
        onChange={(e) => {
          dispatch(filterUsers({ value: e.target.value, type: valSelect }));
          setValInput(e.target.value);
        }}
      />
      <SearchTypeSelect
        value={valSelect}
        onChange={(e) => {
          dispatch(filterUsers({ value: valInput, type: e.target.value }));
          setValSelect(e.target.value);
        }}
      >
        <option value="name">Name</option>
        <option value="company">Company</option>
        <option value="city">City</option>
      </SearchTypeSelect>
    </SearchWrapper>
  );
}
