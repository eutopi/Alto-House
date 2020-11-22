# alto house

A simple React app that allows the user to filter/sort through songs as well as add them to a playlist.

## Implementation Details

Components are split as follows:
- <b>App</b>: main component that contains the song list with all relevant metainformation in state. Renders a FilteredList.
- <b>FilteredList</b>: component that stores the main functionalities and inherits the song list from App. The state holds the 
  - `genre`{string}: genre of the song, modified by `onSelectFilterGenre` 
  - `length`{string}: categorical length of the song, modified by `onSelectFilterLength` 
  - `sortFunc`{string}: sort function (A->Z or Z->A alphabetically), modified by `handleChange`
  - `playlist`{list}: contains a list of songs stored in the aggregator, modified by `addToPlaylist` and `removeFromPlaylist`
  - `totalTime`{number}: total time it takes to play all the songs in the playlist, updated automatically by `addToPlaylist` and `removeFromPlaylist`
- <b>DisplayList</b>: component that displays the FilteredList by mapping a MediaCard component over each element, inherits the song
list and two methods `addToPlaylist` and `removeFromPlaylist`from FilteredList.
- <b>MediaCard</b>: component that uses Material UI to prettify each song item, inherits the song name, artist, duration, album art, video
link, and `addToPlaylist` method all from DisplayList
- <b>Aggregator</b>: contains the playlist, inherits the list contains songs in the playlist as well as methods `addToPlaylist` and `removeFromPlaylist`
from FilteredList
