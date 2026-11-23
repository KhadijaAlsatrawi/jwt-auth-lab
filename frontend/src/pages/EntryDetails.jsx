import { Link, useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { deleteEntry, getEntryById } from "../services/entriesService"
import { useAuth } from "../context/AuthContext"

function EntryDetails() {
    const [entry, setEntry] = useState(null)
    const { entryId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    async function loadEntry() {
        const response = await getEntryById(entryId)
        setEntry(response)
    }

    useEffect(() => {
        loadEntry()
    }, [])

    async function handleDelete() {
        const response = await deleteEntry(entryId)
        navigate('/entries/my-entries')
    }

    return (
        <div>
            <h1>Entry Details</h1>
            {entry ? <div>
                <h2>{entry.title}</h2>
                <p>{entry.entryBody}</p>
                {entry.isPublic ? <p>entry is public</p> : <p>entry is private</p>}
                {String(entry.owner) === String(user._id) ? <div>
                    <Link to={`/entries/${entry._id}/update`}>Update</Link>
                    <button onClick={handleDelete}>Delete Entry</button>
                </div>
                    : null}
            </div>
                : <h2>No Entry Found</h2>}
        </div>
    )
}

export default EntryDetails