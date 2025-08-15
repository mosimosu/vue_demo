// src/api/queries/todos.js
import {useQuery, useMutation, useQueryClient} from '@tanstack/vue-query';
import {getToAPI, postToAPI, putToAPI, patchToAPI, deleteToAPI, apiBatch} from '../apiV2';

// Fetch todos
export function useTodos(options = {}) {
    return useQuery({
        queryKey: ['todos'],
        queryFn: () => getToAPI(apiBatch.getTodos).then(res => res.data),
        ...options,
    });
}

// Add todo
export function useAddTodo(options = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTodo) => postToAPI({url: apiBatch.postTodos, data: {todo: newTodo}}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['todos']}),
        ...options,
    });
}

// Edit todo
export function useEditTodo(options = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo) => putToAPI({url: apiBatch.postTodos, data: {id: todo.id, todo: {content: todo.content}}}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['todos']}),
        ...options,
    });
}

// Delete todo
export function useDeleteTodo(options = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo) => deleteToAPI({url: apiBatch.deleteTodos, data: {id: todo.id}}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['todos']}),
        ...options,
    });
}

// Toggle/finish todo
export function useToggleTodo(options = {}) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo) => patchToAPI({url: apiBatch.postTodos, data: {id: todo.id}}),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['todos']}),
        ...options,
    });
}