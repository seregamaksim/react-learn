// import { useState, useEffect } from 'react';
// import axios from 'axios';
import styled from 'styled-components';

const Button = styled.button.attrs((props) => ({
  type: 'button',
}))`
  padding: 15px;
  font-size: 16px;
  line-height: 22px;
  color: #fff;
  border: none;
  border-radius: 5px;
  background-color: steelblue;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default function TabsButton(props) {
  return (
    <Button className={props.className} onClick={props.clickHandler}>
      {props.text}
    </Button>
  );
}
