<script setup lang="ts">
import RecordForm from "@/components/RecordForm.vue";
import { ref } from "vue";
import { createRecord, updateRecord, getRecord } from "@/utils";
import { HealthRecord } from "@/types";
// props are all the attributes that are passed
// to the component when it is used

const props = defineProps<{
    id?: number;
}>();

const isNewRecord = !props.id;

const title = ref(isNewRecord ? "Add Record" : "Edit Record");

const onSubmit = isNewRecord ? createRecord : updateRecord;

let record: HealthRecord = isNewRecord
    ? {
          id: 0,
          date: "",
          description: "",
          record_type: "medication",
      }
    : await getRecord(props.id);

console.log(record);
</script>
<template>
    <!-- a form to submit a health record -->
    <div class="edit">
        <h1>{{ title }}</h1>
        <RecordForm :on-submit="onSubmit" :record="record" />
    </div>
</template>
