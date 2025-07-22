// backend/src/server.ts
import app from './app';
import config from './config/default';

app.listen(config.port, () => {
  console.log(`🚀 Server running on http://localhost:${config.port}`);
});
