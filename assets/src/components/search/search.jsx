/*import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AlignItemsList from '../movie-list/movieList';

import './search.css';


const styles = theme => ({
  button: {
    width: '100%',
    height: 32,
    marginTop: 20
  },
  input: {
    display: 'none',
  },
  container: {
    width: 300,
    display: 'block',
    margin: '0 auto 0 60px',
    paddingTop: 60,
  },
  textField: {
    display: 'block',
    width: 300,
  },
});


class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      movies: [],
      autofillData: [],
    };
  }
  componentDidMount() {}

  getMovie() {
    if(!this.state.search) return;

    fetch(`/data-autofill?name=${this.state.search}`)
      .then(response =>response.json()).then(data => {
        let movies = JSON.parse(data.body);
        this.setState({ movies: movies.Search });
    });
}

  handleChange (item) {
    this.setState({ search: item.target.value });

    fetch(`/data-autofill?name=${item.target.value}`)
      .then(response => response.json())
      .then(data => {
        let movies = JSON.parse(data.body);
        this.setState({ autofillData:  movies.Search})
      });
  };
  render() {
    const { classes } = this.props;
    const { movies } = this.state;

    return (
      [
        <form className={classes.container} noValidate autoComplete="on">

          <TextField
            id="standard-search"
            label="Find me"
            type="text"
            fullWidth
            onChange={this.handleChange.bind(this)}
            className={classes.textField}
            margin="normal"
          />
          <Button variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={this.getMovie.bind(this)}>
            Search
          </Button>
        </form>,
        <AlignItemsList movies={movies} />
      ]

    );
  }
}

SearchField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchField);*/

import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AlignItemsList from '../movie-list/movieList';
import * as Config from '../../configs';

let suggestions = [];
let movies =[];


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

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
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
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class IntegrationDownshift extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      search: '',
      shareLink: '',
      movies: [],
      suggestions: [],
    };
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
      this.getMovie.bind(this)();
    }
  }

  getMovie () {
    if(!this.state.search) return;

    fetch(`/get-movie?name=${this.state.search}`)
      .then(response =>response.json()).then(data => {
      let moviesjson = JSON.parse(data);
      if (moviesjson.Response && moviesjson.Response === "False") return;

      movies = moviesjson.Search;
      this.setState({ shareLink: `${Config.environmentUrl}/get-movie?name=${this.state.search}`});
      this.setState({ movies: moviesjson.Search });
    });
  }

  handleChange (item) {
    this.setState({ search: item.target.value });
    fetch(`/data-autofill?name=${item.target.value}`)
      .then(response => response.json())
      .then(data => {
        let moviesjson = JSON.parse(data.body);
        if (moviesjson.Response && moviesjson.Response === "False") return;

        suggestions = moviesjson.Search.map((item) => {
          return {
            label: item.Title
          }
        });
        this.setState({ suggestions:  moviesjson.Search})
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form className={classes.container} noValidate autoComplete="on">
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
                  width: 300,
                  classes,
                  InputProps: getInputProps({
                    type: "text",
                    onChange: this.handleChange.bind(this),
                    onKeyPress: this.onKeyPress.bind(this),
                    placeholder: 'Search a movie',
                  }),
                })}
                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getSuggestions(inputValue).map((suggestion, index) =>
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
          <div className={classes.divider} />
          <Button variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.getMovie.bind(this)}>
          Search
        </Button>
        </form>
        <div className={classes.divider} />
        <AlignItemsList movies={movies} />
        <div>
          <div>Copy share link</div>
          <div>{this.state.shareLink}</div>
        </div>
      </div>
    );
  }

}

IntegrationDownshift.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationDownshift);



