import React, { useCallback, useState } from 'react'

export default function NewTodoForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })

    const onClickSubmit = useCallback(() => {
        onSubmit({ ...formData, complete: false, dateCreated: new Date() })
    }, [formData, onSubmit])

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <label htmlFor="title">title:</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    id="title"
                />
            </div>
            <div>
                <label htmlFor="description">description:</label>
                <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    id="description"
                />
            </div>
            <input
                type="submit"
                value="Submit"
                disabled={!formData.title}
                onClick={onClickSubmit}
            />
        </form>
    )
}
