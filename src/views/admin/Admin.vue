<template>
  <div class="page-container">
        <notifications></notifications>
        <md-app md-mode="reveal">
        <md-app-toolbar class="tbar md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>
                </div>
                <div class="md-toolbar-section-end">
                    <div v-if="artists.length > 0">
                        <md-field class="select">
                            <md-select v-model="artist_id" placeholder="Band">
                                <md-option v-for="a of artists" :key="a.id" :value="a.id">{{a.name}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <md-button class="md-icon-button">
                        <md-icon>refresh</md-icon>
                    </md-button>
                    <md-button class="md-icon-button">
                        <md-icon>more_vert</md-icon>
                    </md-button>
                </div>
            </div>
        </md-app-toolbar>
        <md-app-drawer :md-active.sync="menuVisible">
            <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>
            <md-list>
                <md-list-item>
                    <md-button @click="$router.push('/admin/home'); menuVisible = !menuVisible" class="md-icon-button">
                        <md-icon>home</md-icon>
                    </md-button>
                    <span class="md-list-item-text">{{$t('home')}}</span>
                </md-list-item>
                <md-list-item>
                    <md-button @click="$router.push({name: 'upload', params: {artistRef: artistRef}}); menuVisible = !menuVisible" class="md-icon-button">
                        <md-icon>cloud_upload</md-icon>
                    </md-button>
                    <span class="md-list-item-text">{{$t('upload')}}</span>
                </md-list-item>
                <md-list-item>
                    <md-button @click="$router.push({name: 'chat', params: {artistRef: artistRef}}); menuVisible = !menuVisible" class="md-icon-button">
                        <md-icon>chat</md-icon>
                    </md-button>
                    <span class="md-list-item-text">{{$t('chat')}}</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>send</md-icon>
                    <span class="md-list-item-text">Sent Mail</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>delete</md-icon>
                    <span class="md-list-item-text">Trash</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>error</md-icon>
                    <span class="md-list-item-text">Spam</span>
                </md-list-item>
            </md-list>
        </md-app-drawer>
        <md-app-content>
            <router-view/>
        </md-app-content>
    </md-app>
  </div>
</template>

<script>

import { artistsRef } from '../../firebase_config'

export default {
    name: 'admin',
    firestore () {
        return {
            artists: artistsRef.where('users', 'array-contains', this.$current_user.uid),
        }
    },
    data: () => ({
        menuVisible: false,
        artists: [],
        artist_id: '',
        artistRef: {}
    }),
    created() {
    },
    watch: {
        artists(new_value) {
            if(new_value.length > 0) {
                this.artist_id = new_value[0].id
            }
        },
        artist_id(new_value) {
            this.artistRef = artistsRef.doc(new_value)
        }
    },
	components: {
		
	}
}
</script>

<style lang="scss">
.page-container {
	// .md-toolbar + .md-toolbar {
		// margin-top: 16px;
    // }
    
    .md-app {
        // border: 1px solid rgba(#000, 0.12);
        min-height: 100vh;
	}

	.md-drawer {
		width: 230px;
		max-width: calc(100vw - 125px);
    }

    .md-select {
        input {
            -webkit-text-fill-color: var(--md-theme-default-text-primary-on-primary, #fff) !important;
        }
    }

    .md-field.select:after {
        background-color: var(--md-theme-default-text-primary-on-primary, #fff);
    }
}
</style>
