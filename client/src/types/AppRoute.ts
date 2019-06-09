import React from 'react';

import {ROUTER_PREFIX} from 'config';

export type AppRoute = {
  title: string,
  path: string,
  component: React.ComponentType<any>,
  subroutes?: { [route: string]: AppRoute },
};

export const createRoute =
  (
    title: string,
    path: string,
    component: React.ComponentType<any>,
    subroutes?: { [route: string]: AppRoute },
  ): AppRoute =>
    ({
      title,
      path: ROUTER_PREFIX + '/' + path,
      component,
      subroutes,
    });
