<script setup>
defineOptions({ name: 'SignUpPage' })
/**
 * import function
 */
import { useSignUpForm } from './composables/useSignUpForm'

const {
  email,
  password,
  passwordCheck,
  nickname,
  signUpFlag,
  passwordMismatch,
  signUp,
  goLogin,
} = useSignUpForm()
</script>

<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="=12" md="8" lg="8" xl="8">
        <v-card>
          <v-card-title>
            <span class="text-h5">Sign Up</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signUp">
              <v-text-field
                id="nickname"
                v-model="nickname"
                label="Nickname"
                name="nickname"
                outlined
                class="mb-3"
              />
              <v-text-field
                id="email"
                v-model="email"
                label="Email"
                name="email"
                type="email"
                outlined
                class="mb-3"
              />
              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                name="password"
                type="password"
                outlined
                class="mb-3"
              />
              <v-text-field
                id="passwordCheck"
                v-model="passwordCheck"
                label="Password Check"
                name="passwordCheck"
                type="password"
                outlined
                class="mb-3"
                @keyup.enter="signUp"
              />
              <v-row justify="center" align="center">
                <v-col cols="auto">
                  <v-btn color="primary" type="submit" block>Sign Up</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn color="primary" @click="goLogin">Back to Login</v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-alert
              v-show="signUpFlag === 2"
              type="error"
              dismissible
              class="mt-3"
            >
              Your email is already registered. Please try again.
            </v-alert>
            <v-alert
              v-show="signUpFlag === 1"
              type="success"
              dismissible
              class="mt-3"
            >
              Registration successful. Redirecting to user page...
            </v-alert>
            <v-alert
              v-show="passwordMismatch"
              type="error"
              dismissible
              class="mt-3"
            >
              Your passwords do not match. Please try again.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
