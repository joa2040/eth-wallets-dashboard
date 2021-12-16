import convict from 'convict';
import * as fs from 'fs';

// Define a schema
const config = convict({
  stage: {
    doc: "The application stage.",
    format: ['d'],
    default: 'd',
    env: "NODE_ENV"
  },
  environment: {
    doc: "The application environment.",
    format: ['dev'],
    default: 'dev',
    env: "ENVIRONMENT"
  },
  profile: {
    doc: "Profile to deploy service",
    format: ["default", "joaquin"],
    default: "joaquin",
    env: "PROFILE"
  },
  endpointType: {
    doc: 'AWS endpoint type for api gateway.',
    format: String,
    default: 'EDGE',
    env: 'API_GATEWAY_ENDPOINT_TYPE'
  },
  awsRegion: {
    doc: 'AWS region for this lambda.',
    format: String,
    default: 'us-east-1',
    env: 'AWS_REGION'
  },
  etherscan: {
    network: {
      doc: 'Network used by etherscan service',
      format: String,
      default: 'kovan',
      env: 'ETHERSCAN_NETWORK'
    },
    url: {
      doc: 'Url used by etherscan service',
      format: String,
      default: 'https://api-kovan.etherscan.io/',
      env: 'ETHERSCAN_URL'
    },
    apiKey: {
      doc: 'ApiKey used by etherscan service',
      format: String,
      default: '',
      env: 'ETHERSCAN_API_KEY'
    }
  },
  auth0: {
    domain: {
      doc: 'Domain defined on auth0 dashboard for the project',
      format: String,
      default: '',
      env: 'AUTH0_DOMAIN'
    },
    clientId: {
      doc: 'Id of client defined on auth0 dashboard for the project',
      format: String,
      default: '',
      env: 'AUTH0_CLIENT_ID'
    },
  },
  database: {
    tables: {
      wallets: {
        doc: 'Dynamic wallets table name according to the environment',
        format: String,
        default: '',
        env: 'WALLETS_TABLE_NAME'
      },
      exchangeRates:  {
        doc: 'Dynamic exchange rates table name according to the environment',
        format: String,
        default: '',
        env: 'EXCHANGE_RATES_TABLE_NAME'
      },
      currencies:  {
        doc: 'Dynamic currencies table name according to the environment',
        format: String,
        default: '',
        env: 'CURRENCIES_TABLE_NAME'
      },
    }
  }
});

// Load environment dependent configuration
const stage = config.get('stage');

const envConfigJsonFile = `./env/env.${stage}.json`;

if (fs.existsSync(envConfigJsonFile)) config.loadFile(envConfigJsonFile);

config.validate({ allowed: 'warn' });

export default config;
