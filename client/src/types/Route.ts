import React from 'react';

import {ROUTER_PREFIX} from 'config';

export type Route = {
  title: string,
  path: string,
  component: React.ComponentType<any>,
  exact: boolean,
};

export const createRoute =
  (
    title: string,
    path: string,
    component: React.ComponentType<any>,
    exact: boolean = false,
  ): Route =>
    ({
      title,
      path: ROUTER_PREFIX + '/' + path,
      component,
      exact,
    });
