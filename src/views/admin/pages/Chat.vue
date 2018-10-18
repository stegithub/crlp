<template>
    <div class="chat">
        Conversation ID: {{ chat.id }}
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
import { storage, chatRef, firebase } from '../../../firebase_config'
import uuidv4 from 'uuid/v4'

export default {
    name: 'chat',
    firestore() {
        return {
            chat: chatRef.doc(this.$route.params.artist),
            messages: chatRef.doc(this.$route.params.artist).collection('messages').orderBy('created')
        }
    },
	data: () => ({
        chat: {},
        messages: [],
        text: ''
	}),
	created() {
        // chatRef.add({
        //     created: Date.now(),
        //     users: ['xClORvo5jRlM4Pd7M4MA', 'rtLOAjknKDLge6YXhZQR'],
        //     messages: [
        //         { id: uuidv4(), text: 'Hi there', sender: 'xClORvo5jRlM4Pd7M4MA', created: Date.now() },
        //         { id: uuidv4(), text: 'Hi to you too!', sender: 'rtLOAjknKDLge6YXhZQR', created: Date.now() }
        //     ]
        // })

        // chatRef.add({
        //     created: Date.now(),
        //     users: ['xClORvo5jRlM4Pd7M4MA', 'rtLOAjknKDLge6YXhZQR'],
        //     messages: []
        // })
    },
    methods: {
        addMessage() {
            // this.chat.messages.push({ id: uuidv4(), text: 'BUuuu', sender: 'L2ZnOv8SFySsQ5631OrfAjA05In1', created: Date.now() })
            // this.chat.update({
            //     created: Date.now(),
            //     users: ['xClORvo5jRlM4Pd7M4MA', 'rtLOAjknKDLge6YXhZQR'],
            //     messages: [
            //         { id: uuidv4(), text: 'BUuuu', sender: 'xClORvo5jRlM4Pd7M4MA', created: Date.now() },
            //     ]
            // })
            // console.log(this.artists)
            if(this.text.length > 0) {
                chatRef.doc(this.$route.params.artist).collection('messages').add({
                    created: firebase.firestore.FieldValue.serverTimestamp(),//Date(),
                    sender: this.$current_user.uid,
                    text: this.text
                })
                this.text = ''
            }
        }
        // Saves a new message on the Firestore DB.
        // saveMessage(messageText) {
        //     return this.messages.push({
        //         name: getUserName(),
        //         text: messageText,
        //         profilePicUrl: getProfilePicUrl()
        //     }).catch(function(error) {
        //         console.error('Error writing new message to Firebase Database', error);
        //     });
        // }
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
