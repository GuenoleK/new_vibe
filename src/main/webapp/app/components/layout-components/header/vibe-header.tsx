import { AppBar, IconButton, InputBase, Toolbar, Menu, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
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
import { AUTH_TOKEN_KEY, loginApi } from 'app/api/login-api';
import { articleStore } from 'app/stores/article-store';
import { headerStore } from 'app/stores/header-store';
import { translationUtil } from 'app/translation/translation-util';
import { LanguageEnum } from 'app/enums/LanguageEnum';
import { userRoleStructureApi } from 'app/api/user-role-structure-api';
import { IStructure } from 'app/shared/model/structure.model';
import { IUserRoleStructure } from 'app/shared/model/user-role-structure.model';

interface ISearchAppBarProps {
  classes: any;
}

@observer
class SearchAppBar extends React.Component<ISearchAppBarProps> {
  @observable
  isMenuOpen = false;

  @observable
  isLanguageMenuOpen = false;

  @observable
  accountMenuAnchorElement: any;

  @observable
  languageMenuAnchorElement: any;

  @observable
  articleList = [];

  @observable
  structureList: IStructure[] = [];

  componentDidMount() {
    userRoleStructureApi.getUserRoleStructureListByUserId(userStore.user.id).then((userRoleStructureList: IUserRoleStructure[]) => {
      this.structureList = userRoleStructureList.map(urs => urs.structure);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} data-component="vibe-header">
        <AppBar position="fixed">
          <Toolbar>
            <IconButtonLink link={this.homeLink} buttonClassName={classes.menuButton}>
              <HomeIcon />
            </IconButtonLink>
            {!headerStore.canShowSearchBar && (
              <div className="title-description-zone">
                <div className="header-title">{headerStore.headerTitle}</div>
                {articleStore.article &&
                  articleStore.article.description && <div className="header-description">{articleStore.article.description}</div>}
              </div>
            )}
            {headerStore.canShowSearchBar &&
              userStore.isConnected && (
                <div data-component="search-bar" className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder={translationUtil.translate('header.searchBar.placeholder')}
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
            {userStore.isConnected &&
              this.structureList.length > 0 && (
                <IconButton className="header-language-icon-button" onClick={this.openLanguageMenu}>
                  <BusinessIcon className="header-language-icon" />
                  <Menu
                    className="language-menu"
                    open={this.isLanguageMenuOpen}
                    anchorEl={this.languageMenuAnchorElement}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                  >
                    {this.structureList.map(structure => (
                      <MenuItem
                        disabled={userStore.extendedUser.currentStructure.name === structure.name}
                        onClick={userStore.changeCurrentStructure.bind(this, toJS(structure))}
                        value={structure.id}
                      >
                        {structure.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </IconButton>
              )}
            {userStore.isConnected && (
              <IconButton className="header-account-icon-button" onClick={this.openAccountMenu}>
                <AccountCircleIcon className="header-account-icon" />
                <Menu
                  open={this.isMenuOpen}
                  anchorEl={this.accountMenuAnchorElement}
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
                  <MenuItem
                    disabled={LanguageEnum.FRANCAIS === userStore.user.langKey}
                    onClick={userStore.changeLanguage.bind(this, LanguageEnum.FRANCAIS)}
                    value={LanguageEnum.FRANCAIS}
                  >
                    {translationUtil.translate('common.enum.language.fr')}
                  </MenuItem>
                  <MenuItem
                    disabled={LanguageEnum.ENGLISH === userStore.user.langKey}
                    onClick={userStore.changeLanguage.bind(this, LanguageEnum.ENGLISH)}
                    value={LanguageEnum.ENGLISH}
                  >
                    {translationUtil.translate('common.enum.language.en')}
                  </MenuItem>
                  <MenuItem onClick={this.onLogout}>{translationUtil.translate('header.menu.logout')}</MenuItem>
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
    const results = articleStore.articleList.filter(article => {
      return article.title.toLowerCase().includes(event.target.value.toLowerCase());
    });

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

  openAccountMenu = event => {
    this.isMenuOpen = !this.isMenuOpen;
    this.accountMenuAnchorElement = event.currentTarget;
  };

  openLanguageMenu = event => {
    this.isLanguageMenuOpen = !this.isLanguageMenuOpen;
    this.languageMenuAnchorElement = event.currentTarget;
  };

  get homeLink() {
    if (userStore.isConnected) {
      return '/article-list';
    }
    return '/';
  }
}

export const VibeHeader = withStyles(headerSearchStyles)(SearchAppBar);
