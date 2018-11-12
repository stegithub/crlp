<template>
    <!-- <div class="message-container" @click="editMessage">
        <div :class="getPosition">
            <span v-if="!editMode">{{ message.sender.firstname + ': ' + message.text }}</span>
            <input v-if="editMode" @blur="handleBlur" :value="message.text" @input="$emit('messageChanged', {id: message.id, new_value: $event.target.value})" />
        </div>
    </div> -->
    <div class="message-container" @click="editMessage" :class="getPosition">
        <md-card md-with-hover>
            <md-card-content>
                <md-avatar class="md-avatar-icon md-small" :class="getAvatarClass">{{getInitial()}}</md-avatar>
                {{ !editMode ? message.text : '' }}
                <md-field v-if="editMode">
                    <md-input ref="inputRef" @blur="handleBlur" v-model="getMessage.text" @input="emit($event)">
                    </md-input>
                </md-field>
            </md-card-content>
        </md-card>
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
        },
        getAvatarClass () {
            if (this.message.sender.id === this.$current_user.uid) {
                return 'md-primary'
            } else {
                return 'md-accent'
            }
        },
        getMessage() {
            return {...this.message}
        }
    },
    methods: {
        editMessage() {
            if(this.message.sender.id == this.$current_user.uid) {
                this.editMode = true
                setTimeout(() => {
                    this.$refs.inputRef.$el.focus()
                })
            }
        },
        handleBlur() {
            this.editMode = false
        },
        getInitial() {
            if(this.message.sender.firstname)
                return this.message.sender.firstname.charAt(0) + this.message.sender.lastname.charAt(0)
        },
        emit(value) {
            this.$emit('messageChanged', {id: this.message.id, new_value: value})
        }
    }
}
</script>

<style scoped>
    .my-message {
        justify-content: flex-end;
    }
    .md-card {
        max-width: 70%;
    }
    .message-container {
        display: flex;
        min-height: 20px;
        margin-bottom: 15px;
    }
</style>