import { useState, useEffect } from "react"
import { getPublicEntries } from "../services/entriesService"
import { Link } from 'react-router'

function MyEntries() {
    const [entries, setEntries] = useState([])

    async function loadEntries() {
        const response = await getPublicEntries()
        setEntries(response)
    }

    useEffect(()=>{
        loadEntries()
    }, [])
    return (
        <div>
            <h1>Entry List</h1>
            {entries? entries.map(oneEntry=>
            <div key={oneEntry._id}>
                <h3>{oneEntry.title}</h3>
                <p>{oneEntry.entryBody}</p>
                <p>{oneEntry.isPublic}</p>
                <Link to={`entries/${oneEntry._id}`}>See Details</Link>
            </div>) :<h2>No Entries made yet</h2>}
        </div>
    )
}

export default MyEntries