<script setup>
defineProps({
    activities: Array,
});

import ActivityItem from "./ActivityItem.vue";

const emit = defineEmits(["update"]);

function passUpdate() {
    emit("update");
}
</script>

<template>
    <table class="ActivitiesTable">
        <thead>
            <tr>
                <th>Done</th>
                <th>Content</th>
                <th>Time Created</th>
                <th>Option</th>
            </tr>
        </thead>
        <tr v-for="activity in activities">
            <ActivityItem :activity="activity" @update="passUpdate" />
        </tr>
    </table>
</template>

<style scoped>
.ActivitiesTable {
    width: 100%;
}
</style>
