<script setup>
const props = defineProps({
    activity: Object,
});

import { ref } from "vue";

import EditActivityModal from "./EditActivityModal.vue";

const showModal = ref(false);

const emit = defineEmits(["update"]);

function passUpdate() {
    emit("update");
}

async function deleteActivity() {
    await fetch(
        import.meta.env.VITE_API_URL +
            `/api/activities/${props.activity._id}/delete`
    );
    try {
        emit("update");
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}

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
        console.error(JSON.stringify(error));
    }
}
</script>

<template>
    <th id="doneCell" @click="updateActivityDone" style="cursor: pointer">
        <div v-if="activity.done">✅</div>
    </th>
    <th id="contentCell">{{ activity.content }}</th>
    <th id="dateCell">
        {{ new Date(activity.timeCreated).toLocaleString() }}
    </th>
    <th id="optionCell">
        <button id="editButton" @click="showModal = true">Edit</button>
        <button id="deleteButton" @click="deleteActivity">Delete</button>
    </th>
    <tr class="ActivityItem"></tr>
    <EditActivityModal
        :show="showModal"
        @close="showModal = false"
        @update="passUpdate"
        :activity="activity"
    />
</template>

<style scoped>
#editButton {
    margin: 0 0.2rem 0 0.2rem;
}

#deleteButton {
    margin: 0 0.2rem 0 0.2rem;
}
</style>
