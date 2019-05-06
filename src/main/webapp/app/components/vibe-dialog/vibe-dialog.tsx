import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Zoom, TextField } from '@material-ui/core';
import './vibe-dialog.scss';
import { observer } from 'mobx-react';

interface ISpoccDialogProps {
  title: string;
  isOpen: boolean;
  close: () => void;
  Buttons: JSX.Element;
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
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="dialog-title">{this.props.title}</div>
        <div className="title-divider" />
        <DialogContent className="dialog-content">{this.props.children}</DialogContent>
        <div className="action-divider" />
        <DialogActions>{this.props.Buttons}</DialogActions>
      </Dialog>
    );
  }

  Transition(props) {
    return <Zoom in {...props} />;
  }
}
