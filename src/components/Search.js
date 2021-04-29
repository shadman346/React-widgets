import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState("programming")
    const [results, setResults] = useState([])
    //this debounceTerm store the state after timout break and search results on its change
    //because if term goes like this (item -> ite -> item) very fast it still consider it 
    //as state change. but by storing the it in debounce we can avoid this and also escape initial double
    //request because or result.length usage.
    const [debounceTerm, setDebounceTerm] = useState(term)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceTerm(term);
        },700)
        return () => {
            clearTimeout(timeoutId);
        }
    }, [term])

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debounceTerm
                }
            })
            setResults(data.query.search);
        }
        if(debounceTerm) {
            search();
        } else {
            setResults([]);
        }
           
    }, [debounceTerm])

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

//but by using debouncing we are avoiding multiple searches for same string
// if it lies in same timeout period and also if someone wants the default 
//string they could make it more optimal by using this method. 
//you are having same experience in lesser cost and that's why we opt for this.