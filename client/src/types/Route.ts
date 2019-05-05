import React from 'react';

import {ROUTER_PREFIX} from 'src/config';

export type Route = {
  title: string,
  path: string,
  component: React.ComponentType<any>,
};

export const createRoute =
  (
    title: string,
    path: string,
    component: React.ComponentType<any>,
  ): Route =>
    ({
      title,
      path: ROUTER_PREFIX + '/' + path,
      component,
    });
