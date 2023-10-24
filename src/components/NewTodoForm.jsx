import React, { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function NewTodoForm({ onSubmit }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');

    const onClickSubmit = useCallback(() => {
        onSubmit({ title, description, complete: false, dateCreated: new Date(), id: uuidv4() })
    }, [description, onSubmit, title])

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="title">title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    id="title"
                />
            </div>
            <div>
                <label htmlFor="description">description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    id="description"
                />
            </div>
            <input
                type="submit"
                value="Submit"
                disabled={!title}
                onClick={onClickSubmit}
            />
        </form>
    )
}
