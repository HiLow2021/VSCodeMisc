<script setup lang="ts">
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/private'
    }
});

const { signIn } = useAuth();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleSubmit = async (email: string, password: string) => {
    try {
        await signIn({ email, password }, { external: true, callbackUrl: 'private' });
    } catch (err) {
        console.log(err);
        errorMessage.value = 'Login Failed';
    }
};
</script>

<template>
    <div class="flex h-screen w-full flex-col items-center justify-center">
        <h1 class="mb-12 flex w-full justify-center p-4 text-3xl">Sign In</h1>
        <form class="flex flex-col" @submit.prevent="handleSubmit(email, password)">
            <div class="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <input class="h-8 w-72 bg-neutral-300 p-2" v-model="email" id="email" type="text" />
            </div>
            <div class="mt-4 flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input class="h-8 w-72 bg-neutral-300 p-2" v-model="password" id="password" type="password" />
            </div>
            <button class="mt-8 h-12 rounded-md bg-green-500 hover:bg-green-400" type="submit">SIGN IN</button>
            <div class="mt-2 flex justify-center text-red-500">{{ errorMessage != undefined ? errorMessage : '' }}</div>
        </form>
    </div>
</template>
