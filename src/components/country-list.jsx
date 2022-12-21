import * as React from 'react';
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Paginate from './paginate';
import CountryTable from './country-table';
import Search from './search';
import SortNameSelect from './sort-name-select';
import SortRegionSelect from './sort-region-select';

const pageSize = 12;

const CountryList = () => {
  const [countries, setCountries] = React.useState([]);
  const [sort, setSort] = React.useState('ascendingName');
  const [region, setRegion] = React.useState('All');
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

  const fetchByRegion = async (value) => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
    const data = await response.json();

    const region = data.filter((country) => country.region === value);

    setCountries(region);
  };

  const handleSortNameMethods = (event) => {
    setSort(event.target.value);
  };

  const handleFilterRegion = (event) => {
    event.target.value === 'All' ? fetchAll({
      from: pagination.from,
      to: pagination.to
    }).then((response) => {
      setCountries(response.countries);
      setPagination({ ...pagination, count: response.count })
    })
      : fetchByRegion(event.target.value);

    setRegion(event.target.value);
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Search setSearchTerm={setSearchTerm} />
        <SortNameSelect
          sort={sort}
          handleSortNameMethods={handleSortNameMethods}
        />
        <SortRegionSelect
          region={region}
          handleFilterRegion={handleFilterRegion}
        />
      </Box>
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
