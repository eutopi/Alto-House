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

    onSelectFilterGenre = event => {
        this.setState({
            genre: event
        })
    }

    onSelectFilterLength = event => {
        this.setState({
            length: event
        })
    }

    handleChange = event => {
        this.setState({sortFunc: event.target.value})
    }

    matchesFilterGenre = song => {
        if (this.state.genre === "All") { 
            return true
        } else if (this.state.genre === song.genre) {
            return true
        } else {
            return false
        }
    }

    matchesFilterLength = song => {
        if (this.state.length === "All") {
            return true
        } else if (this.state.length === this.getDuration(song)) {
            return true
        } else {
            return false
        }
    }

    getDuration = song => {
        if (song.duration > 300) {
            return "Long"
        } else if (song.duration <= 300 && song.duration > 200) {
            return "Medium"
        } else {
            return "Short"
        }
    }

    compareSortFunc = (a, b) => {
        if (this.state.sortFunc === "Default") {
            return 0
        } else if (this.state.sortFunc === "A to Z") {
            return a.name.localeCompare(b.name)
        } else {
            return b.name.localeCompare(a.name)
        }
    }
    
    addToPlaylist = songName => {
        for (var i = 0; i < this.props.list.length; i++) {
            if (this.props.list[i]["name"] === songName) {
                this.setState({totalTime: this.state.totalTime + this.props.list[i]["duration"]})
            }
        }
        this.setState({playlist: [...this.state.playlist, songName]})
    }

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