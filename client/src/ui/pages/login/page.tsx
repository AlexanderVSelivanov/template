import React, {useState} from 'react';

import {WithStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PasswordTextField from 'src/ui/components/inputs/PasswordTextField';

import styles from './styles';

type LoginPageProps = WithStyles<typeof styles> & {
  defaultLogin?: string,
  onSubmit: (login: string, password: string) => void,
};

const LoginPage: React.FC<LoginPageProps> = ({classes, defaultLogin, onSubmit}) => {
  const [login, setLogin] = useState(defaultLogin ? defaultLogin : '');
  const [password, setPassword] = useState('');

  const loginSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (login) {
      onSubmit(login, password);
    }
  };

  return (
    <form onSubmit={loginSubmit}>
      <Grid container spacing={24} className={classes.container}>
        <Grid item xs={12} className={classes.title}>
          <Typography
            component="h1"
            variant="h4"
          >
            template
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Login"
            value={login}
            onChange={event => setLogin(event.currentTarget.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordTextField
            password={password}
            onPasswordChange={setPassword}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginPage;
