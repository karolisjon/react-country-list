import * as React from 'react';
import { Box, Container } from '@mui/material'

const CountryList = () => {
  const [country, setCountry] = React.useState([]);

const fetchAll = async () => {
  const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
  const data = await response.json();

  console.table(data);
  setCountry(data);
}

React.useEffect(() => {
  fetchAll();
}, []);

  return (
    <Container maxWidth='lg'>
      <Box>
        <pre>{JSON.stringify(country, null, 4)}</pre>
      </Box>
    </Container >
  )
}

export default CountryList;
