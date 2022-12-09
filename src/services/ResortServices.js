import Client from './api'

export const GetResorts = async () => {
    try {
        const res = await Client.get('/resorts')
        return res.data
    } catch (error) {
        throw error
    }
}
export const CreateResort = async (data) => {
    try {
        const res = await Client.post(`/resorts/addResort`, data)
        return res.data
    } catch (error) {
        throw error
    }
}

export const UpdateResort = async (id) => {
    try {
        const res = await Client.put(`/resorts/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}


export const DeleteResort = async (id) => {
    try {
        const res = await Client.delete(`/resorts/${id}`)
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