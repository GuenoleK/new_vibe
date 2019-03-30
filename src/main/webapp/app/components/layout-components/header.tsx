import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';
// tslint:disable-next-line:no-submodule-imports
import { withStyles } from '@material-ui/core/styles';
// tslint:disable-next-line:no-submodule-imports
import MenuIcon from '@material-ui/icons/Menu';
// tslint:disable-next-line:no-submodule-imports
import SearchIcon from '@material-ui/icons/Search';
import { headerSearchStyles } from 'app/components/search-header-jss';

interface ISearchAppBarProps {
  classes: any;
}

class SearchAppBar extends React.Component<ISearchAppBarProps> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Vibe
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export const VibeHeader = withStyles(headerSearchStyles)(SearchAppBar);
