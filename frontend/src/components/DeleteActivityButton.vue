<script setup>
const props = defineProps({
    activity: Object,
});

const emit = defineEmits(["update"]);

// remove a single activity stored in database
async function deleteActivity() {
    await fetch(
        import.meta.env.VITE_API_URL +
            `/api/activities/${props.activity._id}/delete`
    );
    try {
        emit("update");
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <button class="deleteButton" @click="deleteActivity">Delete</button>
</template>

<style scoped>
.deleteButton {
    margin: 0 0.2rem 0 0.2rem;
}
</style>
