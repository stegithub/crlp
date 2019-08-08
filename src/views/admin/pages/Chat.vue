<template>
    <div class="chat">
        {{$t("message.artist")}}: {{ this.artist.name }}
        <hr>
        <md-content ref="messagesEl" class="md-scrollbar messages">
            <!-- <message v-for="(message, index) in messages" :message="message" :key="index" @messageChanged="messageChanged($event)"/> -->

            <q-chat-message
                v-for="(message, index) in messages" 
                :key="index"
                :text="[message.text]"
                :stamp="getStamp(message)"
                :sent="isMine(message)"
            ><!-- :name="`${message.sender.firstname} ${message.sender.lastname}`"-->
                <template slot="avatar" slot-scope="props">
                    <md-avatar class="md-avatar-icon md-small" :class="getAvatarClass(message)">{{getInitial(message)}}</md-avatar>
                </template>
            </q-chat-message>

        </md-content>

            <hr>
        <md-card-actions>
            <md-field>
                <md-input v-model="text" v-on:keypress.enter.prevent="addMessage()"></md-input>
            </md-field>
            <div class="md-layout md-alignment-bottom-right">
                <md-button @click="addMessage()" class="md-icon-button">
                    <md-icon>send</md-icon>
                </md-button>
            </div>
        </md-card-actions>
        
        <!-- <div>
            <div class="md-layout md-alignment-bottom-right">
                <md-button @click="addMessage()" class="md-icon-button">
                    <md-icon>send</md-icon>
                </md-button>
            </div>
            <md-field>
                <md-textarea v-model="text" v-on:keypress.enter.prevent="addMessage()"></md-textarea>
            </md-field>
        </div> -->
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
    updated() {
        this.$nextTick(() => {
            this.$refs.messagesEl.$el.scrollTop = this.$refs.messagesEl.$el.scrollHeight            
        })
    },
    computed: {
        
    },
    methods: {
        getInitial(message) {
            if(message.sender.firstname)
                return message.sender.firstname.charAt(0) + message.sender.lastname.charAt(0)
        },
        getAvatarClass (message) {
            if (message.sender.id === this.$current_user.uid) {
                return 'md-primary'
            } else {
                return 'md-accent'
            }
        },
        isMine(message) {
            if (message.sender.id === this.$current_user.uid) {
                return true
            } else {
                return false
            }
        },
        getStamp(message) {
            if(message && message.created)
                return `${new Date(message.created.seconds * 1000).toLocaleDateString()} 
                    ${new Date(message.created.seconds * 1000).toLocaleTimeString(window.navigator.language, {hour12: true, hour: '2-digit', minute:'2-digit'})}`
        },
        addMessage() {
            if(this.text.length > 0) {
                this.$route.params.artistRef.collection('messages').add({
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    updated: firebase.firestore.FieldValue.serverTimestamp(),
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
        Message: () => import('../components/Message'), //.then(({ MdCard }) => MdCard),
        QChatMessage: () => import('quasar/src/components/chat/QChatMessage')
    }
}
</script>

<style lang="scss">
.chat {
    // max-height: calc(100vh - 8vh);
    .messages {
        height: 75vh;
        // max-height: calc(100vh - 34vh);
        overflow: auto;
    }
    .md-avatar {
        margin: .6rem;
    }
    .md-avatar.md-small {
        width: 30px;
        min-width: 30px;
        height: 30px;
        border-radius: 30px;
        font-size: 14px;
    }
    .md-field {
        margin: unset;
    }
}
</style>
