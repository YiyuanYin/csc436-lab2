import { useContext } from 'react'
import { StateContext } from './contexts'
import { useResource } from 'react-request-hook'

export const useAPI = (url, method) => {
    const { state } = useContext(StateContext)

    const [response, request] = useResource((data) => ({
        url,
        method,
        headers: { Authorization: `${state?.user?.access_token}` },
        data,
    }))

    return [response, request]
}
