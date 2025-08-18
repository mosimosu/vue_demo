import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  useTodos,
  useAddTodo,
  useEditTodo,
  useDeleteTodo,
  useToggleTodo,
} from '@/api/queries'

export function useTodosComposable() {
  const router = useRouter()
  const nickname = ref('')
  const editFlags = ref({})

  // API hooks
  const { data: todosData, refetch: refetchTodos } = useTodos()
  const { mutate: addTodoMutate } = useAddTodo()
  const { mutate: editTodoMutate } = useEditTodo()
  const { mutate: deleteTodoMutate } = useDeleteTodo()
  const { mutate: toggleTodoMutate } = useToggleTodo()

  // Local editFlag state
  const todosWithEdit = computed(() => {
    if (!todosData.value) return []
    return todosData.value.todos
      .map((t) => ({
        ...t,
        editFlag: !!editFlags.value[t.id],
      }))
      .reverse()
  })

  const setEditFlag = (id, value) => {
    editFlags.value[id] = value
  }

  // Sync nickname from sessionStorage
  onMounted(() => {
    const user = sessionStorage.getItem('user')
    nickname.value = user ? user : ''
  })

  // Delete
  const deleteTodo = (item) => {
    deleteTodoMutate(item, {
      onSuccess: () => {
        refetchTodos()
      },
      onError: () => {
        alert('Unauthorized, please login again')
        setTimeout(() => router.push('/'), 3000)
      },
    })
  }

  // Edit
  const editTodo = (item) => {
    editTodoMutate(item, {
      onSuccess: () => {
        setEditFlag(item.id, false)
        refetchTodos()
      },
      onError: () => {
        alert('Unauthorized, please login again')
        setTimeout(() => router.push('/'), 3000)
      },
    })
  }

  // Finish
  const finished = (item) => {
    toggleTodoMutate(item, {
      onSuccess: () => {
        refetchTodos()
      },
      onError: () => {
        alert('Unauthorized, please login again')
        setTimeout(() => router.push('/'), 3000)
      },
    })
  }

  // Add
  const handleSubmit = (content) => {
    addTodoMutate(
      { content },
      {
        onSuccess: () => refetchTodos(),
        onError: () => {
          alert('Unauthorized, please login again')
          setTimeout(() => router.push('/'), 3000)
        },
      }
    )
  }

  return {
    nickname,
    todosWithEdit,
    setEditFlag,
    deleteTodo,
    editTodo,
    finished,
    handleSubmit,
  }
}
