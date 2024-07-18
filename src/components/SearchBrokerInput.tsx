import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBrokerInput = () => {
  return (
    <TextField
      label="Name"
      aria-label="Search Broker"
      id="broker-name-input"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default SearchBrokerInput;
