<script setup>
const emit = defineEmits(["update"]);

// remove all stored activities
async function clearActivities() {
    try {
        await fetch(import.meta.env.VITE_API_URL + "/api/activities/deleteAll");
        emit("update");
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <button name="clearButton" @click="clearActivities">Clear all</button>
</template>

<style scoped>
.clearButton {
    background-color: red;
}
</style>
