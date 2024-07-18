import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBrokerInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchBrokerInput = ({ onChange, inputRef }: SearchBrokerInputProps) => {
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
      onChange={onChange}
      inputRef={inputRef}
    />
  );
};
export default SearchBrokerInput;
