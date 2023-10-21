<script setup>
defineProps({
    activities: Array,
});

const emit = defineEmits(["update"]);

function passUpdate() {
    emit("update");
}

import ActivityItem from "./ActivityItem.vue";
</script>

<template>
    <div class="ActivityList">
        <ul v-for="activity in activities">
            <ActivityItem :activity="activity" @update="passUpdate" />
        </ul>
    </div>
</template>

<style scoped></style>
