import Client from './api'

export const GetResorts = async () => {
    try {
        const res = await Client.get('/resorts')
        return res.data
    } catch (error) {
        throw error
    }
}

export const GetResortsById = async (id) => {
    try {
        const res = await Client.get(`/resorts/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}