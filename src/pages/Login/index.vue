<script setup>
defineOptions({ name: 'LoginPage' })
/**
 * import function
 */
import { useLoginForm } from './composables/useLoginForm'

const {
  email,
  password,
  loginFail,
  passwordInput,
  focusPassword,
  login,
  goSignup,
} = useLoginForm()
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <v-card>
          <v-card-title>
            <span class="text-h5">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                id="email"
                v-model="email"
                label="Email"
                type="text"
                name="email"
                @keyup.enter="focusPassword"
              />
              <v-text-field
                id="password"
                ref="passwordInput"
                v-model="password"
                label="Password"
                type="password"
                name="password"
                @keyup.enter="login"
              />
              <v-spacer />
              <v-row align="center" justify="center">
                <v-col cols="auto">
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-col>
                <v-col cols="auto">
                  <v-btn color="secondary" type="button" @click="goSignup"
                    >Sign Up</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
            <v-alert v-show="loginFail" type="error" dismissible class="mt-3">
              登入失敗，請重新登入
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
