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
    <div class="ActivityItem">
        <div class="ActivityDetails">
            <input
                type="checkbox"
                name="checkbox"
                :checked="activity.done"
                @click="updateActivityDone(activity)"
            />
            <p>{{ activity.content }}</p>
            <p>{{ new Date(activity.timeCreated).toLocaleString() }}</p>
            <button id="deleteButton" @click="deleteActivity(activity)">
                Delete
            </button>
        </div>
    </div>
</template>

<style scoped></style>
