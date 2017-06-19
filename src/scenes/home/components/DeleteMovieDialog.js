import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DeleteMovieDialog extends Component {
  render() {
    const deleteDialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.onClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.props.onDelete(this.props.movie)}
      />
    ];

    const dialogTitle = 'Delete Movie';
    const dialogMessage = `Are you sure to delete the movie '${this.props.movie.title}'?`;

    return (
      <Dialog title={dialogTitle}
              actions={deleteDialogActions}
              modal
              open={this.props.isOpen}
              onRequestClose={this.props.onClose}>
        <span>{dialogMessage}</span>
      </Dialog>
    );
  }
}

DeleteMovieDialog.propTypes = {
  movie: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func
};

DeleteMovieDialog.defaultProps = {
  isOpen: false
};

export default DeleteMovieDialog;
