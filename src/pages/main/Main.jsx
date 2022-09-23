import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CgOptions } from 'react-icons/cg';
import Table from '../../components/table/Table';
import Filter from '../../components/filter/Filter';

const Main = () => {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState(false);
  const optionRef = useRef();
  const query = useSelector((state) => state.filter.query);
  const column = useSelector((state) => state.filter.column);
  const logic = useSelector((state) => state.filter.logic);

  const sortOption = useSelector((state) => state.filter.sort);

  // Логика для закрывания модального окна с настройками фильтрации
  useEffect(() => {
    const handleClickOutside = (event) => {
      const _event = event;
      if (optionRef.current && !_event.path.includes(optionRef.current)) {
        setPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const handleOptions = () => {
    setPopup((prev) => !prev);
  };

  //Запрос массива данных с динамическими параметрами через сервер
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000?q=${query}&c=${column}&l=${logic}`
      );

      // Сортировка данных, немного нечитаемо правда
      // Для слов используется localeCompare
      // Для чисел обычное стравнение
      sortOption
        ? setData(
            res.data.sort((a, b) =>
              sortOption.option
                ? sortOption.sortProperty === 'name'
                  ? a[sortOption.sortProperty].localeCompare(
                      b[sortOption.sortProperty]
                    )
                  : a[sortOption.sortProperty] - b[sortOption.sortProperty]
                : sortOption.sortProperty === 'name'
                ? b[sortOption.sortProperty].localeCompare(
                    a[sortOption.sortProperty]
                  )
                : b[sortOption.sortProperty] - a[sortOption.sortProperty]
            )
          )
        : setData(res.data);
    };
    if (query.length === 0 || query.length > 0) fetchData();
  }, [query, column, logic, sortOption]);

  return (
    <div className='app'>
      <div ref={optionRef} className='filter-container'>
        <div className='option' onClick={() => handleOptions()}>
          <CgOptions className='option-btn' />
        </div>
        {popup && <Filter />}
      </div>
      {data.length > 0 && <Table data={data} />}
    </div>
  );
};

export default Main;
