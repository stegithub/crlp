<template>
    <div class="upload">
        <input v-on:change="getImage" type="file" id="file" class="inputfile">
        <label for="file">Escoje un archivo</label>
        <button v-on:click="uploadImage">Subir</button>
        {{this.progress}}
    </div>
</template>

<script>
import { storage, firebase, mediaRef } from '../../../firebase_config'

export default {
    name: 'upload',
    firestore() {
        return {
            medias: mediaRef.doc(this.$route.params.id),
            // components: componentsRef
        }
	},
	data: () => ({
		progress: 0
	}),
	created() {},
	methods: {
		getImage(e) {
			this.image = e.target.files[0]
		},

		uploadNewUrl(url) {
			this.$firebaseRefs.photos.push({
				url: url
			});
			// toastr.success('Done!');
		},

		uploadImage() {
			var metadata = {
				contentType: 'audio/mpeg'
			}

			var uploadTask = storage
				.ref()
				.child(this.image.name)
				.put(this.image, metadata)

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(
				firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				snapshot => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					this.progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					// toastr.info('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused')
							break
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running')
							break
					}
				},
				error => {
					switch (error.code) {
						case 'storage/unauthorized':
							alert(
								"User doesn't have permission to access the object"
							)
							break

						case 'storage/canceled':
							alert('User canceled the upload')
							break

						case 'storage/unknown':
							alert(
								'Unknown error occurred, inspect error.serverResponse'
							)
							break
					}
				},
				() => {
					// Upload completed successfully, now we can get the download URL
					uploadTask.snapshot.ref
						.getDownloadURL()
						.then((downloadURL) => {
							this.uploadNewUrl(downloadURL)
						})
				}
			)
		}
	}
}
</script>

<style lang="scss">
.upload {

}
</style>
