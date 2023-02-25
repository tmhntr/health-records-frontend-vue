<script setup lang="ts">
import { defineProps } from "vue";
// import { useRouter } from "vue-router";

defineProps<{
    card: {
        title: string;
        content: string;
        button_text: string;
        route: string;
    };
}>();

// const on_click = () => {
//   router.push(props.route);
// };
</script>
<template>
    <router-link :to="card.route">
        <i-card style="height: 100%">
            <h4 v-if="card.title">{{ card.title }}</h4>
            <p>
                {{ card.content }}
            </p>
        </i-card>
    </router-link>
</template>
