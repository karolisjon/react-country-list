import * as React from 'react';
import {
  Box,
  Button,
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

const CountryList = () => {
  const [countries, setCountries] = React.useState([]);
  const [sort, setSort] = React.useState('ascendingName');
  const [region, setRegion] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [countriesPerPage] = React.useState(10);
  const inputRef = React.useRef(null);

  const fetchAll = async () => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
    const data = await response.json();

    setCountries(data);
  };

  const fetchByRegion = async (value) => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
    const data = await response.json();

    const region = data.filter((country) => country.region === value);

    setCountries(region);
  };

  const sortNameMethods = {
    '': { method: (a, b) => null },
    ascendingName: { method: (a, b) => a.name.localeCompare(b.name, 'en') },
    descendingName: { method: (a, b) => b.name.localeCompare(a.name, 'en') },
  };

  const handleSortNameMethods = (event) => {
    setSort(event.target.value);
  };

  const handleFilterRegion = (event) => {
    event.target.value === 'All' ? fetchAll() : fetchByRegion(event.target.value);
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

  React.useEffect(() => {
    fetchAll();
  }, []);

  React.useEffect(() => {
    inputRef.current = inputValue;
  }, [inputValue]);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const nPages = Math.ceil(countries.length / countriesPerPage);

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

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead sx={{ backgroundColor: '#000' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell align='right' sx={{ color: '#fff' }}>Region</TableCell>
              <TableCell align='right' sx={{ color: '#fff' }}>Area</TableCell>
              <TableCell align='right' sx={{ color: '#fff' }}>Independent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCountries.filter((country) => {
              if (searchTerm === '') {
                return country;
              } else if (country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return country;
              }
            })
              .sort(sortNameMethods[sort].method)
              .map(({ name, region, area, independent }, index) => (
                <TableRow
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                      backgroundColor: 'rgb(216 210 251)'
                    },
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'rgb(241 239 253)',
                      '&:hover': {
                        backgroundColor: 'rgb(216 210 251)'
                      },
                    },
                  }}
                  key={index}
                >
                  <TableCell>{name}</TableCell>
                  <TableCell align='right'>{region}</TableCell>
                  <TableCell align='right'>{area}</TableCell>
                  <TableCell align='right'>{independent.toString()}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer >

      <Paginate
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container >
  )
}

export default CountryList;
