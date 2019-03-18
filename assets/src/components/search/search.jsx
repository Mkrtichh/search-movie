import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AlignItemsList from '../movie-list/movieList';
import * as Config from '../../configs';


function renderSuggestion({ suggestion, index, itemProps, highlightedIndex }) {
  const isHighlighted = highlightedIndex === index;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
    paddingTop: 60,
    margin: '0 auto 0 50px',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    width: '70%'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
    minWidth: 350,

  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  inline: {
    display: 'inline',
  },
  copyLink: {
    marginTop: '10px',
    display: 'inline',
  },
  shareBlock: {
    display: 'inline-grid',
    float: 'right'
  }
});

class IntegrationDownshift extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      search: '',
      shareLink: '',
      toggleShareLink: false,
      movies: [],
      suggestions: [],
    };
    this.getMovie = this.getMovie.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.toggleShareLink = this.toggleShareLink.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  renderInput(inputProps) {

    const { InputProps, classes, ref, ...other } = inputProps;

    return (
          <TextField
            InputProps={{
              inputRef: ref,
              classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
              },
              ...InputProps,
            }}
            {...other}
          />
    );
  }

  onKeyPress (e) {
    if(e.which === 13) {
      this.getMovie();
    }
  }

  getMovie () {
    if(!this.state.search) return;

    fetch(`/movie?name=${this.state.search}`)
      .then(response =>response.json()).then(data => {
      const moviesjson = JSON.parse(data.body);
      if (moviesjson.Response && moviesjson.Response === "False") return;

      this.setState({
        shareLink: `${Config.environmentUrl}/shared-resourse/${this.state.search}`,
        movies: moviesjson.Search
      });
    });
  }

  handleChange (input) {
    this.setState({ search: input.target.value });
    fetch(`/data-autofill?name=${ input.target.value }`)
      .then(response => response.json())
      .then(data => {
        let moviesjson = JSON.parse(data.body);
        if (moviesjson.Response && moviesjson.Response === "False") return;

        const suggestions = moviesjson.Search.map(item => { return {label: item.Title}; });
        this.setState({ suggestions })
      });
  }

  toggleShareLink () {
    this.setState(state => ({ toggleShareLink: !state.toggleShareLink }))
  }

  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const { suggestions } = this.state;
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
  }

  render() {
    const { classes } = this.props;
    const { movies, shareLink, toggleShareLink } = this.state;

    return (
      <div className={classes.root}>
        <form className={classes.container} action="false" noValidate autoComplete="on">
          <div>
            <Downshift id="downshift-simple">
              {({
                  getInputProps,
                  getItemProps,
                  getMenuProps,
                  highlightedIndex,
                  inputValue,
                  isOpen,
                }) => (
                <div className={classes.container}>
                  {this.renderInput({
                    width: 400,
                    classes,
                    InputProps: getInputProps({
                      type: "text",
                      onChange: this.handleChange,
                      onKeyPress: this.onKeyPress,
                      placeholder: 'Search a movie',
                    }),
                  })}
                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <Paper className={classes.paper} square>
                        {this.getSuggestions(inputValue).map((suggestion, index) =>
                          renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.label }),
                            highlightedIndex,
                          }),
                        )}
                      </Paper>
                    ) : null}
                  </div>
                </div>
              )}
            </Downshift>
            <div className={classes.shareBlock}>
              {movies.length > 0 && (
                <Button variant="contained"
                        color="secondary"
                        type="button"
                        className={classes.button}
                        onClick={this.toggleShareLink}>Show sharable link</Button>
              )}
              {movies.length > 0 && toggleShareLink && (
                <Typography component="span" className={classes.copyLink} color="textPrimary">
                  {shareLink }
                </Typography>
              )}
            </div>
          </div>
          <div className={classes.divider} />
          <Button variant="contained"
                color="primary"
                className={classes.button}
                onClick={e => this.getMovie(e)}>
          Search
        </Button>
        </form>
        <div className={classes.divider} />
        <AlignItemsList movies={movies} />
      </div>
    );
  }

}

IntegrationDownshift.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationDownshift);



