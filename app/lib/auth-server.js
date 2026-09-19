import crypto from 'crypto';

// const SECRET_KEY = process.env.NEXTAUTH_SECRET || process.env.ADMIN_PASSWORD || 'pranavwrites-secret-fallback-key-2026';
const SECRET_KEY = process.env.NEXTAUTH_SECRET;

if (!SECRET_KEY) {
  throw new Error('NEXTAUTH_SECRET environment variable is not configured');
}
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Creates a signed HMAC-SHA256 token
 * @param {string} username
 * @returns {string} Signed token in format: payloadBase64.signature
 */
export function createAdminToken(username) {
  const payload = {
    username,
    role: 'admin',
    exp: Date.now() + TOKEN_EXPIRY_MS,
  };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadBase64)
    .digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies HMAC-SHA256 signed token
 * @param {string} token
 * @returns {{ valid: boolean, user?: object, error?: string }}
 */
export function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token missing' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'Invalid token structure' };
  }

  const [payloadBase64, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadBase64)
    .digest('base64url');

  // Constant-time buffer comparison to prevent timing attacks
  const signatureBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);

  if (
    signatureBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(signatureBuf, expectedBuf)
  ) {
    return { valid: false, error: 'Invalid token signature' };
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return { valid: false, error: 'Token expired' };
    }
    if (payload.role !== 'admin') {
      return { valid: false, error: 'Unauthorized role' };
    }
    return { valid: true, user: payload };
  } catch {
    return { valid: false, error: 'Malformed token payload' };
  }
}

/**
 * Helper to authenticate an incoming Next.js API Request
 * @param {Request} request
 * @returns {{ authorized: boolean, user?: object, error?: string }}
 */
export function verifyAdminRequest(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return { authorized: false, error: 'Authorization header missing' };
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return { authorized: false, error: 'Invalid authorization format. Expected "Bearer <token>"' };
  }

  const result = verifyAdminToken(token);
  if (!result.valid) {
    return { authorized: false, error: result.error };
  }

  return { authorized: true, user: result.user };
}
