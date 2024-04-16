const tokenType = 'Bearer';
const correctToken = 'token';

export default defineEventHandler((event) => {
    const authHeaderValue = getRequestHeader(event, 'authorization');
    if (typeof authHeaderValue === 'undefined') {
        throw createError({
            statusCode: 403,
            statusMessage: 'Need to pass valid Bearer-authorization header to access this endpoint'
        });
    }

    const extractedToken = extractToken(authHeaderValue);
    const isAuthenticated = verifyToken(extractedToken);
    if (!isAuthenticated) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Login failed. You must be logged in to use api/auth/login'
        });
    }

    return { message: 'Get session successfully' };
});

function extractToken(authHeaderValue: string) {
    const [, token] = authHeaderValue.split(tokenType);

    return token.trim();
}

function verifyToken(token: string) {
    return token === correctToken;
}
