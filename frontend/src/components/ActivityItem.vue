<script setup>
defineProps({
    activity: Object,
});

const emit = defineEmits(["update"]);

async function deleteActivity(act) {
    try {
        await fetch(
            import.meta.env.VITE_API_URL + `/api/activities/${act._id}/delete`
        );
        emit("update");
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}

async function updateActivityDone(act) {
    try {
        const activityObject = {
            timeCreated: act.timeCreated,
            content: act.content,
            done: !act.done,
        };
        await fetch(
            import.meta.env.VITE_API_URL + `/api/activities/${act._id}/update`,
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
        console.error(JSON.stringify(error));
    }
}
</script>

<template>
    <th
        id="doneCell"
        @click="updateActivityDone(activity)"
        style="cursor: pointer"
    >
        <div v-if="activity.done">✅</div>
    </th>
    <th id="contentCell">{{ activity.content }}</th>
    <th id="dateCell">
        {{ new Date(activity.timeCreated).toLocaleString() }}
    </th>
    <th id="optionCell">
        <button id="editButton" @click="deleteActivity(activity)">Edit</button>
        <button id="deleteButton" @click="deleteActivity(activity)">
            Delete
        </button>
    </th>
    <tr class="ActivityItem"></tr>
</template>

<style scoped>
/* #optionCell {
    text-align: center;
    justify-content: center;
} */

#editButton {
    margin: 0 0.2rem 0 0.2rem;
}

#deleteButton {
    margin: 0 0.2rem 0 0.2rem;
}
</style>
