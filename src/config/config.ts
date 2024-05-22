export default () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MAX_COMPLEXITY: parseInt(process.env.MAX_COMPLEXITY || '150', 10),
  JWT_SECRET_KEY: process.env?.JWT_SECRET_KEY || null,
  JWT_EXPIRATION_TIME: parseInt(process.env?.JWT_EXPIRATION_TIME || '600', 10),
  HTTP_TIMEOUT: parseInt(process.env?.HTTP_TIMEOUT || '10000', 10),
});
