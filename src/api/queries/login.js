// src/api/queries/login.js
import {useMutation} from '@tanstack/vue-query';
import {postToAPI, getToAPI, apiBatch} from '../apiV2';

// Login hook
export function useLogin(options = {}) {
    return useMutation({
        mutationFn: (loginData) =>
            postToAPI({url: apiBatch.login, data: loginData}),
        ...options,
    });
}

// SignUp hook
export function useSignUp(options = {}) {
    return useMutation({
        mutationFn: (signUpData) =>
            postToAPI({url: apiBatch.signUp, data: signUpData}),
        ...options,
    });
}

// Check hook
export function useCheck(options = {}) {
    return useMutation({
        mutationFn: () => getToAPI(apiBatch.check),
        ...options,
    });
}