import { useState, useEffect } from "react"
import { getMyEntries } from "../services/entriesService"
import { Link } from 'react-router'

function MyEntries() {
    const [entries, setEntries] = useState([])

    async function loadEntries() {
        const response = await getMyEntries()
        setEntries(response)
    }

    useEffect(()=>{
        loadEntries()
    }, [])
    return (
        <div>
            <h1>My Entries</h1>
            <Link to={'/entries/create'}>Add Entry</Link>
            {entries? entries.map(oneEntry=>
            <div key={oneEntry._id}>
                <h3>{oneEntry.title}</h3>
                <p>{oneEntry.entryBody}</p>
                <p>{oneEntry.isPublic}</p>
                <Link to={`/entries/${oneEntry._id}`}>See Details</Link>
            </div>) :<h2>No Entries made yet</h2>}
        </div>
    )
}

export default MyEntries