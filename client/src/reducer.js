import { initialToDoLists } from './constant'

function todoReducer(lists, action) {
    switch (action.type) {
        case 'CREATE_TODO': {
            return [...lists, action.newTodo]
        }
        case 'TOGGLE_TODO': {
            return lists.map((task) => {
                if (task.id === action.id) {
                    return {
                        ...task,
                        complete: !task.complete,
                        dateCompleted: task.complete ? null : new Date(),
                    }
                } else {
                    return task
                }
            })
        }
        case 'DELETE_TODO': {
            return lists.filter((task) => task.id !== action.id)
        }
        case 'CLEAR_TODO': {
            return initialToDoLists
        }
        default:
            return lists
    }
}

function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return action.email
        case 'REGISTER':
            return action.email
        case 'LOGOUT':
            return ''
        default:
            return state
    }
}

export function appReducer(state, action) {
    return {
        user: userReducer(state.user, action),
        todoList: todoReducer(state.todoList, action),
    }
}
