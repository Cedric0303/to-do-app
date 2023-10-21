<script setup>
import { ref, onMounted } from "vue";
import ActivitiesList from "./components/ActivitiesList.vue";
import AddActivity from "./components/AddActivity.vue";

const activitiesArray = ref([]);

async function getActivities() {
    console.log("Updating activity list");
    try {
        const response = await fetch(
            import.meta.env.VITE_API_URL + "/api/activities"
        );
        const data = await response.json();
        data.activities.sort((a, b) => {
            return a.timeCreated - b.timeCreated;
        });
        activitiesArray.value = data.activities;
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}

onMounted(() => {
    getActivities();
});
</script>

<template>
    <div id="app">
        <AddActivity @update="getActivities" />
        <ActivitiesList :activities="activitiesArray" @update="getActivities" />
    </div>
</template>

<style scoped></style>
