<template>
    <div class="message-container" @click="editMessage">
        <div :class="getPosition">
            <span v-if="!editMode">{{ message.sender.firstname + ': ' + message.text }}</span>
            <input v-if="editMode" @blur="handleBlur" :value="message.text" @input="$emit('messageChanged', {id: message.id, new_value: $event.target.value})" />
        </div>
    </div>
</template>

<script>

export default {
    name: 'message',
    props: {
        message: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editMode: false
        }
    },
    computed: {
        getPosition () {
            if (this.message.sender.id === this.$current_user.uid) {
                return 'my-message'
            } else {
                return 'message'
            }
        }
    },
    methods: {
        editMessage() {
            if(this.message.sender.id == this.$current_user.uid)
                this.editMode = true
        },
        handleBlur() {
            this.editMode = false
        }
    }
}
</script>

<style scoped>
    .my-message {
        text-align: right;
    }
    .message-container {
        min-height: 20px;
        border: 1px solid silver;
    }
</style>