<template>
  <div class="page-container">
    <notifications></notifications>


    <!-- <q-layout view="lhr LpR lFr">
         <q-header reveal elevated class="bg-primary text-white">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="left = !left" />

                <q-toolbar-title>
                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
                    </q-avatar>
                    Title
                </q-toolbar-title>

                <q-btn dense flat round icon="menu" @click="right = !right" />
            </q-toolbar>
        </q-header>

        <q-drawer v-model="left" side="left" behavior="desktop" bordered>
        </q-drawer>

        <q-drawer v-model="right" side="right" bordered>
        </q-drawer>

        <q-page-container>
        <router-view />
        </q-page-container>

        <q-footer reveal elevated class="bg-grey-8 text-white">
        <q-toolbar>
            <q-toolbar-title>
            <q-avatar>
                <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
            </q-avatar>
            Title
            </q-toolbar-title>
        </q-toolbar>
        </q-footer>

    </q-layout> -->


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
                </div>
            </div>
        </md-app-toolbar>
        <md-app-drawer :md-active.sync="menuVisible">
            <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>
            <md-list>
                <md-list-item>
                    <md-button @click="$router.push({name: 'home'}); menuVisible = !menuVisible" class="md-icon-button">
                        <md-icon>home</md-icon>
                    </md-button>
                    <span class="md-list-item-text">{{$t('message.home')}}</span>
                </md-list-item>
                <md-list-item v-if="this.user && this.user.isAdmin">
                    <md-button @click="$router.push({name: 'upload', params: {artistRef: artistRef}}); menuVisible = !menuVisible" class="md-icon-button">
                        <md-icon>cloud_upload</md-icon>
                    </md-button>
                    <span class="md-list-item-text">{{$t('message.upload')}}</span>
                </md-list-item>
                <md-list-item>
                    <md-button @click="$router.push({name: 'chat', params: {artistRef: artistRef}}); menuVisible = !menuVisible" class="md-icon-button">
                        <md-icon>chat</md-icon>
                    </md-button>
                    <span class="md-list-item-text">{{$t('message.chat')}}</span>
                </md-list-item>
            </md-list>
        </md-app-drawer>
        <md-app-content>
            <router-view v-if="artistRef" :artistRef="artistRef" />
        </md-app-content>
    </md-app>
  </div>
</template>

<script>

import { artistsRef, usersRef } from '../../firebase_config'

export default {
    name: 'admin',
    firestore () {
        return {
            artists: artistsRef.where('users', 'array-contains', this.$current_user.uid),
            user: usersRef.doc(this.$current_user.uid),
        }
    },
    data: () => ({
        menuVisible: false,
        artists: [],
        artist_id: '',
        artistRef: null,
        user: null,
        left: true,
        right: true
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

    .md-toolbar-row {
        max-height: 48px;
    }
}
</style>
