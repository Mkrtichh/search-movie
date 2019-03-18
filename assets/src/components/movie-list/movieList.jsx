import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    margin: '0 auto 0 90px',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

class AlignItemsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes, movies} = this.props;
    return (
      <List className={classes.root}>
        {movies.map(movie =>
          <ListItem  key={movie.imdbID} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="No image" src={movie.Poster}/>
            </ListItemAvatar>
            <ListItemText
              primary="Info"
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    {movie.Title }
                  </Typography>
                  { movie.Year}, {movie.Type}
                </React.Fragment>
              }
            />
          </ListItem>
        )}

      </List>
    );
  }
}

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);
