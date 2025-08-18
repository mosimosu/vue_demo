// src/api/queries/login.js
import {useMutation} from '@tanstack/vue-query';
import {postToAPI, getToAPI, apiBatch} from '../apiV2';

// Login hook
export const useLogin = (options = {}) => {
    return useMutation({
        mutationFn: (loginData) =>
            postToAPI({url: apiBatch.login, data: loginData}),
        ...options,
    });
}

// SignUp hook
export const useSignUp = (options = {}) => {
    return useMutation({
        mutationFn: (signUpData) =>
            postToAPI({url: apiBatch.signUp, data: signUpData}),
        ...options,
    });
}

// Check hook
export const useCheck = (options = {}) => {
    return useMutation({
        mutationFn: () => getToAPI(apiBatch.check),
        ...options,
    });
}