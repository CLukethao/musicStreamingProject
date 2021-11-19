import React, {useState, useEffect} from 'react'
import './styles.css'
import SearchResults from "./SearchResults/SearchResults";
import UTube from "../Player/useYoutube/mock";
import UseYoutube from "../Player/useYoutube/UseYoutube";

const Search = ({selectedSong}) => {

    const [inputData, setInputData] = useState({
        searchQuery: '',
        searchResults: [],
    });

    // const API_KEY = 'AIzaSyDhjCec7htgsdItR9p2cwpJlduGvouQ9sg'
    const API_KEY = 'AIzaSyDlnn9kjXhP8g6mrWbHZev0fivwxJQlOSA'


    const getURL = 'https://www.googleapis.com/youtube/v3/search?key='

    const handleClick = () => {
       videoSearch(inputData.searchQuery)
    }

    // useEffect(() => {
    //     if (!window.YT) {
    //         const tag = document.createElement('script');
    //         tag.src = 'https://www.youtube.com/iframe_api';
    //         const firstScriptTag = document.getElementsByTagName('script')[0];
    //         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //
    //     }
    //
    // }, []);


    const videoSearch = (search) =>   {
        fetch(getURL + API_KEY + '&type=video&part=snippet&maxResults=14' + '&q=' + search)
            .then((results) => {
                return results.json()
            }).then((data) => {
                console.log(data.items)
                setInputData({...inputData, searchResults: data.items})
        })
    }

    const selectSong = (e) => {
        selectedSong(e)
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

            <SearchResults videos={inputData.searchResults} selectSong={selectSong}/>

            {/*<UTube />*/}
            {/*<UseYoutube />*/}

        </div>
    )
}



export default Search