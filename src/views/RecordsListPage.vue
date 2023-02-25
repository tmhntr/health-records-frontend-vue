<script setup lang="ts">
import RecordListItem from "@/components/RecordListItem.vue";
import { HealthRecord } from "@/types";
import { deleteRecord, getRecordCount, getRecords } from "@/utils";
import { onMounted, ref } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

const total = ref(await getRecordCount());

const page = ref(1);
const limit = ref(10);
const sortBy = ref("date");
const sortOrder = ref("desc");
const filter = ref("");

const limitOptions = ref([10, 20, 50, 100]);
const sortByOptions = ref(["date", "description", "record_type"]);
const sortOrderOptions = ref(["asc", "desc"]);

const records = ref<HealthRecord[]>([]);

async function myGetRecords(page_value = 1) {
    page.value = page_value;
    records.value = await getRecords(
        limit.value,
        (page.value - 1) * limit.value,
        sortBy.value,
        sortOrder.value,
        filter.value
    );
    console.log(records.value);
}
onMounted(myGetRecords);

const onView = (id: number) => {
    console.log(id);

    router.push(`/records/${id}`);
};

const onDelete = async (id: number) => {
    console.log(id);
    await deleteRecord(id);
    await myGetRecords();
};

const onEdit = (id: number) => {
    console.log();
    router.push(`/edit/${id}`);
};
</script>

<template>
    <div class="view-records">
        <h1>View Records</h1>
        <i-container>
            <i-row>
                <i-column sm="4">
                    <b>Date</b>
                </i-column>
                <i-column sm="4">
                    <b>Description</b>
                </i-column>
                <i-column sm="4">
                    <b>Record Type</b>
                </i-column>
            </i-row>
            <i-row v-for="record in records" :key="record.id">
                <i-column>
                    <RecordListItem
                        :record="record"
                        @delete="onDelete"
                        @edit="onEdit"
                        @view="onView"
                    />
                </i-column>
            </i-row>
        </i-container>
        <i-pagination
            v-model="page"
            :items-total="total"
            :items-per-page="limit"
            @update:modelValue="myGetRecords"
        />
    </div>
</template>

<style scoped></style>
