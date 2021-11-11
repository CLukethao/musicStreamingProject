import React, {Component} from 'react';



class UTube extends Component {

    componentDidMount = () => {


        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';


            window.onYouTubeIframeAPIReady = this.loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        } else {
            this.loadVideo();
        }
    };

    onClick = () => {
        this.player.pauseVideo()
    }

    loadVideo = () => {

        this.player = new window.YT.Player('youtube-player-Avw0_VjiQkY', {
            videoId: "Avw0_VjiQkY",
            playerVars: { 'autoplay': 1, 'controls': 0 },
            events: {
                onReady: this.onPlayerReady,

            },
        });
    };

    onPlayerReady = (event) => {
        console.log('player ready')
    };



    render = () => {
        return (
            <div>
                <div id='youtube-player-Avw0_VjiQkY'>

                </div>
                <button onClick={this.onClick}>hello</button>
            </div>

        );
    };
}

export default UTube;