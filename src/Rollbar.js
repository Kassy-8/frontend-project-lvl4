import Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: '90cd99e1620d4d088f9921fe33520b6e',
  nvironment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const rollbar = new Rollbar(rollbarConfig);

export default rollbar;
