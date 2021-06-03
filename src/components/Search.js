import { useState } from 'react';

export default function Search() {
  const [valInput, setValInput] = useState('');

  return (
    <input placeholder="Name" onChange={(e) => console.log(e.target.value)} />
  );
}
