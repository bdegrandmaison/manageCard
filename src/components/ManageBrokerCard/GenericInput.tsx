import { RefObject, ChangeEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type GenericInputProps = {
  label: string;
  ariaLabel: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement>;
  value?: string;
  showSearchIcon?: boolean;
};

const GenericInput = ({
  label,
  ariaLabel,
  id,
  onChange,
  inputRef,
  value,
  showSearchIcon = false,
}: GenericInputProps) => {
  return (
    <TextField
      label={label}
      aria-label={ariaLabel}
      id={id}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      InputProps={{
        endAdornment: showSearchIcon ? (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ) : null,
      }}
      onChange={onChange}
      inputRef={inputRef}
      value={value}
    />
  );
};

export default GenericInput;
