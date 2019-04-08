import { AppBar, IconButton, InputBase, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { headerSearchStyles } from 'app/components/layout-components/header/search-header-jss';
import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import { IconButtonLink } from 'app/components/icon-button-link/icon-button-link';

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
            <IconButtonLink link="/" buttonClassName={classes.menuButton}>
              <HomeIcon />
            </IconButtonLink>
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
