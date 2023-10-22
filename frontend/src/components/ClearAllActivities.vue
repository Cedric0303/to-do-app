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
    <div class="clearButton">
        <button @click="clearActivities">Clear all</button>
    </div>
</template>

<style scoped></style>
