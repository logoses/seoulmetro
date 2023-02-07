import axios from "axios"

const HOST = "http://localhost:4000";

const defaultInstance = axios.create({
    baseURL: `${HOST}`
})

export const metroApi = {
    upload: () => {
        defaultInstance({
            method: "get",
            url: "/select",
        })
    }
}