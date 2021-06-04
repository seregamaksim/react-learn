import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortUsersBy } from '../app/reducers/Users';

export default function SortPanel() {
  const [isReverse, setIsReverse] = useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Sort by:</h3>
      <button
        onClick={() => {
          setIsReverse(!isReverse);
          dispatch(sortUsersBy({ isReverse }));
        }}
      >
        {isReverse
          ? `Name ${String.fromCharCode('9650')}`
          : `Name ${String.fromCharCode('9660')}`}
      </button>
    </div>
  );
}
