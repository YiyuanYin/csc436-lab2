function todoReducer(lists, action) {
    switch (action.type) {
        case 'CREATE_TODO': {
            return [...lists, action.newTodo]
        }
        case 'TOGGLE_TODO': {
            return lists.map((task) => {
                if (task._id === action.id) {
                    return action.newTodo
                } else {
                    return task
                }
            })
        }
        case 'DELETE_TODO': {
            return lists.filter((task) => task._id !== action.id)
        }
        case 'CLEAR_TODO': {
            return []
        }
        case 'FETCH_TODO': {
            return action.todoList
        }
        default:
            return lists
    }
}

function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                username: action.username,
                access_token: action.access_token,
            }
        case 'REGISTER':
            return {
                username: action.username,
                access_token: action.access_token,
            }
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
