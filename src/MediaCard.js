import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./mediacard.css"

/**
 * Pretty implementation of a single song item using components from Material UI
 */
class MediaCard extends React.Component {

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

    /**
     * Returns a categorical description of song duration based on its numerical value.
     * @param song
     */
    getDuration = duration => {
        if (duration > 300) {
            return "Long"
        } else if (duration <= 300 && duration > 200) {
            return "Medium"
        } else {
            return "Short"
        }
    }

    render() {
        return (
            <Card className="card">
                <CardActionArea onClick={()=>window.open(this.props.video, "_blank")}>
                    <CardMedia
                    component="img"
                    alt={this.props.name + " album cover"} 
                    height="140"
                    image={this.props.art}
                    title={this.props.name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {this.props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.artist}<br></br>
                        {this.convertSecsToMins(this.props.duration) + " (" + this.getDuration(this.props.duration) + ")"}<br></br>
                        {this.props.genre}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="secondary" onClick={() => this.props.addSong(this.props.name)}>
                    add
                    </Button>
                </CardActions>
                </Card>
        )
    }

}

export default MediaCard