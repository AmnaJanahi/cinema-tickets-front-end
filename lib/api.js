import axios from "axios"
const baseUrl = import.meta.env.VITE_BACKEND_URL

const create = async (data) => {
    try{
        const url = `${baseUrl}/add-booking`
        const response = await axios.post(url, data)
    }catch(error){
        return error
    }
}

export {
    create
}