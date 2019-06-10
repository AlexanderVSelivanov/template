import React, {useMemo, useState} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {
  EmptyOr,
  isEmpty,
  isSuccessProperty,
  isFailureProperty,
  AsyncProperty,
  TokenDto,
  AccountDto,
} from 'template-common';
import {loginAction} from 'modules/account/actions';
import PasswordTextField from 'root/view/components/inputs/PasswordTextField';

import {VERSION} from 'config';

import useStyles from './styles';

type LoginPageProps = {
  defaultLogin?: EmptyOr<string>,
  token: EmptyOr<AsyncProperty<TokenDto>>,
  currentAccount: EmptyOr<AsyncProperty<AccountDto>>,

  login: typeof loginAction.request,
};

const LoginPage: React.FC<LoginPageProps> = ({defaultLogin, token, currentAccount, login}) => {
  const classes = useStyles();
  const [username, setUsername] = useState(defaultLogin ? defaultLogin : '');
  const [password, setPassword] = useState('');

  const loginSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username) {
      login({username, password});
    }
  };

  const isValid = useMemo(() => Boolean(username && password), [username, password]);

  const errorMessage = useMemo(() => {
    if (!isEmpty(token) && isFailureProperty(token)) {
      return token.error.message;
    }
    if (!isEmpty(token) && !isEmpty(currentAccount) && isSuccessProperty(token) && isFailureProperty(currentAccount)) {
      return currentAccount.error.message;
    }
    return '';
  }, [token, currentAccount]);

  return (
    <form onSubmit={loginSubmit}>
      <Grid container spacing={5} className={classes.container}>
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
            label="Username"
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
          errorMessage && <Grid item xs={12} className={classes.error}>
            <Typography className={classes.error}>{errorMessage}</Typography>
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
