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

const CountryList = () => {
  const [countries, setCountries] = React.useState([]);
  const [name, setName] = React.useState('ascendingName');
  const [region, setRegion] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const sortNameMethods = {
    '': { method: (a, b) => null },
    ascendingName: { method: (a, b) => a.name.localeCompare(b.name, 'en') },
    descendingName: { method: (a, b) => b.name.localeCompare(a.name, 'en') },
  };

  // const fetchByCountryRegion = async (x) => {
  //   const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
  //   const data = await response.json();

  //   const asia = await data.filter((country) => country.region === x);
  //   setCountries(asia);
  // };

  const sortRegionMethods = {
    '': {
      method: async () => {
        const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
        const data = await response.json();

        setCountries(data);
      }
    },
    asia: { method: async () => {
      const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
      const data = await response.json();
  
      const asia = await data.filter((country) => country.region === 'Asia');
      setCountries(asia);
    } }
  };

  const handleSortName = (event) => {
    setName(event.target.value);
  };

  const handleSortRegion = (event) => {
    setRegion(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchAll = async () => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
    const data = await response.json();

    setCountries(data);
  }

  React.useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Container maxWidth='md' >

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

        <Input
          type='text'
          placeholder='Search...'
          onChange={handleSearch}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon fontSize='medium' />
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
          <Typography sx={{ mr: 1 }}>REGION</Typography>
          <Select
            variant='standard'
            value={region}
            onChange={handleSortRegion}
            sx={{ minWidth: 140, my: 2 }}
          >
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='asia'>Africa</MenuItem>
            <MenuItem value='asia'>Asia</MenuItem>
            <MenuItem value='asia'>Americas</MenuItem>
            <MenuItem value='asia'>Antarctic Ocean</MenuItem>
            <MenuItem value='asia'>Oceania</MenuItem>
            <MenuItem value='asia'>Polar</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
          '&:nth-of-type(1)': { mr: 2 }
        }}>
          <Typography sx={{ mr: 1 }}>SORT NAME</Typography>
          <Select
            variant='standard'
            value={name}
            onChange={handleSortName}
            sx={{ minWidth: 140, my: 2 }}
          >
            <MenuItem value='ascendingName'>A to Z</MenuItem>
            <MenuItem value='descendingName'>Z to A</MenuItem>
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
            {countries.filter((country) => {
              if (searchTerm === '') {
                return country;
              } else if (country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return country;
              }
            })
            // .sort(sortRegionMethods[region].method)
            .sort(sortNameMethods[name].method)
            .map(({ index, name, region, area, independent }) => (
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
    </Container >
  )
}

export default CountryList;
