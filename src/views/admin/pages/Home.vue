<template>
    <div class="admin-home">
        <aplayer v-for="(media, index) of medias" :key="index" v-if="media.type === 'audio/mp3'"
            :audio="{artist: media.artist.name, preload: 'none', name: media.name, url: media.url, theme: '#460f02' }" 
            :autoplay="false" 
            preload="none"/>
    </div>
</template>

<script>
import { mediaRef } from '../../../firebase_config'

export default {
    name: 'home',
    props: {
        artistRef: {}
    },
    firestore() {
        return {
            medias: mediaRef.where("artist", "==", this.artistRef),
            allMedias: mediaRef
        }
	},
	data: () => ({
        medias: [],
        allMedias: []
	})
}
</script>

<style lang="scss">
.admin-home {
	
}
</style>
