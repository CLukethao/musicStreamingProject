import React, {Component} from 'react';

let player;

class UTube extends Component {

    componentDidMount() {


        if (!window.YT) {
            console.log('api loaded')
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';


            window.onYouTubeIframeAPIReady = this.loadVideo;

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        } else {

            this.loadVideo();
        }
    };

    pause = () => {
        player.pauseVideo()
    }

    play = () => {
        player.playVideo()
    }

    loadVideo = () => {
        window.YT.ready ( () => {
            player = new window.YT.Player('youtube-player-Avw0_VjiQkY', {
                height: '100',
                width: '100',
                videoId: "Avw0_VjiQkY",
                playerVars: { 'autoplay': 1, 'controls': 0 },
                events: {
                    onReady: this.onPlayerReady,
                },
            });
        })
    };

    onPlayerReady = (event) => {
        console.log('player ready')
    };



    render = () => {
        return (
            <div>
                <div id='youtube-player-Avw0_VjiQkY'>

                </div>
                <button onClick={this.pause}>pause</button>
                <button onClick={this.play}>play</button>
            </div>

        );
    };
}

export default UTube;