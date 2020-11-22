import React from 'react'
import ReactDOM from 'react-dom'
import "./aggregator.css"
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

/**
 * Aggregator that stores all songs in a playlist. Clicking on appropriate buttons
 * removes/adds songs to the playlist.
 */
class Aggregator extends React.Component {
    constructor(props) {
        super(props)
    }

    /**
     * Converts the number of seconds (number) to minutes and seconds (string: mm:ss)
     * @param {number} duration
     */
    convertSecsToMins = duration => {
        var min = Math.floor(duration / 60)
        var sec = duration % 60
        if (sec % 10 === sec) {
            sec = "0" + sec.toString()
        }
        return min.toString() + ":" + sec.toString()
    }

    render() {
        return (
            <div className="playlist">
                <div className="title">playlist</div>
                    <div className="playlist-wrapper">
                        {this.props.songs.map((song, index) =>
                            <ListItem>
                                <ListItemText primary={song} />
                                <ListItemIcon>
                                    <AddIcon className="icon-btn" onClick={() => this.props.addSong(song)}
                                    style={{ color: "white" }}/>
                                    <DeleteForeverIcon className="icon-btn" 
                                    color="secondary" onClick={() => this.props.removeSong(index)}/>
                                </ListItemIcon>
                            </ListItem>
                        )}
                    </div>
                <span className="title">total time:</span> {this.convertSecsToMins(this.props.totalTime)}
            </div>
        )
    }
}

export default Aggregator