import * as React from 'react';
import { Box, Pagination } from '@mui/material';

const Paginate = ({ pageSize, handlePageChange, pagination }) => {

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <Pagination
        shape="rounded"
        count={Math.ceil(pagination.count / pageSize)}
        onChange={handlePageChange}
      />
    </Box>
  )
}

export default Paginate;
