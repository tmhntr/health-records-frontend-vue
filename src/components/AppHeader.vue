<script setup lang="ts">
import { store } from "@/store";
import { logout } from "@/utils";
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";

const router = useRouter();
const { isAuthenticated, loginWithRedirect, logout: auth0Logout } = useAuth0();

const on_click_logo = () => {
    router.push("/");
};
</script>

<template>
    <div class="container _border-bottom">
        <div class="logo" @click="on_click_logo">
            <font-awesome-icon icon="fa-solid fa-notes-medical" size="2x" />
            <h1>MyHealth</h1>
        </div>
        <i-button
            v-if="!isAuthenticated"
            type="primary"
            @click="loginWithRedirect"
            class="_.color-blue"
        >
            Login
        </i-button>
        <i-dropdown v-else :trigger="['focus', 'click']">
            <div class="user-icon">
                <font-awesome-icon icon="fa-solid fa-user" size="1x" />
            </div>
            <template #body>
                <i-dropdown-item disabled>Profile</i-dropdown-item>
                <i-dropdown-divider />
                <i-dropdown-item @click="auth0Logout">Sign Out</i-dropdown-item>
            </template>
        </i-dropdown>
    </div>
</template>

<style scoped lang="scss">
.logo {
    padding: 0;
    margin: 0;
    // margin-left: 2rem;

    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;

    cursor: pointer;

    & > h1 {
        margin: 0;
        padding: 0;
        margin-left: 0.5rem;
    }
}

.user-icon {
    padding-inline: 0.5rem;
    // margin-block: auto;
    aspect-ratio: 1/1;

    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;

    border-radius: 50%;
    background-color: #f0f0f0;

    & > svg {
        margin: auto;
    }
}

.container {
    padding: 0 2rem;
    margin: 0;
    width: 100%;
    max-width: 100%;

    height: 4rem;
    max-height: 4rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
</style>
