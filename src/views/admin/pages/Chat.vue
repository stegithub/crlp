<template>
    <div class="chat">
        {{$t("message.artist")}}: {{ this.artist.name }}
        <hr>
        <message v-for="(message, index) in messages" :message="message" :key="index" @messageChanged="messageChanged($event)"/>
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
            currentUser: usersRef.doc(this.$current_user.uid)
        }
    },
	data: () => ({
        messages: [],
        text: '',
        artist: {},
        currentUser: {}
	}),
	created() {

    },
    mounted() {
        this.$firestoreRefs.currentUser
    },
    methods: {
        addMessage() {
            if(this.text.length > 0) {
                this.$route.params.artistRef.collection('messages').add({
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    sender: this.$firestoreRefs.currentUser,
                    text: this.text
                }).catch(e => {
                    this.notifyVue('bottom','center', e.message, 'danger')                    
                })
                this.text = ''
            }
        },
        messageChanged(data) {
            this.$route.params.artistRef.collection('messages').doc(data.id).update({
                text: data.new_value,
                updated: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(e => {
                this.notifyVue('bottom','center', e.message, 'danger')                    
            })
        },
        notifyVue(verticalAlign, horizontalAlign, message, type) {
            this.$notify({
                message: message,
                icon: 'notifications',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: type
            })
        },
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
