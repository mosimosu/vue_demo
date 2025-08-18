// src/api/queries/todos.js
import {useQuery, useMutation, useQueryClient} from '@tanstack/vue-query';
import {getToAPI, postToAPI, putToAPI, patchToAPI, deleteToAPI, apiBatch} from '../apiV2';

// Fetch todos
export const useTodos = (options = {}) => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: () => getToAPI(apiBatch.getTodos).then(res => res.data),
        ...options,
    });
}

// Add
export const useAddTodo = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTodo) => postToAPI({url: apiBatch.postTodos, data: {todo: newTodo}}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['todos']}),
        ...options,
    });
}

// Edit
export const useEditTodo = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo) => putToAPI({url: apiBatch.postTodos, data: {id: todo.id, todo: {content: todo.content}}}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['todos']}),
        ...options,
    });
}

// Delete
export const useDeleteTodo = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo) => deleteToAPI({url: apiBatch.deleteTodos, data: {id: todo.id}}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['todos']}),
        ...options,
    });
}

// Toggle/finish
export const useToggleTodo = (options = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo) => patchToAPI({url: apiBatch.postTodos, data: {id: todo.id}}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['todos']}),
        ...options,
    });
}