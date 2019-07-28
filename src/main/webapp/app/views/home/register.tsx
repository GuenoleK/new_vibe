import { Button, TextField, Select, InputLabel, MenuItem, FormControl, OutlinedInput, withStyles } from '@material-ui/core';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import React from 'react';
import './home.scss';
import { observable, action } from 'mobx';
import { registerApi } from 'app/api/register-api';
import { LanguageEnum } from 'app/enums/LanguageEnum';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';
import { structureAPi as structureApi } from 'app/api/structure-api';
import HelpIcon from '@material-ui/icons/Help';
import { Tooltip } from 'react-tippy';
// tslint:disable-next-line: no-submodule-imports
import 'react-tippy/dist/tippy.css';
import { translationUtil } from 'app/translation/translation-util';

@observer
class Register extends React.Component<{ classes: any }> {
  @observable
  passwordValidation = '';

  @observable
  labelWidth = 0;

  @observable
  structureNameList: string[] = [];

  @observable
  selectedStructureName = '';

  render() {
    const { classes } = this.props;

    return (
      <form className="register-form" method="post" autoComplete="off">
        <div className="rich-field">
          <TextField
            className="username-field"
            label={translationUtil.translate('registration.fields.username.placeholder')}
            onChange={this.handleChange('login')}
            onKeyPress={this.fireLoginOnEnterKey}
            margin="normal"
            variant="outlined"
            required
          />

          <Tooltip
            className="username-tooltip"
            position="right"
            trigger="mouseenter"
            duration={200}
            interactive
            html={
              <div className="tooltip-text">
                <div>{translationUtil.translate('registration.fields.username.info.tooltip.sentence.partOne')}</div>
                <div>{translationUtil.translate('registration.fields.username.info.tooltip.sentence.partTwo')}</div>
              </div>
            }
          >
            <HelpIcon />
          </Tooltip>
        </div>

        <TextField
          label={translationUtil.translate('registration.fields.email.placeholder')}
          onChange={this.handleChange('email')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="email"
          required
        />

        <TextField
          label={translationUtil.translate('registration.fields.password.placeholder')}
          onChange={this.handleChange('password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />

        <TextField
          label={translationUtil.translate('registration.fields.password.validationPlaceholder')}
          onChange={this.onValidationChange('validate_password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="structure-input-label" htmlFor="outlined-language" required>
            {translationUtil.translate('registration.fields.structure.placeholder')}
          </InputLabel>
          <Select
            value={this.selectedStructureName}
            onChange={this.onStructureNameSelectChange}
            input={<OutlinedInput name="structure" labelWidth={this.labelWidth} id="outlined-structure" />}
          >
            {this.StructureNameItemList}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="language-input-label" htmlFor="outlined-language" required>
            {translationUtil.translate('registration.fields.language.placeholder')}
          </InputLabel>
          <Select
            value={userStore.user.langKey}
            onChange={this.onSelectChange}
            input={<OutlinedInput name="language" labelWidth={this.labelWidth} id="outlined-language" />}
          >
            <MenuItem value={LanguageEnum.FRANCAIS}>{translationUtil.translate('common.enum.language.fr')}</MenuItem>
            <MenuItem value={LanguageEnum.ENGLISH}>{translationUtil.translate('common.enum.language.en')}</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={this.register}>
          {translationUtil.translate('registration.buttons.register')}
        </Button>
      </form>
    );
  }

  get StructureNameItemList() {
    return this.structureNameList.map((name, idx) => (
      <MenuItem key={`${idx}-${name}`} value={name}>
        {name}
      </MenuItem>
    ));
  }

  async componentDidMount() {
    this.labelWidth = document.getElementById('language-input-label').offsetWidth;
    this.structureNameList = await structureApi.getAllStructuresNames();
  }

  componentWillMount() {
    userStore.clearUser();
    userStore.user.langKey = '';
  }

  register = () => {
    if (
      this.passwordValidation.trim() !== '' &&
      userStore.user.password.trim() !== '' &&
      this.passwordValidation !== userStore.user.password &&
      this.selectedStructureName.trim() !== ''
    ) {
      snackbarStore.openSnackbar(SnackbarTypeEnum.WARNING, `You have to tap the same passowrd`);
    } else {
      registerApi.register(this.selectedStructureName);
    }
  };

  @action
  handleChange = name => event => {
    if (name === 'login') {
      const login: string = event.target.value.toLowerCase();
      userStore.user[name] = login;
    } else {
      userStore.user[name] = event.target.value;
    }
  };

  onValidationChange = name => event => {
    if (name === 'validate_password') {
      this.passwordValidation = event.target.value;
    }
  };

  fireLoginOnEnterKey = event => {
    if (event.key === 'Enter') {
      this.register();
    }
  };

  @action
  onStructureNameSelectChange = event => {
    this.selectedStructureName = event.target.value;
  };

  @action
  onSelectChange = event => {
    userStore.user.langKey = event.target.value;
  };
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

export const RegisterView = withStyles(styles as any)(Register);
