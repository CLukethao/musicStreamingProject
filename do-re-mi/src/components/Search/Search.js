import React, {useState} from 'react'
import './styles.css'
import SearchResults from "./SearchResults/SearchResults";



const Search = ({playSong}) => {

    const [inputData, setInputData] = useState({
        searchQuery: '',
        searchResults: [],
    });

    const API_KEY = 'AIzaSyDhjCec7htgsdItR9p2cwpJlduGvouQ9sg'


    const getURL = 'https://www.googleapis.com/youtube/v3/search?key='


    const handleClick = () => {
       videoSearch(inputData.searchQuery)
    }

    const videoSearch = (search) =>   {
        fetch(getURL + API_KEY + '&type=video&part=snippet&maxResults=14' + '&q=' + search)
            .then((results) => {
                return results.json()
            }).then((data) => {
                console.log(data.items)
                setInputData({...inputData, searchResults: data.items})
                console.log("results here " + inputData.searchResults)
        })
    }

    const onResultClick = (e) => {
        playSong(e)
    }



    return (
        <div className='container'>
            <div className='row mb-5'>
                <div className='col-6 offset-1 col-md-6 offset-md-2 mt-3 input-p'>
                    <input className='form-control' type='text' placeholder='Search' value={inputData.searchQuery} onChange={(e) => setInputData({...inputData, searchQuery: e.target.value})}/>
                </div>

                <div className='col-2 col-md-2 mt-3 btn-p'>
                    <button className='btn btn-primary btn-block' onClick={handleClick}>Search</button>
                </div>
            </div>

            <SearchResults videos={inputData.searchResults} onResultClick={onResultClick}/>

            {/*<div className='row'>*/}

            {/*    /!*<div className='col-12 col-md-4'>*!/*/}
            {/*    /!*    <iframe width="50" height="50" src={`https://www.youtube.com/embed/PDeTO26fRVQ?rel=0&showinfo=0&controls=0"frameborder="0"`}*!/*/}
            {/*    /!*            title="YouTube video player" frameBorder="0"*!/*/}
            {/*    /!*    ></iframe>*!/*/}
            {/*    /!*</div>*!/*/}

            {/*    /!*{inputData.searchResults.map((video) =>*!/*/}
            {/*    /!*    <div className='col-12 col-md-4'>*!/*/}
            {/*    /!*        <iframe width="300" height="250" src={`https://www.youtube.com/embed/${video.id.videoId}?rel=0&showinfo=0&controls=0"frameborder="0"`}*!/*/}
            {/*    /!*                title="YouTube video player" frameBorder="0"*!/*/}
            {/*    /!*                ></iframe>*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*)}*!/*/}

            {/*</div>*/}

        </div>
    )
}



export default Search