import React, {useState} from 'react'
import './styles.css'

//GET https://www.googleapis.com/youtube/v3/search
//AIzaSyD7Z9wTocDrH7nP0jIrXRpp1YCGcIiu4j8
const Search = () => {

    const [inputData, setInputData] = useState({
        searchQuery: '',
        searchResults: []
    })

    let videoContainer = document.querySelector('.youtube-container')

    const handleClick = () => {
        fetch("https://www.googleapis.com/youtube/v3/search?port=snippet&key=AIzaSyD7Z9wTocDrH7nP0jIrXRpp1YCGcIiu4j8&type=video&q=ajax")
            .then((results) => {
                return results.json()
            }).then((results) => {
                console.log(results)
                let videoContainer = document.querySelector('.youtube-container')
                for (let i = 0; i < results.length; i++) {
                    setInputData({...inputData, searchResults: results[i].snippet.thumbnails.default.url})

                    console.log('gottem')
                }
        })

    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 offset-1 col-md-6 offset-md-2 mt-3 input-p'>
                    <input className='form-control' type='text' placeholder='Search' onChange={(e) => setInputData({...inputData, searchQuery: e.target.value})}/>
                </div>

                <div className='col-2 col-md-2 mt-3 btn-p'>
                    <button className='btn btn-primary btn-block' onClick={handleClick}>Submit</button>
                </div>
            </div>

            <div className='row'>
                <div className='col-4'>
                    {inputData.searchResults.map((videos) =>
                        videoContainer.innerHTML +=
                        <img src={videos}  alt='hola'/>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Search