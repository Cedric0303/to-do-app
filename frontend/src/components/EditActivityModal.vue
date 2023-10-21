<!-- modal code adapted from https://vuejs.org/examples/#modal -->

<script setup>
const props = defineProps({
    show: Boolean,
    activity: Object,
});

import { ref } from "vue";

const editActivityContent = ref(props.activity.content);
const editActivityTime = ref(false);
const editActivityDone = ref(true);

const emit = defineEmits(["update", "close"]);

async function submitUpdateActivity(e) {
    console.log(editActivityContent);
    e.preventDefault();
    try {
        const activityObject = {
            timeCreated: editActivityTime.value
                ? new Date()
                : props.activity.timeCreated,
            content: editActivityContent.value,
            done: editActivityDone.value ? false : props.activity.done,
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
        e.target.reset();
        emit("update");
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}
</script>

<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask">
            <div class="modal-container">
                <div class="modal-header">
                    <h3>Edit Activity</h3>
                </div>

                <div class="modal-body">
                    <form v-on:submit="submitUpdateActivity">
                        <input
                            class="textInput"
                            v-model="editActivityContent"
                        />
                        <div class="editCheckbox">
                            <input
                                type="checkbox"
                                id="editTimeCheckbox"
                                v-model="editActivityTime"
                            />
                            <label for="editTimeCheckbox"
                                >Use current time: {{ editActivityTime }}</label
                            >
                        </div>
                        <div class="editCheckbox">
                            <input
                                type="checkbox"
                                id="editDoneCheckbox"
                                v-model="editActivityDone"
                            />
                            <label for="editDoneCheckbox"
                                >Reset done status:
                                {{ editActivityDone }}</label
                            >
                        </div>
                        <div class="modal-bottom">
                            <button
                                name="clearButton"
                                class="modal-default-button float-left"
                                @click="$emit('close')"
                            >
                                Cancel
                            </button>
                            <div class="submitButtonDiv">
                                <button
                                    type="submit"
                                    class="modal-default-button float-right"
                                    name="submitButton"
                                    @click="
                                        submitUpdateActivity, $emit('close')
                                    "
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.textInput {
    width: 100%;
}

.editCheckbox {
    width: 100%;
    margin: 1rem 0 1rem 0;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 50%;
    height: 50%;
    margin: auto;
    padding: 20px 30px;
    background-color: rgb(33, 33, 33);
    border-radius: 25px;
    border-color: white;
    transition: all 0.3s ease;
}

.modal-body {
    margin: 20px 0;
}

.modal-bottom {
    margin-top: 2rem;
}

.float-left {
    float: left;
}

.float-right {
    float: right;
}

.modal-default-button {
    margin: 0 0.2rem 0 0.2rem;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
