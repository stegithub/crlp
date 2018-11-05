<template>
    <div class="upload">
        <md-field>
            <label>Upload</label>
            <md-file id="file" v-model="multiple" multiple v-on:md-change="getFiles" />
        </md-field>
        <div class="md-layout md-alignment-bottom-right">
            <md-button @click="upload()" class="md-icon-button">
                <md-icon>cloud_upload</md-icon>
            </md-button>
        </div>

        <div v-for="(task, index) of tasks" v-if="task && task.progress < 100" :key="index" class="progress-bar">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-20 title">{{task.name}}
                    <md-tooltip v-if="task.name.length > 14" md-direction="bottom">{{task.name}}</md-tooltip>
                </div>
                <div class="md-layout-item">
                    <md-progress-bar class="md-accent" md-mode="determinate" :md-value="task.progress"></md-progress-bar>
                </div>
                <div class="md-layout-item">
                    <md-button v-if="task && task.state === state.RUNNING" @click="pause(task)" class="md-icon-button">
                        <md-icon>pause_circle_outline</md-icon>
                    </md-button>
                    <md-button v-if="task && task.state === state.PAUSED" @click="resume(task)" class="md-icon-button">
                        <md-icon>play_circle_outline</md-icon>
                    </md-button>
                    <md-button @click="cancel(task)" class="md-icon-button">
                        <md-icon>cancel</md-icon>
                    </md-button>
                </div>
            </div>
        </div>

        <div class="md-layout md-gutter">
            <md-table class="md-layout-item" v-model="medias" md-card @md-selected="onSelect">
                <md-table-toolbar>
                    <h1 class="md-title">{{$t('media')}}</h1>
                </md-table-toolbar>

                <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                    <div class="md-toolbar-section-start"></div>

                    <div class="md-toolbar-section-end">
                    <md-button @click="deleteMedia()" class="md-icon-button">
                        <md-icon>delete</md-icon>
                    </md-button>
                    </div>
                </md-table-toolbar>

                <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple">
                    <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="Type" md-sort-by="type">{{ item.type }}</md-table-cell>
                    <!-- <md-table-cell md-label="Created" md-sort-by="title">{{ item.created }}</md-table-cell> -->
                    <md-table-cell md-label="" md-sort-by="url">
                        <md-button @click="download(item.url, item.name)" class="md-icon-button">
                            <md-icon>cloud_download</md-icon>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </div>
        <p>Selected:</p>
            {{ selected }}
        
    </div>
</template>

<script>
import { storage, firebase, mediaRef } from '../../../firebase_config'

