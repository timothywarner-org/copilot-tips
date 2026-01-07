/**
 * Rate limiting middleware
 * Protects the API from abuse by limiting requests per IP address
 * Uses express-rate-limit with configurable limits
 */
import rateLimit from 'express-rate-limit';

/**
 * Create rate limiter with configuration from environment variables
 * Default: 100 requests per 15 minutes
 */
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: {
      message: 'Too many requests. Please try again in 15 minutes.',
      status: 429
    }
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: true, // Enable the `X-RateLimit-*` headers for backwards compatibility
});

export default limiter;
