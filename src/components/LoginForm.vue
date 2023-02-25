<script setup lang="ts">
import { login } from "@/utils";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { store } from "@/store";

const email = ref("email@email.com");
const password = ref("password");
const loading = ref(false);

const router = useRouter();

async function onSubmit() {
    try {
        loading.value = true;
        await login(email.value, password.value);
        loading.value = false;
        store.setAuthStatus(true);
    } catch (e) {
        loading.value = false;
        console.log(e);
    }
    console.log(store);

    router.push("/");
}
</script>

<template>
    <i-form @submit="onSubmit">
        <i-form-group>
            <i-form-label>Email</i-form-label>
            <i-input v-model="email" placeholder="email" />
        </i-form-group>

        <i-form-group>
            <i-form-label>Password</i-form-label>
            <i-input v-model="password" placeholder="password" />
        </i-form-group>

        <i-form-group>
            <i-button type="submit" :loading="loading"> Submit </i-button>
        </i-form-group>
    </i-form>
</template>
