import React from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import { groupBy, forIn } from 'lodash';

const TableView = props => {
  const allDataPoints = [];
  const tableDataPoints = [];

  const columns = [
    {
      Header: 'Date',
      accessor: 'date',
    },
  ];

  props.testData.forEach((item, index) => {
    if (item.visible) {
      // unique key object name
      const id = `name${index}`;
      const value = `value${index}`;

      // add columns for each test
      columns.push({
        Header: item.name,
        accessor: value,
      });

      // populate array with only data points
      item.data.forEach(dataPoint => {
        allDataPoints.push({
          [id]: item.name,
          date: moment(dataPoint.x).format('MMM DD, h:mm:ss a'),
          [value]: dataPoint.y.toFixed(2),
        });
      });
    }
  });

  forIn(
    // group data points in arrays by date
    groupBy(allDataPoints, arr => arr.date),
    value => {
      const dataRow = value.reduce((acc, curr) => {
        // group all items in the array into one object
        return {
          ...acc,
          ...curr,
        };
      });
      tableDataPoints.push(dataRow);
    },
  );

  return (
    <ReactTable
      data={tableDataPoints}
      showPageSizeOptions
      columns={columns}
      className="-striped mb-5 w-100"
      getTableProps={() => ({ role: 'table' })}
      showPaginationTop
      defaultPageSize={10}
    />
  );
};

export default TableView;
