import Client from "./api";

export const getAllComments = async () => {
    try {
        const res = await Client.get('/comments')
        return res.data
    } catch (error) {
        throw error
    }
}
export const createComment = async ({ userId, resortId, comment }) => {
    try {
        console.log(`resortId ${resortId}`)
        console.log(`userId ${userId}`)
        console.log(`comment ${comment}`)
        const res = await Client.post(`/comments/addComment`, {
            comment: comment
        })
        return res.data
    } catch (error) {
        throw error
    }
}
