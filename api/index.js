// Vercel serverless function entrypoint for full-stack deployment
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const app = require('../backend/src/app');

export default app;
