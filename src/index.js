/**
 * Entry point for the Copilot Tips API server
 * Loads environment variables and starts the Express server
 */
import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API available at http://localhost:${PORT}/api/tips`);
  console.log(`💚 Health check at http://localhost:${PORT}/health`);
});
