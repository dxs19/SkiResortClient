import Client from "./api";

export const getAllComments = async () => {
    try {
        const res = await Client.get('/comments')
        return res.data
    } catch (error) {
        throw error
    }
}