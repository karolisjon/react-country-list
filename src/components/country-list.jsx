import * as React from 'react';
import {
  Box,
  Container,
  FormControl,
  Input,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Paginate from './paginate';
import CountryTable from './country-table';

const pageSize = 12;

const CountryList = () => {
  const [countries, setCountries] = React.useState([]);
  const [sort, setSort] = React.useState('ascendingName');
  const [region, setRegion] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [pagination, setPagination] = React.useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const inputRef = React.useRef(null);

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

  // const sortNameMethods = {
  //   '': { method: (a, b) => null },
  //   ascendingName: { method: (a, b) => a.name.localeCompare(b.name, 'en') },
  //   descendingName: { method: (a, b) => b.name.localeCompare(a.name, 'en') },
  // };

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setSearchTerm('');
    setInputValue('');
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

  React.useEffect(() => {
    inputRef.current = inputValue;
  }, [inputValue]);

  return (
    <Container maxWidth='md' >

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

        <Input
          placeholder='Search...'
          value={inputValue}
          ref={inputRef}
          onChange={handleSearch}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon fontSize='medium' />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment
              type='submit'
              position="end"
              onClick={handleClearInput}
              sx={{ cursor: 'pointer' }}
            >
              <ClearIcon fontSize='medium' />
            </InputAdornment>
          }
          sx={{
            border: '1px solid rgba(0, 0, 0, 0.42)',
            borderRadius: '4px',
            'inputProps': {
              backgroundColor: 'red',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: 'none'
            },
            '&:after': {
              borderBottom: 'none'
            },
            '&:before': {
              borderBottom: 'none'
            }
          }}
        />

        <FormControl sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          '&:nth-of-type(1)': { mr: 2 }
        }}>
          <Typography sx={{ mr: 1 }}>SORT NAME</Typography>
          <Select
            variant='standard'
            value={sort}
            onChange={handleSortNameMethods}
            sx={{ minWidth: 140, my: 2 }}
          >
            <MenuItem value='ascendingName'>A to Z</MenuItem>
            <MenuItem value='descendingName'>Z to A</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          '&:nth-of-type(1)': { mr: 2 }
        }}>
          <Typography sx={{ mr: 1 }}>FILTER REGION</Typography>
          <Select
            variant='standard'
            value={region}
            onChange={handleFilterRegion}
            sx={{ minWidth: 140, my: 2 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Antarctic">Antarctic</MenuItem>
            <MenuItem value="Antarctic Ocean">Antarctic Ocean</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
            <MenuItem value="Polar">Polar</MenuItem>
          </Select>
        </FormControl>

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
