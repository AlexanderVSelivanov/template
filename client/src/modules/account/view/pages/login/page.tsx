import React, {useMemo, useState} from 'react';

import {WithStyles} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {UserEntity} from 'template-common';
import {ApplicationError} from 'template-common';
import {loginAction} from 'src/modules/account/actions';
import PasswordTextField from 'src/root/view/components/inputs/PasswordTextField';

import {VERSION} from 'src/config';

import styles from './styles';

type LoginPageProps = WithStyles<typeof styles> & {
  error: ApplicationError | null,
  defaultLogin?: string | null,

  login: typeof loginAction.request,
};

const LoginPage: React.FC<LoginPageProps> = ({classes, error, defaultLogin, login}) => {
  const [username, setUsername] = useState(defaultLogin ? defaultLogin : '');
  const [password, setPassword] = useState('');

  const loginSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username) {
      login({username, password});
    }
  };

  const isValid = useMemo(() => Boolean(username && password), [username, password]);

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
            value={username}
            onChange={event => setUsername(event.currentTarget.value)}
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
        {
          error && <Grid item xs={12} className={classes.error}>
            <Typography className={classes.error}>{error.message}</Typography>
          </Grid>
        }
        <Grid item xs={12}>
          <Button
            type="submit"
            disabled={!isValid}
            fullWidth
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          <Typography>template {VERSION}</Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginPage;
