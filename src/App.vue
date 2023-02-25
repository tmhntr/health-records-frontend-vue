<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
</script>

<template>
    <i-layout>
        <i-layout-header>
            <AppHeader />
        </i-layout-header>
        <i-layout-content>
            <Suspense>
                <router-view></router-view>
            </Suspense>
        </i-layout-content>
        <i-layout-footer></i-layout-footer>
    </i-layout>
</template>
<style scoped lang="scss">
._text-align {
    text-align: center;
}

.layout-content {
    padding: 4rem 8rem;
}
</style>
