<script setup>
import { ref, onMounted } from "vue";
import ActivitiesTable from "./components/ActivitiesTable.vue";
import AddActivity from "./components/AddActivity.vue";

const activitiesArray = ref([]);

async function getActivities() {
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
        <div name="View">
            <h1>To Do App</h1>
            <AddActivity @update="getActivities" />
            <ActivitiesTable
                :activities="activitiesArray"
                @update="getActivities"
            />
        </div>
        <footer>Built by Jun Li Chen using MEVN stack</footer>
    </div>
</template>

<style scoped>
@import url("https://cdn.simplecss.org/simple.min.css");

.View {
    padding-top: 10rem;
}

footer {
    color: grey;
    position: fixed;
    bottom: 1%;
    right: 30%;
}
</style>
