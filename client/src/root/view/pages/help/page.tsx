import React from 'react';

import useStyles from './styles';
import Typography from '@material-ui/core/Typography';

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3">template</Typography>
      <p>React, Typescript application template.</p>

      <Typography variant="h4">Tech stack</Typography>
      <ul>
        <li>Typescript</li>
        <li>Nodejs</li>
      </ul>
      <Typography variant="h5">Backend</Typography>
      <ul>
        <li>Express.js - web server</li>
        <li>TypeORM - database object-relational mapping</li>
        <li>SQLite - database (ease replaceable)</li>
        <li>JSON Web Token - authorization token</li>
        <li>Winston - logger</li>
        <li>Postman - API development environment</li>
      </ul>
      <Typography variant="h5">Frontend</Typography>
      <ul>
        <li>React - library for building UI</li>
        <li>CRA - create react application scripts</li>
        <li>Redux - state container</li>
        <li>Redux Saga - side effects for Redux</li>
        <li>Typesafe-Actions - typesafe utilities for Redux actions</li>
        <li>Reselect - selector library for Redux</li>
        <li>Material-UI - Material Design react components</li>
        <li>Loglevel - logger</li>
        <li>Axios - HTTP client</li>
        <li>Storybook - tool for developing UI components in isolation</li>
      </ul>
    </>
  );
};

export default Page;
