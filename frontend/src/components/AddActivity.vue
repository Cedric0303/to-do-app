<script setup>
import { ref } from "vue";

const newActivity = ref("");

const emit = defineEmits(["update"]);

async function submitActivity() {
    try {
        const activityObject = {
            timeCreated: new Date(),
            content: newActivity.value,
            done: false,
        };
        await fetch(import.meta.env.VITE_API_URL + "/api/activities/create", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activityObject),
        });
        emit("update");
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}

async function clearActivities() {
    try {
        await fetch(import.meta.env.VITE_API_URL + "/api/activities/deleteAll");
        emit("update");
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}
</script>

<template>
    <div class="inputActivity">
        <form @submit.prevent="submit">
            <input
                class="textInput"
                v-model="newActivity"
                placeholder="Add a new activity"
            />
            <button name="clearButton" @click="clearActivities">
                Clear all
            </button>
            <div class="submitButtonDiv">
                <button name="submitButton" @click="submitActivity">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.textInput {
    width: 100%;
}

.clearButton {
    background-color: red;
}

.submitButtonDiv {
    float: right;
    text-align: right;
}
</style>
