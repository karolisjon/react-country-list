import * as React from 'react';
import {
  Box,
  Container,
  FormControl,
  Input,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const CountryList = () => {
  const [countries, setCountries] = React.useState([]);
  const [sortState, setSortState] = React.useState('ascendingName');
  const [searchTerm, setSearchTerm] = React.useState('');

  const sortMethods = {
    '': { method: (a, b) => null },
    ascendingName: { method: (a, b) => a.name.localeCompare(b.name, 'en') },
    descendingName: { method: (a, b) => b.name.localeCompare(a.name, 'en') },
  };

  const handleSort = (event) => {
    setSortState(event.target.value);
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
    <Container maxWidth='md'>

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
            value={sortState}
            onChange={handleSort}
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
            }).sort(sortMethods[sortState].method).map(({ index, name, region, area, independent }) => (
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
