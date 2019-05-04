import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Zoom } from '@material-ui/core';
import './spocc-dialog.scss';
import { observer } from 'mobx-react';

interface ISpoccDialogProps {
  isOpen: boolean;
  close: () => void;
}

@observer
export class SpoccDialog extends React.Component<ISpoccDialogProps> {
  render() {
    console.log('Hello', this.props.isOpen);
    return (
      <div data-component="spocc-dialog">
        <Dialog
          open={this.props.isOpen}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.props.close}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="dialog-title">Title</div>
          <div className="title-divider" />
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <div className="action-divider" />
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Disagree
            </Button>
            <Button onClick={this.props.close} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  Transition(props) {
    return <Zoom in {...props} />;
  }
}
