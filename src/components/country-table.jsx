import * as React from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';

const CountryTable = ({ countries, searchTerm, sort }) => {

  const sortNameMethods = {
    '': { method: (a, b) => null },
    ascendingName: { method: (a, b) => a.name.localeCompare(b.name, 'en') },
    descendingName: { method: (a, b) => b.name.localeCompare(a.name, 'en') },
  };

  return (
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
  )
}

export default CountryTable;
