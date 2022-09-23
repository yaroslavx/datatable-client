import { setSort } from '../../redux/filter/filterSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortNumericDown,
  FaSortNumericDownAlt,
} from 'react-icons/fa';

// Компонент сортировки по возрастанию для слов
export const AscLetters = ({ sortProperty, option }) => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  return (
    <FaSortAlphaDown
      onClick={() => {
        sort?.sortProperty === sortProperty && sort?.option === option
          ? dispatch(setSort({ sortProperty: '', option: true }))
          : dispatch(setSort({ sortProperty: sortProperty, option: option }));
      }}
      className={
        sort?.sortProperty === sortProperty && sort?.option === option
          ? 'sort-opt-pressed'
          : 'sorting-option'
      }
    />
  );
};

// Компонент сортировки по убыванию для слов
export const DescLetters = ({ sortProperty, option }) => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  return (
    <FaSortAlphaDownAlt
      onClick={() => {
        sort?.sortProperty === sortProperty && sort?.option === option
          ? dispatch(setSort({ sortProperty: '', option: true }))
          : dispatch(setSort({ sortProperty: sortProperty, option: option }));
      }}
      className={
        sort?.sortProperty === sortProperty && sort?.option === option
          ? 'sort-opt-pressed'
          : 'sorting-option'
      }
    />
  );
};

// Компонент сортировки по возрастанию для чисел
export const AscNums = ({ sortProperty, option }) => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  return (
    <FaSortNumericDown
      onClick={() => {
        sort?.sortProperty === sortProperty && sort?.option === option
          ? dispatch(setSort({ sortProperty: '', option: true }))
          : dispatch(setSort({ sortProperty: sortProperty, option: option }));
      }}
      className={
        sort?.sortProperty === sortProperty && sort?.option === option
          ? 'sort-opt-pressed'
          : 'sorting-option'
      }
    />
  );
};

// Компонент сортировки по убыванию для чисел
export const DescNums = ({ sortProperty, option }) => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  return (
    <FaSortNumericDownAlt
      onClick={() => {
        sort?.sortProperty === sortProperty && sort?.option === option
          ? dispatch(setSort({ sortProperty: '', option: true }))
          : dispatch(setSort({ sortProperty: sortProperty, option: option }));
      }}
      className={
        sort?.sortProperty === sortProperty && sort?.option === option
          ? 'sort-opt-pressed'
          : 'sorting-option'
      }
    />
  );
};
