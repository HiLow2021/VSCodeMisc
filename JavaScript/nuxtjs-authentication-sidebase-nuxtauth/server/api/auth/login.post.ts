import { sign } from 'jsonwebtoken';

const correctEmail = 'admin@test.com';
const correctPassword = 'password';
const secretOrPrivateKey = 'dummy';

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);

    const isMatched = email === correctEmail && password === correctPassword;
    if (!isMatched) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized'
        });
    }

    const user = {
        email
    };

    const accessToken = sign(user, secretOrPrivateKey, {
        expiresIn: 60 // 60 seconds
    });

    return {
        token: accessToken
    };
});
