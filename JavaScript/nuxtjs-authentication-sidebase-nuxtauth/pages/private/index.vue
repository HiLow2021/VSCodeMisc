<script setup lang="ts">
const { signOut } = useAuth();

const handleSubmit = async () => {
    try {
        await signOut({ external: true, callbackUrl: '' });
    } catch (err) {
        console.log(err);
    }
};
</script>

<template>
    <div class="flex h-screen w-full flex-col items-center justify-center">
        <h1 class="mb-12 flex w-full justify-center p-4 text-center text-3xl">
            Congratulations ! 🎉
            <br />
            you are in private page
        </h1>
        <form @submit.prevent="handleSubmit()">
            <button class="mt-8 flex h-12 items-center justify-center rounded-md bg-green-500 p-4 hover:bg-green-400" type="submit">
                SING OUT
            </button>
        </form>
    </div>
</template>
