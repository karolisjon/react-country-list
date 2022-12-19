import * as React from 'react';
import { Box, Button } from '@mui/material';

const Paginate = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  return (
    <Box>
      {pageNumbers.map((pageNumber) => (
        <Button
        key={pageNumber}
        onClick={() => {
          setCurrentPage(pageNumber);
          console.log('pageNumber', pageNumber);
        }}
        >
          {pageNumber}
        </Button>
      ))}
    </Box>
  )
}

export default Paginate;
