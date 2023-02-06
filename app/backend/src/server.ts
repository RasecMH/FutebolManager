import { App } from './index';
import 'dotenv/config';

const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);
