<script setup lang="ts">
defineProps<{
    record: {
        id: number;
        date: string;
        description: string;
        record_type: string;
    };
}>();
defineEmits(["view", "delete", "edit"]);
</script>

<template>
    <i-container>
        <i-row>
            <i-column sm="2">
                {{ record.date }}
            </i-column>
            <i-column sm="4">
                {{ record.description }}
            </i-column>
            <i-column sm="2">
                {{ record.record_type }}
            </i-column>
            <i-column sm="4">
                <i-button type="primary" @click="$emit('view', record.id)">
                    View
                </i-button>
                <i-button type="danger" @click="$emit('delete', record.id)">
                    Delete
                </i-button>
                <i-button type="warning" @click="$emit('edit', record.id)">
                    Edit
                </i-button>
            </i-column>
        </i-row>
    </i-container>
</template>

<style scoped lang="scss">
i-row {
    cursor: pointer;
}
</style>
