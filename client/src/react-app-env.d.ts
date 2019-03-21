/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ReactEnv extends ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_VERSION: string;
    REACT_APP_API_URL: string;
    REACT_APP_API_REQUEST_TIMEOUT: number;
    REACT_APP_ROUTER_PREFIX: string;
  }

  interface Process {
    env: ReactEnv;
  }
}
