<script setup lang="ts">
import { HealthRecord } from "@/types";
import { ref } from "vue";
import { healthRecordTypes } from "@/types";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{
    record?: HealthRecord;
    onSubmit: (record: HealthRecord) => Promise<HealthRecord>;
}>();

const record = ref<HealthRecord>(
    props.record || {
        id: 0,
        date: "",
        description: "",
        record_type: "medication",
    }
);

const loading = ref(false);
const submitted = ref(false);

const myOnSubmit = async () => {
    loading.value = true;
    await props.onSubmit(record.value);
    loading.value = false;
    submitted.value = true;
};

const onReset = () => {
    record.value =
        !props.record || submitted.value
            ? {
                  id: 0,
                  date: "",
                  description: "",
                  record_type: "medication",
              }
            : props.record;
    submitted.value = false;
};

const onCancel = () => {
    onReset();
    router.back();
};
</script>
<!-- A form to post a health record to the api endpoint /Users/{user_id}/Records -->
<template>
    <!-- a form with title and description inputs -->
    <i-form v-if="!submitted" @submit="myOnSubmit">
        <i-form-group>
            <i-form-label>Description</i-form-label>
            <i-input
                v-model="record.description"
                placeholder="description..."
            />
        </i-form-group>

        <i-form-group>
            <i-form-label></i-form-label>
            <i-input type="date" v-model="record.date" placeholder="date" />
        </i-form-group>

        <i-form-group>
            <i-form-label>Record Type</i-form-label>
            <i-radio-group v-model="record.record_type">
                <i-radio
                    v-for="record_type in healthRecordTypes"
                    class="_text-transform:capitalize"
                    :key="record_type"
                    :value="record_type"
                    >{{ record_type }}</i-radio
                >
            </i-radio-group>
        </i-form-group>

        <i-form-group>
            <i-button type="submit" :loading="loading"> Submit </i-button>
            <i-button type="reset" @click="onReset"> Reset </i-button>
            <i-button type="default" @click="onCancel"> Cancel </i-button>
        </i-form-group>
    </i-form>

    <i-modal v-model="submitted" size="md">
        <template #header> Success 😁 </template>
        You successfully added a record!
        <template #footer>
            <i-button type="default" @click="$router.back()">
                Continue
            </i-button>
            <i-button type="success" @click="onReset"> Add another </i-button>
        </template>
    </i-modal>
</template>

<style scoped></style>
