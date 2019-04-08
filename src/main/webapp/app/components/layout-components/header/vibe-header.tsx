import { AppBar, IconButton, InputBase, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { headerSearchStyles } from 'app/components/layout-components/header/search-header-jss';
import React from 'react';
import './header.scss';

interface ISearchAppBarProps {
  classes: any;
}

class SearchAppBar extends React.Component<ISearchAppBarProps> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} data-component="vibe-header">
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Vibe
            </Typography>
            <div className="separator" />
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
