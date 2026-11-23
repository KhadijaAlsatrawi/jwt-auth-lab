import { Link, useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { getEntryById, updateEntry } from "../services/entriesService"

function UpdateEntry() {
    const { entryId } = useParams()
    const [formData, setFormData] = useState({
        title: '',
        entryBody: '',
        isPublic: false
    })
    const navigate = useNavigate()

    async function loadEntry() {
        const response = await getEntryById(entryId)
        setFormData(response)
    }

    useEffect(() => {
        loadEntry()
    }, [])

    function handleChange(event) {
        const { name, type, value, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const response = await updateEntry(entryId, formData)
        navigate('/entries/my-entries')
    }

    return (
        <div>
            <h1>UpdateEntry</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label htmlFor="entryBody">Body: </label>
                <input
                    type="text"
                    name="entryBody"
                    id="entryBody"
                    value={formData.entryBody}
                    onChange={handleChange}
                />

                <label htmlFor="isPublic">isPublic: </label>
                <input
                    type="checkbox"
                    name="isPublic"
                    id="isPublic"
                    value={formData.isPublic}
                    onChange={handleChange}
                />

                <button>Update Enrty</button>
            </form>
        </div>
    )
}

export default UpdateEntry