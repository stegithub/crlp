<template>
  <div class="admin-home">
    <aplayer :audio="audio" :lrc-type="3" />
  </div>
</template>

<script>
import { storage } from '../../../firebase_config'

export default {
    name: 'home',
	data: () => ({
		audio: {
			name: 'Epic Jam',
			artist: 'Crlp Jammen',
			url: '',
				//'https://firebasestorage.googleapis.com/v0/b/crlpapp-9ec26.appspot.com/o/3-EPIC%20JAM.wav?alt=media&token=8dde8d9c-fc68-4ec5-a842-9726dbd05333', //'http://pdacsgxq7.bkt.clouddn.com/mp3/hibikase.mp3',
			cover: ''
				//'https://firebasestorage.googleapis.com/v0/b/crlpapp-9ec26.appspot.com/o/md-logo.jpg?alt=media&token=00839891-7b65-4c22-8f36-24f6aa2a566d'
			//lrc: 'http://pdacsgxq7.bkt.clouddn.com/lrc/hibikase.lrc' text song
		}
	}),
	created() {
        storage
            .refFromURL('gs://crlpapp-9ec26.appspot.com/md-logo.jpg')
			.getDownloadURL()
			.then((url) => {
				this.audio.cover = url
			})
			.catch((error) => {
				console.log(error)
            })
        storage
            .refFromURL('gs://crlpapp-9ec26.appspot.com/3-EPIC JAM.wav')
			.getDownloadURL()
			.then((url) => {
				this.audio.url = url
			})
			.catch((error) => {
				console.log(error)
            })
    }
}
</script>

<style lang="scss">
.aplayer-lrc-current {
	display: none;
}
</style>
