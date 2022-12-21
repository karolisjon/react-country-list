import * as React from 'react';
import { Container } from '@mui/material';
import Paginate from './paginate';
import CountryTable from './country-table';
import Search from './search';
import SortNameSelect from './sort-name-select';
import SortRegionSelect from './sort-region-select';
import Navigation from './navigation';

const CountryList = () => {
  const pageSize = 12;
  
  const [countries, setCountries] = React.useState([]);
  const [sort, setSort] = React.useState('ascendingName');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [pagination, setPagination] = React.useState({
    count: 0,
    from: 0,
    to: pageSize,
  });


  const fetchAll = async ({ from, to }) => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
    const data = await response.json();

    const countriesPerPage = data.slice(from, to);

    const dataObj = {
      count: data.length,
      countries: countriesPerPage,
    };

    return dataObj;
  };

  const handleSortNameMethods = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to })
  };

  React.useEffect(() => {
    fetchAll({
      from: pagination.from,
      to: pagination.to
    }).then((response) => {
      setCountries(response.countries);
      setPagination({ ...pagination, count: response.count })
    });
  }, [pagination.from, pagination.to]);

  return (
    <Container maxWidth='md' >
      <Navigation>
        <Search setSearchTerm={setSearchTerm} />
        <SortNameSelect
          sort={sort}
          handleSortNameMethods={handleSortNameMethods}
        />
        <SortRegionSelect
          pagination={pagination}
          setPagination={setPagination}
          setCountries={setCountries}
          fetchAll={fetchAll}
        />
      </Navigation>
      <CountryTable
        countries={countries}
        searchTerm={searchTerm}
        sort={sort}
      />
      <Paginate
        pageSize={pageSize}
        pagination={pagination}
        handlePageChange={handlePageChange}
      />
    </Container >
  )
}

export default CountryList;
