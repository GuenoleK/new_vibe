import { AppBar, IconButton, InputBase, Toolbar, Typography, Menu, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { headerSearchStyles } from 'app/components/layout-components/header/search-header-jss';
import React from 'react';
import './header.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IconButtonLink } from 'app/components/icon-button-link/icon-button-link';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Storage } from 'react-jhipster';
import { AUTH_TOKEN_KEY } from 'app/api/api';

interface ISearchAppBarProps {
  classes: any;
}

@observer
class SearchAppBar extends React.Component<ISearchAppBarProps> {
  @observable
  isMenuOpen = false;
  @observable
  menuAnchorElement: any;

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} data-component="vibe-header">
        <AppBar position="static">
          <Toolbar>
            <IconButtonLink link={this.homeLink} buttonClassName={classes.menuButton}>
              <HomeIcon />
            </IconButtonLink>
            <Typography className={`${classes.title} vibe-title`} variant="h6" color="inherit" noWrap>
              Vibe
            </Typography>
            <div data-component="search-bar" className={classes.search}>
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
            <div className="after-bar-separator" />
            {userStore.isConnected && (
              <IconButton className="header-account-icon-button" onClick={this.openMenu}>
                <AccountCircleIcon className="header-account-icon" />
                <Menu open={this.isMenuOpen} anchorEl={this.menuAnchorElement}>
                  <MenuItem onClick={this.onLogout}>Logout</MenuItem>
                </Menu>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  onLogout() {
    if (Storage.local.get(AUTH_TOKEN_KEY)) {
      Storage.local.remove(AUTH_TOKEN_KEY);
    }

    if (Storage.session.get(AUTH_TOKEN_KEY)) {
      Storage.session.remove(AUTH_TOKEN_KEY);
    }

    window.location.reload();
  }

  openMenu = event => {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuAnchorElement = event.currentTarget;
  };

  get homeLink() {
    if (userStore.isConnected) {
      return '/article-list';
    }
    return '/';
  }
}

export const VibeHeader = withStyles(headerSearchStyles)(SearchAppBar);
