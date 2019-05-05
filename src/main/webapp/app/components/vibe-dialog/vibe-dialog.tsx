import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Zoom } from '@material-ui/core';
import './vibe-dialog.scss';
import { observer } from 'mobx-react';

interface ISpoccDialogProps {
  isOpen: boolean;
  close: () => void;
}

@observer
export class VibeDialog extends React.Component<ISpoccDialogProps> {
  render() {
    return (
      <Dialog
        className="vibe-dialog"
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
          <DialogContentText id="alert-dialog-slide-description">Bonjour, je suis le contenu de la Dialog Box</DialogContentText>
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
    );
  }

  Transition(props) {
    return <Zoom in {...props} />;
  }
}
