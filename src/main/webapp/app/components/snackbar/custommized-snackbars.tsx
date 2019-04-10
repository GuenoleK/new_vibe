import { Button, Snackbar, withStyles } from '@material-ui/core';
import React from 'react';
import { MySnackbarContentWrapper } from './snackbar';

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

interface ICustomizedSnackbarsProps {
  classes: any;
}

class CustomizedSnackbars extends React.Component<ICustomizedSnackbarsProps> {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button className={classes.margin} onClick={this.handleClick}>
          Open success snackbar
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper variant="error" className={classes.margin} message="This is an error message!" />
        </Snackbar>
        {/* <MySnackbarContentWrapper
            variant="error"
            className={classes.margin}
            message="This is an error message!"
          />
          <MySnackbarContentWrapper
            variant="warning"
            className={classes.margin}
            message="This is a warning message!"
          />
          <MySnackbarContentWrapper
            variant="info"
            className={classes.margin}
            message="This is an information message!"
          />
          <MySnackbarContentWrapper
            variant="success"
            className={classes.margin}
            message="This is a success message!"
          /> */}
      </div>
    );
  }
}

export default withStyles(styles2)(CustomizedSnackbars);
