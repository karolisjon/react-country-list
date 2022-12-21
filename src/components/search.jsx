import * as React from 'react';
import { Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const Search = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setSearchTerm('');
    setInputValue('');
  };

  React.useEffect(() => {
    inputRef.current = inputValue;
  }, [inputValue]);

  return (
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
  )
}

export default Search;
