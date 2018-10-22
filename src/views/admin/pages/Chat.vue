<template>
    <div class="chat">
        Conversation ID: {{ $route.params.artistRef.id }}
        <hr>
        <message v-for="(message, index) in messages" :message="message" :key="index"/>
        <md-field>
            <md-textarea v-model="text" v-on:keypress.enter.prevent="addMessage()"></md-textarea>
        </md-field>
        <md-button @click="addMessage()" class="md-icon-button">
            <md-icon>add_circle</md-icon>
        </md-button>
    </div>
</template>

<script>
import { chatRef, artistsRef, firebase } from '../../../firebase_config'

export default {
    name: 'chat',
    firestore() {
        return {
            messages: this.$route.params.artistRef.collection('messages').orderBy('created'),
        }
    },
	data: () => ({
        messages: [],
        text: ''
	}),
	created() {
    },
    methods: {
        addMessage() {
            if(this.text.length > 0) {
                this.$route.params.artistRef.collection('messages').add({
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    sender: this.$current_user.uid,
                    text: this.text
                })
                this.text = ''
            }
        }
    },
    components: {
        Message: () => import('../components/Message') //.then(({ MdCard }) => MdCard),
    }
}
</script>

<style lang="scss">
.chat {
}
</style>
