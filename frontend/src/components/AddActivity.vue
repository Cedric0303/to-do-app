<script setup>
import { ref } from "vue";

const newActivity = ref("");

const emit = defineEmits(["update", "empty"]);

// handle activity text input and send to backend API server
async function submitActivity(e) {
    e.preventDefault();
    if (!newActivity.value.length) emit("empty");
    else
        try {
            const activityObject = {
                timeCreated: new Date(),
                content: newActivity.value,
                done: false,
            };
            await fetch(
                import.meta.env.VITE_API_URL + "/api/activities/create",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(activityObject),
                }
            );
            newActivity.value = "";
            emit("update");
        } catch (error) {
            console.error(error);
        }
}
</script>

<template>
    <div>
        <form v-on:submit="submitActivity">
            <input
                class="textInput2"
                v-model="newActivity"
                placeholder="Add a new to-do activity..."
            />
            <p />
            <div class="submitButton">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.textInput2 {
    width: 100%;
}

.submitButton {
    float: right;
    text-align: right;
}
</style>
