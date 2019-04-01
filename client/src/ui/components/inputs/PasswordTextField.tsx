import React, {useState} from 'react';

import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

type PasswordTextFieldProps = TextFieldProps & {
  password: string,
  initShowPassword?: boolean,
  onPasswordChange: (password: string) => void
}

const PasswordTextField: React.FC<PasswordTextFieldProps> = ({password, initShowPassword = false, onPasswordChange, ...other}) => {
  const [showPassword, setShowPassword] = useState(initShowPassword);
  return (
    <TextField
      label="Password"
      type={showPassword ? 'text' : 'password'}
      autoComplete="password"
      value={password}
      onChange={(event) => onPasswordChange(event.currentTarget.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
};

export default PasswordTextField;
