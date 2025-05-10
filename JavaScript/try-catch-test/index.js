console.log('Promise.all');
await Promise.allSettled(
    [1, 2, 3, 4, 5].map(async (x) => {
        try {
            if (x === 1) {
                return;
            }

            const randomNum = Math.floor(Math.random() * 5) + 1;
            await new Promise((resolve) => setTimeout(resolve, randomNum * 1000));

            if (x === 3) {
                throw new Error('error');
            }

            console.log('try', x);
        } finally {
            console.log('finally', x);
        }
    })
);

console.log('for of');
for (const x of [1, 2, 3, 4, 5]) {
    try {
        if (x === 1) {
            continue;
        }

        const randomNum = Math.floor(Math.random() * 5) + 1;
        await new Promise((resolve) => setTimeout(resolve, randomNum * 1000));

        if (x === 3) {
            throw new Error('error');
        }

        console.log('try', x);
    } finally {
        console.log('finally', x);
    }
}
