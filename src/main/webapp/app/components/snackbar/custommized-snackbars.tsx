import { Snackbar, withStyles } from '@material-ui/core';
import React from 'react';
import { MySnackbarContentWrapper } from './snackbar';
import { snackbarStore } from 'app/stores/snackbar-store';
import { observer } from 'mobx-react';
import Slide from '@material-ui/core/Slide';

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

interface ICustomizedSnackbarsProps {
  classes: any;
}

@observer
class CustomizedSnackbars extends React.Component<ICustomizedSnackbarsProps> {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    snackbarStore.onSnackbarClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Snackbar
          data-component="vibe-snackbar"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={snackbarStore.isSnackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleClose}
          TransitionComponent={this.SlideTransition}
        >
          <MySnackbarContentWrapper
            variant={snackbarStore.snackbarType}
            className={classes.margin}
            message={snackbarStore.snackbarMessage}
            onClose={this.handleClose}
          />
        </Snackbar>
      </div>
    );
  }

  SlideTransition = props => <Slide {...props} direction="up" />;
}

export const VibeSnackbar = withStyles(styles2)(CustomizedSnackbars);
