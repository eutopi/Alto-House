import React from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import FilteredList from './FilteredList'
import SpaceSongArt from "./img/spacesong.jpg"
import MyJinjiArt from "./img/myjinji.jpg"
import NobodyArt from "./img/mitski.jpg"
import PizzaArt from "./img/pizza.jpg"
import BoatsBirdsArt from "./img/boatsbirds.jpg"
import RiverRoadsArt from "./img/riversroads.jpg"
import NightTimeArt from "./img/nightime.png"
import BeachFossilsArt from "./img/beachfossils.jpg"
import SufjanArt from "./img/sufjanstevens.jpg"
import AlvvaysArt from "./img/alvvays.jpg"
import MellowFellowArt from "./img/mellowfellow.jpg"
import AdibSinArt from "./img/adibsin.jpg"

/**
 * Main component.
 */
class App extends React.Component {

  constructor(props) {
    super(props)
    /** State contains all the songs to be displayed */
    this.state = {
      songs: [
        {name: "Space Song", artist: "Beach House", duration: 320, genre: "Alternative/Indie", artUrl: SpaceSongArt, videoUrl: "https://youtu.be/RBtlPT23PTM"},
        {name: "My Jinji", artist: "Sunset Rollercoaster", duration: 400, genre: "Alternative/Indie", artUrl: MyJinjiArt, videoUrl: "https://youtu.be/CbwYZCga50U"},
        {name: "Dreams Tonite", artist: "Alvvays", duration: 208, genre: "Alternative/Indie", artUrl: AlvvaysArt, videoUrl: "https://youtu.be/ZXu6q-6JKjA"},
        {name: "Night Time", artist: "The fin.", duration: 244, genre: "Synth Pop", artUrl: NightTimeArt, videoUrl: "https://youtu.be/9EtEFFg3iwo"},
        {name: "Pizza", artist: "Oohyo", duration: 212, genre: "Synth Pop", artUrl: PizzaArt, videoUrl: "https://youtu.be/tvUMCOWrTgA"},
        {name: "Boats & Birds", artist: "Gregory and the Hawk", duration: 170, genre: "Acoustic", artUrl: BoatsBirdsArt, videoUrl: "https://youtu.be/hn4EIv1-uz0"},
        {name: "Rivers & Roads", artist: "The Head and the Heart", duration: 404, genre: "Acoustic", artUrl: RiverRoadsArt, videoUrl: "https://youtu.be/MmW3hF-iKg8"},
        {name: "Nobody", artist: "Mitski", duration: 193, genre: "Alternative/Indie", artUrl: NobodyArt, videoUrl: "https://youtu.be/qooWnw5rEcI"},
        {name: "Down the Line", artist: "Beach Fossils", duration: 158, genre: "Alternative/Indie", artUrl: BeachFossilsArt, videoUrl: "https://youtu.be/zdfjCivNxGY"},
        {name: "Fourth of July", artist: "Sufjan Stevens", duration: 240, genre: "Acoustic", artUrl: SufjanArt, videoUrl: "https://youtu.be/JTeKpWp8Psw"},
        {name: "Dancing", artist: "Mellow Fellow", duration: 401, genre: "Alternative/Indie", artUrl: MellowFellowArt, videoUrl: "https://youtu.be/Ew6-ZsLToIg"},
        {name: "From Here", artist: "Adib Sin", duration: 206, genre: "Synth Pop", artUrl: AdibSinArt, videoUrl: "https://youtu.be/MQPUF4Wh3_w"}
      ]
    }
  }

  render() {
    return (
      <div className="main">
        <h1>alto house ♫♪</h1>
        <FilteredList list={this.state.songs}/>
      </div>
    )
  }
}

export default App