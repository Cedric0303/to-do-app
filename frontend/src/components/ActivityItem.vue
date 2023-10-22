<script setup>
const props = defineProps({
    activity: Object,
});

import DeleteActivityButton from "./DeleteActivityButton.vue";
import EditActivityButton from "./EditActivityButton.vue";

const emit = defineEmits(["update"]);

// pass emitters to parent component
function passUpdate() {
    emit("update");
}

// handle toggling activity's done state and send to backend API server
async function updateActivityDone() {
    try {
        const activityObject = {
            timeCreated: props.activity.timeCreated,
            content: props.activity.content,
            done: !props.activity.done,
        };
        await fetch(
            import.meta.env.VITE_API_URL +
                `/api/activities/${props.activity._id}/update`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(activityObject),
            }
        );
        emit("update");
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <th @click="updateActivityDone" style="cursor: pointer">
        <div v-if="activity.done">✅</div>
    </th>
    <th>{{ activity.content }}</th>
    <th>
        {{ new Date(activity.timeCreated).toLocaleString() }}
    </th>
    <th>
        <EditActivityButton :activity="activity" @update="passUpdate" />
        <DeleteActivityButton :activity="activity" @update="passUpdate" />
    </th>
</template>

<style scoped>
.editButton {
    margin: 0 0.2rem 0 0.2rem;
}
</style>
