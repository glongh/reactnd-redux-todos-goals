import API from 'goals-todos-api'

export const ADD_GOAL = 'ADD_GOAL'
export const REMOVE_GOAL = 'REMOVE_GOAL'

function addGoal(goal) {
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoal(id) {
    return {
        type: REMOVE_GOAL,
        id,
    }
}

export function handleAddGoal(name, cb) {
    return (dispath) => {
        return API.saveGoal(name)
            .then((goal) => {
                dispath(addGoal(goal))
                cb()
            })
            .catch(() => alert('There was an error. Try again.'))
    }
}

export function handleDeleteGoal(goal) {
    return (dispath) => {
        dispath(removeGoal(goal.id))

        return API.removeGoal(goal.id)
            .catch(() => {
                dispath(addGoal(goal))
                alert('An error occurred. Try again.')
            })
    
    }
}