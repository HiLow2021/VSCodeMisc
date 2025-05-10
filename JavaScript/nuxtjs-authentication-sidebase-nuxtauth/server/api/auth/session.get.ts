import { verify } from 'jsonwebtoken';

const tokenType = 'Bearer';
const secretOrPrivateKey = 'dummy';

export default defineEventHandler((event) => {
    const authHeaderValue = getRequestHeader(event, 'authorization');
    if (typeof authHeaderValue === 'undefined') {
        throw createError({
            statusCode: 403,
            statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint'
        });
    }

    const extractedToken = extractToken(authHeaderValue);

    try {
        return verify(extractedToken, secretOrPrivateKey);
    } catch (error) {
        console.error("Login failed. Here's the raw error:", error);
        throw createError({
            statusCode: 403,
            statusMessage: 'You must be logged in to use this endpoint'
        });
    }
});

function extractToken(authHeaderValue: string) {
    const [, token] = authHeaderValue.split(tokenType);

    return token.trim();
}
