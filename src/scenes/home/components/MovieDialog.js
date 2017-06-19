import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import './MovieDialog.css';

class MovieDialog extends Component {
  constructor(props) {
    super(props);

    this.movie = props.movie;

    this.modalTitle = !!props.movie.title ? 'Edit movie' : 'Add movie';

    this.state = {
      open: props.isOpen,
      title: this.movie.title,
      description: this.movie.description,
      imageData: this.movie.imageData
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.isOpen !== props.isOpen) {
      this.movie = props.movie;

      this.setState({
        open: props.isOpen,
        title: this.movie.title,
        description: this.movie.description,
        imageData: this.movie.imageData
      });
    }
  }

  handleClose = () => {
    this.props.onClose();
  };

  onChangeTitle = event => {
    this.setState({
      title: event.target.value
    });
  };

  onChangeDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  handleImageChange = event => {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imageData: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  handleSubmit = () => {
    const movie = {
      id: this.props.movie.id,
      title: this.state.title,
      description: this.state.description,
      imageData: this.state.imageData
    };

    this.props.onSave(movie);
    this.handleClose();
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <Dialog title={this.modalTitle}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}>

        <div className="movie-text-inputs">
          <img className="movie-image-preview"
               src={this.state.imageData}
               alt={this.props.movie.title}/>
          <input type="file" onChange={this.handleImageChange}/>
        </div>

        <div className="movie-text-inputs">
          <TextField floatingLabelText="Movie title"
                     value={this.state.title}
                     onChange={this.onChangeTitle}/>

          <TextField floatingLabelText="Movie description"
                     value={this.state.description}
                     onChange={this.onChangeDescription}/>
        </div>
      </Dialog>
    );
  }
}

MovieDialog.propTypes = {
  buttonText: PropTypes.string.isRequired,
  movie: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool
};

MovieDialog.defaultProps = {
  movie: {}
};

export default MovieDialog;
