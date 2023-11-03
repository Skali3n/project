import 'dotenv/config';
import { env } from 'process';

const config = {
  app: {
    port: env.APP_PORT || 3000,
  },
};

export default config;
