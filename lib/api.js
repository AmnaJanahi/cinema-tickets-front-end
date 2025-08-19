import axios from "axios"
const baseUrl = import.meta.env.VITE_BACKEND_URL

const create = async (data) => {
    try{
        const url = `${baseUrl}/booking/add-booking`
        const response = await axios.post(url, data)
        return response
    }catch(error){
        return error
    }
}

const getAllBooking = async () => {
    try {
        const url = `${baseUrl}/booking`
        const response = await axios.get(url)
        return response
    } catch (error) {
        return error
    }
}


const deleteBooking = async (id) => {
    try {
        const url = `${baseUrl}/booking/${id}`
        const response = await axios.delete(url)
        return response
    } catch (error) {
        return error
    }
}

const updateBooking = async (id, data) => {
    try {
        const url = `${baseUrl}/booking/${id}`
        const response = await axios.put(url, data)
        return response
    } catch (error) {
        return error
    }
}

const getAllMovie = async () => {
    try {
        const url = `${baseUrl}/movie`
        const response = await axios.get(url)
        return response
    } catch (error) {
        return error
    }
}


export {
    create,
    deleteBooking,
    updateBooking,
    getAllBooking,
    getAllMovie
}