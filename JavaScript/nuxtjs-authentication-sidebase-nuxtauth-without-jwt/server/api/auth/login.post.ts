const correctEmail = 'admin@test.com';
const correctPassword = 'password';

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);

    const isMatched = email === correctEmail && password === correctPassword;
    if (!isMatched) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized'
        });
    }

    return {
        token: 'token' // in production, you should use jwt token.
    };
});
