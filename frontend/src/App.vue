<script setup>
import { ref, onMounted } from "vue";

import ActivitiesTable from "./components/ActivitiesTable.vue";
import AddActivity from "./components/AddActivity.vue";
import ClearAllActivities from "./components/ClearAllActivities.vue";
import EmptyActivityError from "./components/EmptyActivityError.vue";

const activitiesArray = ref([]);
const emptyActivityText = ref(false);

async function getActivities() {
    try {
        const response = await fetch(
            import.meta.env.VITE_API_URL + "/api/activities"
        );
        const data = await response.json();
        activitiesArray.value = data.activities;
    } catch (error) {
        console.error(error);
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
            <AddActivity
                @update="getActivities"
                @empty="emptyActivityText = true"
            />
            <!-- <ClearAllActivities @update="getActivities" /> -->
            <EmptyActivityError v-if="emptyActivityText" />
            <ActivitiesTable
                :activities="activitiesArray"
                @update="getActivities"
            />
        </div>
        <footer>Bun supremacy</footer>
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
    font-size: small;
}
</style>
