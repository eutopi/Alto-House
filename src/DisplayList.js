import React from 'react'
import ReactDOM from 'react-dom'
import './displaylist.css'
import MediaCard from './MediaCard'

class DisplayList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="list">
                {this.props.list.map(
                    song => 
                    <div className="card-padding">
                        <MediaCard key={song}
                        name={song.name} 
                        artist={song.artist} 
                        duration={song.duration}
                        genre={song.genre}
                        art={song.artUrl}
                        video={song.videoUrl}
                        addSong={this.props.addSong}></MediaCard>
                    </div>
                )}
            </div>
        )
    }
}

export default DisplayList