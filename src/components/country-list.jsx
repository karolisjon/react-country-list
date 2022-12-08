import * as React from 'react';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const CountryList = () => {
  const [countries, setCountries] = React.useState([]);
  const [sortState, setSortState] = React.useState('none');

  const sortMethods = {
    none: { method: (a, b) => null },
    ascending: { method: (a, b) => a.name.localeCompare(b.name, 'en') },
    descending: { method: (a, b) => b.name.localeCompare(a.name, 'en') }
  }

  const fetchAll = async () => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
    const data = await response.json();

    setCountries(data);
  }

  React.useEffect(() => {
    fetchAll();
  }, [countries]);

  return (
    <Container maxWidth='md'>
      <Button
        variant='primary'
        value='ascending'
        onClick={(e) => { setSortState(e.target.value) }}
      >
        Ascending
      </Button>

      <Button
        variant='primary'
        value='descending'
        onClick={(e) => { setSortState(e.target.value) }}
      >
        Descending
      </Button>

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
            {countries.sort(sortMethods[sortState].method).map(({ index, name, region, area, independent }) => (
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
