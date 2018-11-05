<template>
    <div class="chat">
        Artist: {{ this.artist.name }}
        <hr>
        <message v-for="(message, index) in messages" :message="message" :key="index"/>
        <div class="md-layout md-alignment-bottom-right">
            <md-button @click="addMessage()" class="md-icon-button">
                <md-icon>send</md-icon>
            </md-button>
        </div>
        <md-field>
            <md-textarea v-model="text" v-on:keypress.enter.prevent="addMessage()"></md-textarea>
        </md-field>
    </div>
</template>

<script>
import { chatRef, usersRef, artistsRef, firebase } from '../../../firebase_config'

export default {
    name: 'chat',
    firestore() {
        return {
            messages: this.$route.params.artistRef.collection('messages').orderBy('created'),
            artist: this.$route.params.artistRef,
            currentUser: usersRef.where('user_id', '==', this.$current_user.uid)
        }
    },
	data: () => ({
        messages: [],
        text: '',
        artist: {},
        currentUser: {},
        currentUserRef: {}
	}),
	created() {

    },
    mounted() {
        this.$firestoreRefs.currentUser.get().then(ref => {
            this.currentUserRef = ref.docs[0].ref
        })
    },
    methods: {
        addMessage() {
            if(this.text.length > 0) {
                this.$route.params.artistRef.collection('messages').add({
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    sender: this.currentUserRef,
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
