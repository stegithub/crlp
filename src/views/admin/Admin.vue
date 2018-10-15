<template>
  <div class="page-container">
        <md-app md-mode="reveal">
        <md-app-toolbar class="tbar md-primary">
            <div class="md-toolbar-row">
                <div class="md-toolbar-section-start">
                    <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                        <md-icon>menu</md-icon>
                    </md-button>
                </div>
                <div class="md-toolbar-section-end">
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
                    <md-button @click="$router.push('/admin/upload'); menuVisible = !menuVisible" class="md-icon-button">
                        <md-icon>move_to_inbox</md-icon>
                    </md-button>
                    <span class="md-list-item-text">{{$t('upload')}}</span>
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
export default {
    name: 'admin',
    data: () => ({
		menuVisible: false
	}),
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
}
</style>