export default {
    name: 'upload',
    firestore() {
        return {
            medias: mediaRef.where("artist", "==", this.$route.params.artistRef),
            allMedias: mediaRef
        }
	},
	data: () => ({
        progress: 0,
        medias: [],
        allMedias: [],
        selected: [],
        multiple: null,
        current_files_uploaded: [],
        tasks: [],
        state: {
            RUNNING: 'RUNNING',
            PAUSED: 'PAUSED',
            CANCELED: 'CANCELED'
        }
        // type: ['', 'info', 'success', 'warning', 'danger']
	}),
	created() {

    },
    mounted() {
        // this.notifyVue('bottom','center')
    },
	methods: {
        onSelect(items) {
            this.selected = items
        },
        download(url, name) {
            // window.open(url)
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                let blob = xhr.response;
                let a = document.createElement("a");
                a.href = window.URL.createObjectURL(blob);
                a.download = name
                a.click();
                a.remove();
            };
            xhr.open('GET', url);
            xhr.send();
        },
		getImage(e) {
			this.image = e.target.files[0]
        },
        getFiles(e) {
            this.current_files_uploaded = e
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
        deleteMedia() {
            this.selected.forEach(file => {
                this.$firestoreRefs.allMedias.doc(file.id).delete().then(r => {
                    // Delete the file
                    storage.ref().child(file.path).delete().then(() => {
                        this.notifyVue('bottom','center', this.$t('file_deleted'), 'success')
                    }).catch((error) => {
                        this.notifyVue('bottom','center', this.$t('delete_error'), 'danger')
                    });
                }).catch(e => {
                    this.notifyVue('bottom','center', this.$t('delete_error'), 'danger')
                })
            });
            this.selected = []
        },
        upload() {
            this.tasks = []
            for(let i = 0; i < this.current_files_uploaded.length; i++) {
                
                // console.log(this.$route.params.artistRef.id)
                let uploadTask = storage
                    .ref()
                    .child(this.$route.params.artistRef.id + '/' + this.current_files_uploaded[i].name)
                    .put(this.current_files_uploaded[i], {contentType: this.current_files_uploaded[i].type})
                
                this.tasks.push({
                    name: this.current_files_uploaded[i].name,
                    progress: 0,
                    instance: uploadTask,
                    state: this.state.RUNNING
                })
                
                uploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    snapshot => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        this.tasks[i].progress =
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
                                this.notifyVue('bottom','center', this.$t('unauthorized'), 'danger')
                                // alert(
                                //     "User doesn't have permission to access the object"
                                // )
                                break

                            case 'storage/canceled':
                                this.notifyVue('bottom','center', this.$t('upload_canceled'), 'warning')
                                // alert('User canceled the upload')
                                break

                            case 'storage/unknown':
                                this.notifyVue('bottom','center', this.$t('error'), 'danger')
                                // alert(
                                //     'Unknown error occurred, inspect error.serverResponse'
                                // )
                                break
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref
                            .getDownloadURL()
                            .then((downloadURL) => {
                                let t = this.$firestoreRefs.medias.where('name', '==', this.current_files_uploaded[i].name).get().then(snap => {
                                    if(snap.docs.length > 0) {
                                        snap.docs.forEach(element => {
                                            mediaRef.doc(element.id).update({ 
                                                path: /*'gs://' + uploadTask.snapshot.metadata.bucket + '/' +*/ uploadTask.snapshot.metadata.fullPath,
                                                permission_level: 0,
                                                type: uploadTask.snapshot.metadata.contentType,
                                                updated: firebase.firestore.FieldValue.serverTimestamp(),
                                                updated_by: this.$current_user.uid,
                                                url: downloadURL
                                            })
                                        })
                                    } else {
                                        mediaRef.add({
                                            artist: this.$route.params.artistRef,
                                            created: firebase.firestore.FieldValue.serverTimestamp(),
                                            name: uploadTask.snapshot.metadata.name,
                                            path: /*'gs://' + uploadTask.snapshot.metadata.bucket + '/' +*/ uploadTask.snapshot.metadata.fullPath,
                                            permission_level: 0,
                                            type: uploadTask.snapshot.metadata.contentType,
                                            updated: firebase.firestore.FieldValue.serverTimestamp(),
                                            updated_by: this.$current_user.uid,
                                            url: downloadURL
                                        })
                                    }
                                    this.notifyVue('bottom','center', this.$t('upload_success'), 'success')
                                })
                            })
                    }
                )
            }
        },
        pause(task) {
            task.instance.pause()
            task.state = this.state.PAUSED
        },
        resume(task) {
            task.instance.resume()
            task.state = this.state.RUNNING
        },
        cancel(task) {
            task.instance.cancel()
            let index = this.tasks.findIndex(t => t.name === task.name)
            this.tasks.splice(index, 1)
            task.state = this.state.CANCELED
        }
    },
    components: {
        
    }
}
</script>

<style lang="scss">
.upload {
    .progress-bar {
        margin: 20px;
        .md-progress-bar {
            margin-top: 10px;
        }
        button {
            height: 25px;
            width: 25px;
            min-width: 25px;
        }
        .md-button-content {
            position: absolute;
            top: 0;
        }
    }
    .title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>
