<script setup lang="ts">
import { getRecord } from "@/utils";

const props = defineProps<{
    id: number;
}>();

const record = await getRecord(props.id);
</script>

<template>
    <h1>Health Record View</h1>
    <i-container>
        <i-row>
            <i-col span="12">
                <i-card>
                    <h3>Record Type</h3>
                    <p>{{ record.record_type }}</p>
                </i-card>
            </i-col>
            <i-col span="12">
                <i-card>
                    <h3>Date</h3>
                    <p>{{ record.date }}</p>
                </i-card>
            </i-col>
        </i-row>
        <i-row>
            <i-col span="24">
                <i-card>
                    <h3>Description</h3>
                    <p>{{ record.description }}</p>
                </i-card>
            </i-col>
        </i-row>
    </i-container>
</template>
