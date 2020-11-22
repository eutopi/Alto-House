import React from 'react'
import ReactDOM from 'react-dom'
import Nav from 'react-bootstrap/Nav'
import './filteredlist.css'
import DisplayList from './DisplayList'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Aggregator from './Aggregator'

const lengths = ["All", "Short", "Medium", "Long"]
const genres = ["All", "Alternative/Indie", "Synth Pop", "Acoustic"]

/**
 * Stores the main functionalities of the site, inclduing filtering and sorting 
 * through the list of songs.
 */
class FilteredList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            genre: "All",
            length: "All",
            sortFunc: "Default",
            playlist: [],
            totalTime: 0
        }
    }

    /**
     * Changes the stored state of genre when the corresponding link is selected.
     * @param {string} event
     */
    onSelectFilterGenre = event => {
        this.setState({
            genre: event
        })
    }

    /**
     * Changes the stored state of length when the corresponding link is selected.
     * @param {string} event
     */
    onSelectFilterLength = event => {
        this.setState({
            length: event
        })
    }

    /**
     * Changes the function to sort by when the dropdown menu is changed.
     * @param event
     */
    handleChange = event => {
        this.setState({sortFunc: event.target.value})
    }

    /**
     * Returns whether the song genre matches the currently selected genre.
     * @param song
     */
    matchesFilterGenre = song => {
        if (this.state.genre === "All") { 
            return true
        } else if (this.state.genre === song.genre) {
            return true
        } else {
            return false
        }
    }

    /**
     * Returns whether the song length matches the currently selected length.
     * @param song
     */
    matchesFilterLength = song => {
        if (this.state.length === "All") {
            return true
        } else if (this.state.length === this.getDuration(song)) {
            return true
        } else {
            return false
        }
    }

    /**
     * Returns a categorical description of song duration based on its numerical value.
     * @param song
     */
    getDuration = song => {
        if (song.duration > 300) {
            return "Long"
        } else if (song.duration <= 300 && song.duration > 200) {
            return "Medium"
        } else {
            return "Short"
        }
    }

    /**
     * Returns 0 if a=b, -1 if a<b, and 1 if b>a
     * @param a
     * @param b
     */
    compareSortFunc = (a, b) => {
        if (this.state.sortFunc === "Default") {
            return 0
        } else if (this.state.sortFunc === "A to Z") {
            return a.name.localeCompare(b.name)
        } else {
            return b.name.localeCompare(a.name)
        }
    }
    
    /**
     * Adds the song name to the playlist
     * @param {string} songname
     */
    addToPlaylist = songName => {
        for (var i = 0; i < this.props.list.length; i++) {
            if (this.props.list[i]["name"] === songName) {
                this.setState({totalTime: this.state.totalTime + this.props.list[i]["duration"]})
            }
        }
        this.setState({playlist: [...this.state.playlist, songName]})
    }

    /**
     * Removes the song name with the corresponding index from the playlist
     * @param {number} index
     */
    removeFromPlaylist = index => {
        var l = this.state.playlist
        var songName = l.splice(index, 1)[0]
        this.setState({playlist: l})
        for (var i = 0; i < this.props.list.length; i++) {
            if (this.props.list[i]["name"] === songName) {
                this.setState({totalTime: this.state.totalTime - this.props.list[i]["duration"]})
            }
        }
    }
    
    render() {
        return(
            <div className="container">
          <div className="playlist-padding">
            <Aggregator songs={this.state.playlist} totalTime={this.state.totalTime} 
                        addSong={this.addToPlaylist} removeSong={this.removeFromPlaylist}/>
          </div>
          <div>
                <div className="header-padding">
                    <div className="header">
                        <div className="header-row">
                            <Nav.Item className="header-item">Genres:</Nav.Item>
                            {genres.map(
                                    (g) => <Nav.Item key={g} className="header-item"><Nav.Link className={(this.state.genre === g ? 'header-selected' : 'header-link')} 
                                    eventKey={g} onSelect={this.onSelectFilterGenre}>{g}</Nav.Link></Nav.Item>
                                )
                            }
                        </div>
                        <div className="header-row">
                            <Nav.Item className="header-item">Lengths:</Nav.Item>
                            {lengths.map(
                                    (l) => <Nav.Item key={l} className="header-item"><Nav.Link className={(this.state.length === l ? 'header-selected' : 'header-link')} 
                                    eventKey={l} onSelect={this.onSelectFilterLength}>{l}</Nav.Link></Nav.Item>
                                )
                            }
                        </div>
                        <div className="header-row">
                            <Nav.Item className="header-item">Sort alphabetically:</Nav.Item>
                            <FormControl color="secondary">
                                <Select
                                value={this.state.sortFunc}
                                onChange={this.handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label'}}>
                                <MenuItem value="Default">Default</MenuItem>
                                <MenuItem value={"A to Z"}>A to Z</MenuItem>
                                <MenuItem value={"Z to A"}>Z to A</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <DisplayList list={((this.props.list.filter(this.matchesFilterGenre)).filter(this.matchesFilterLength)).sort(this.compareSortFunc)}
                addSong={this.addToPlaylist}/>
            </div>
        </div>
        )
    }
}

export default FilteredList