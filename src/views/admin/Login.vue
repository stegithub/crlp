<template>
  <div class="centered-container">
    <form novalidate class="md-layout" @submit.prevent="validateLogin">
      <md-card class="md-content md-elevation-3 md-theme-default">
        <div class="title">
            <img src="../../assets/md-logo.jpg">
            <div class="md-title">{{ $t("message.data__sitename") }}</div>
            <div class="md-body-1">{{ $t("message.data__main_quote") }}</div>
        </div>
        <md-card-content>
            <md-field :class="getValidationClass('email')">
                <label for="email">{{ $t("message.email") }}</label>
                <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">{{ $t("message.validator__requiredfield_email") }}</span>
                <span class="md-error" v-else-if="!$v.form.email.email">{{ $t("message.validator__validemail") }}</span>
            </md-field>
            <md-field :class="getValidationClass('password')">
                <label for="password">{{ $t("message.password") }}</label>
                <md-input v-model="form.password" type="password" :disabled="sending"></md-input>
                <span class="md-error" v-if="!$v.form.password.required">{{ $t("message.validator__requiredfield_password") }}</span>
                <span class="md-error" v-else-if="!$v.form.password.password">{{ $t("message.validator__validpassword") }}</span>
            </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
            <div class="actions md-layout md-alignment-center-space-between">
                <a @click="resetPassword()">{{ $t("message.action__reset_password") }}</a>
                <md-button type="submit" class="md-raised md-primary" :disabled="sending">{{ $t("message.action__login") }}</md-button>
            </div>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="error">
          <span>{{error_message}}</span>
      </md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { firebaseApp } from '../../firebase_config'

export default {
	name: 'login',
	mixins: [validationMixin],
	data: () => ({
		form: {
			email: null,
			password: null
		},
		error: false,
		error_message: '',
		sending: false
	}),
	validations: {
		form: {
			password: {
				required,
				minLength: minLength(6)
			},
			email: {
				required,
				email
			}
		}
	},
	methods: {
		getValidationClass(fieldName) {
			const field = this.$v.form[fieldName]

			if (field) {
				return {
					'md-invalid': field.$invalid && field.$dirty
				}
			}
		},
		login() {
			this.sending = true
			this.error = false
			this.error_message = ''
			firebaseApp
				.auth()
				.signInWithEmailAndPassword(this.form.email, this.form.password)
				.then(r => {
					this.sending = false
					this.$router.replace('/admin')
				})
				.catch(error => {
					this.sending = false
					this.error = true
					this.error_message = error.message
				})
		},
		resetPassword() {
			this.sending = true
			this.error = false
			this.error_message = ''
			if (this.form.email.length == 0) {
				this.error = true
				this.error_message = 'Please enter email'
			}
			firebaseApp
				.auth()
				.sendPasswordResetEmail(this.form.email)
				.then(function() {
					// this.sending = false
					// this.error = true
					// this.error_message = 'Email sent to: ' + this.form.email
				})
				.catch(error => {
					/**********IS CATCHING ERROR BUT IS WORKING  */
					// this.sending = false
					// this.error = true
					// this.error_message = error.message
					// console.log(error.message)
				})
		},
		validateLogin() {
			this.$v.$touch()

			if (!this.$v.$invalid) {
				this.login()
			}
		}
	}
	// components: {
	//     MdCard: () => import('vue-material/dist/components/').then(({ MdCard }) => MdCard),
	//     MdField: () => import('vue-material/dist/components/').then(({ MdField }) => MdField),
	//     // 'md-card': () => import('vue-material/dist/components/'),
	//     // 'md-field': () => import('vue-material/dist/components/')
	// }
}
</script>

<style lang="scss">
.centered-container {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	height: 100vh;

	.title {
		text-align: center;
		margin-bottom: 15px;
		img {
			margin-bottom: 10px;
			max-width: 130px;
			border-radius: 10px;
			box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2),
				0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
		}
	}
	.actions {
		.md-button {
			margin: 0;
		}
	}
	.form {
		margin-bottom: 60px;
	}
	.md-body-1 {
		font-style: italic;
	}
	.md-content {
		z-index: 1;
		padding: 40px;
		// width: 100%;
		width: 400px;
		max-width: 400px;
		position: relative;
	}
}
</style>