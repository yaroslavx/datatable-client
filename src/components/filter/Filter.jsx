import React, { useCallback } from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { FaGreaterThan, FaLessThan, FaEquals } from 'react-icons/fa';
import { setQuery, setColumn, setLogic } from '../../redux/filter/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const column = useSelector((state) => state.filter.column);
  const logic = useSelector((state) => state.filter.logic);
  const query = useSelector((state) => state.filter.query);
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const updateInput = useCallback(
    debounce((input) => {
      dispatch(setQuery({ query: input }));
    }, 0),
    []
  );

  const handleInput = (event) => {
    setValue(event.target.value);
    updateInput(event.target.value);
  };

  const handleNameColumn = () => {
    dispatch(setColumn({ column: 'name' }));
    dispatch(setLogic({ logic: 'include' }));
    dispatch(setQuery({ query: '' }));
  };

  const handleAmountColumn = () => {
    dispatch(setColumn({ column: 'amount' }));
    dispatch(setQuery({ query: '' }));
  };

  const handleDistanceColumn = () => {
    dispatch(setColumn({ column: 'distance' }));
    dispatch(setQuery({ query: '' }));
  };

  return (
    <div className='filter'>
      <input
        ref={inputRef}
        className='search'
        placeholder={column === 'name' ? 'Search...' : 'Value...'}
        value={query}
        onChange={handleInput}
      />
      <div className='option-container'>
        <div className='options-column'>
          <div
            className={column === 'name' ? 'pressed' : 'option-column'}
            onClick={handleNameColumn}
          >
            Name
          </div>
          <div
            className={column === 'amount' ? 'pressed' : 'option-column'}
            onClick={handleAmountColumn}
          >
            Amount
          </div>
          <div
            className={column === 'distance' ? 'pressed' : 'option-column'}
            onClick={handleDistanceColumn}
          >
            Distance
          </div>
        </div>
        <div className='options-logic'>
          <div
            onClick={() => dispatch(setLogic({ logic: 'include' }))}
            className={
              logic === 'include' || column === 'name'
                ? 'pressed'
                : 'option-logic'
            }
          >
            include
          </div>

          {column !== 'name' && (
            <div
              onClick={() => dispatch(setLogic({ logic: 'less' }))}
              className={logic === 'less' ? 'pressed' : 'option-logic'}
            >
              <FaLessThan />
            </div>
          )}
          {column !== 'name' && (
            <div
              onClick={() => dispatch(setLogic({ logic: 'equal' }))}
              className={logic === 'equal' ? 'pressed' : 'option-logic'}
            >
              <FaEquals />
            </div>
          )}
          {column !== 'name' && (
            <div
              onClick={() => dispatch(setLogic({ logic: 'greater' }))}
              className={logic === 'greater' ? 'pressed' : 'option-logic'}
            >
              <FaGreaterThan />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
