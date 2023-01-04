import React, { useEffect } from "react"
import axios from "axios"
const App = () => {
    useEffect(() => {
        const fetchData = async () => {
            const getProfile = await axios.get("/generate-keys").catch(err => err.response)
            if (getProfile.status === 200) {
                console.log(getProfile.data)
            }
        }
        fetchData()
    }, [])
    return (
        <>
            <h1>Witamy w Stronach Notatkach </h1>
        </>
    )
}
export default App