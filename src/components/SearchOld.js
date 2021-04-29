import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState("")
    const [results, setResults] = useState([])
    console.log(term)
    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            })
            setResults(data.query.search);
        }
        const timeoutId = setTimeout(() => {
            if (term) {
                search();
            } else {
                setResults([])
            }
        }, 500)
        //console.log(results.length)
        //useEffecthook run before useEffect when rerender except first render.
        return () => {
            clearTimeout(timeoutId);
        }
    }, [term])
    // }, [term, results.length])

    const renderResult = results.map(result => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }} />
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Filed..</label>
                    <input type="text"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="ui celled list">
                {renderResult}
            </div>
        </div>
    )
}

export default Search;