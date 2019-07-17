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
import { observable, computed, toJS } from 'mobx';
import { Storage } from 'react-jhipster';
import { AUTH_TOKEN_KEY } from 'app/api/login-api';
import { articleStore } from 'app/stores/article-store';
import { orderBy } from 'lodash';
import Fuse from 'fuse.js';
import { headerStore } from 'app/stores/header-store';

interface ISearchAppBarProps {
  classes: any;
}

@observer
class SearchAppBar extends React.Component<ISearchAppBarProps> {
  @observable
  isMenuOpen = false;

  @observable
  menuAnchorElement: any;

  fuseOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    // Here the parameter to be more or less exigent for the titles
    // Max : 1000 min 0
    distance: 25,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['title']
  };

  @computed
  get fuse() {
    return new Fuse(articleStore.articleList, this.fuseOptions);
  }

  @observable
  articleList = [];

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} data-component="vibe-header">
        <AppBar position="fixed">
          <Toolbar>
            <IconButtonLink link={this.homeLink} buttonClassName={classes.menuButton}>
              <HomeIcon />
            </IconButtonLink>
            {!headerStore.canShowSearchBar && <div className="header-title">{headerStore.headerTitle}</div>}
            {headerStore.canShowSearchBar &&
              userStore.isConnected && (
                <div data-component="search-bar" className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Rechercher..."
                    onChange={this.searchArticle}
                    className="search-input"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                  />
                </div>
              )}
            <div className="after-bar-separator" />
            {userStore.isConnected && (
              <IconButton className="header-account-icon-button" onClick={this.openMenu}>
                <AccountCircleIcon className="header-account-icon" />
                <Menu
                  open={this.isMenuOpen}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem onClick={this.onLogout}>Déconnexion</MenuItem>
                </Menu>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  searchArticle = event => {
    window.scroll(0, 0);
    const results = this.fuse.search(event.target.value);

    // tslint:disable-next-line: prefer-conditional-expression
    if (event.target.value.trim() === '' || event.target.value === undefined) {
      articleStore.searchableArticleList = articleStore.articleList;
    } else {
      articleStore.searchableArticleList = results;
    }
  };

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
