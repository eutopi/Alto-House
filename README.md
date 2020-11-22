# alto house

A simple React app that allows the user to filter/sort through songs as well as add them to a playlist.

## Implementation Details

Components are split as follows:
- <b>App</b>: main component that contains the song list with all relevant metainformation in state. Renders a FilteredList.
- <b>FilteredList</b>: component that stores the main functionalities and inherits the song list from App. The state holds the 
`genre`, `length`, `sortFunc`, `playlist`, and `totalTime`. 
