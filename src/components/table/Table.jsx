import { useEffect } from 'react';
import { useMemo, useState } from 'react';
import Pagination from '../../hooks/pagination/Pagination';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  Asc,
  AscLetters,
  AscNums,
  Desc,
  DescLetters,
  DescNums,
} from './sortingBtnsForColumns';

let PageSize = 10;

const Table = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  //Расчеё среза данных для показана на странице
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (data.length < PageSize) {
      return data.slice(0, 10);
    }
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  //При изменении фильтрации, устанавливается первая страница
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th className='th'>
              Name{' '}
              <span>
                <AscLetters sortProperty='name' option={true} />
              </span>{' '}
              <span>
                <DescLetters sortProperty='name' option={false} />
              </span>
            </th>
            <th>
              Amount{' '}
              <span>
                <AscNums sortProperty='amount' option={true} />
              </span>{' '}
              <span>
                <DescNums sortProperty='amount' option={false} />
              </span>
            </th>
            <th>
              Distance{' '}
              <span>
                <AscNums sortProperty='distance' option={true} />
              </span>{' '}
              <span>
                <DescNums sortProperty='distance' option={false} />
              </span>
            </th>
          </tr>
          {currentTableData.map((item) => (
            <tr key={item.id}>
              <td>{item.createdAt.slice(0, 16)}</td>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.distance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Table;
