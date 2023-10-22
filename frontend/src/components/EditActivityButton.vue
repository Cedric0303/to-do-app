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
</script>

<template>
    <button class="editButton" @click="showModal = true">Edit</button>
    <EditActivityModal
        :show="showModal"
        @close="showModal = false"
        @update="passUpdate"
        :activity="activity"
    />
</template>

<style scoped>
.deleteButton {
    margin: 0 0.2rem 0 0.2rem;
}
</style>
