import { Button, TextField, Select, InputLabel, MenuItem, FormControl, FormHelperText, OutlinedInput, withStyles } from '@material-ui/core';
import { userStore } from 'app/stores/user-store';
import { observer } from 'mobx-react';
import React from 'react';
import './home.scss';
import { observable, toJS, action, computed } from 'mobx';
import { registerApi } from 'app/api/register-api';
import { LanguageEnum } from 'app/enums/LanguageEnum';
import { snackbarStore } from 'app/stores/snackbar-store';
import { SnackbarTypeEnum } from 'app/enums/SnackbarEnum';

@observer
class Register extends React.Component<{ classes: any }> {
  @observable
  passwordValidation = '';

  @observable
  labelWidth = 0;

  render() {
    const { classes } = this.props;

    return (
      <form className="register-form" method="post" autoComplete="off">
        <TextField
          label="Username"
          onChange={this.handleChange('login')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Email"
          onChange={this.handleChange('email')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          label="Password"
          onChange={this.handleChange('password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />

        <TextField
          label="Validate Password"
          onChange={this.onValidationChange('validate_password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="language-input-label" htmlFor="outlined-language">
            Language
          </InputLabel>
          <Select
            value={userStore.user.langKey || ''}
            onChange={this.onSelectChange}
            input={<OutlinedInput name="language" labelWidth={this.labelWidth} id="outlined-language" />}
          >
            <MenuItem value={LanguageEnum.FRANCAIS}>Français</MenuItem>
            <MenuItem value={LanguageEnum.ENGLISH}>English</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={this.register}>
          Register
        </Button>
      </form>
    );
  }

  componentDidMount() {
    this.labelWidth = document.getElementById('language-input-label').offsetWidth;
  }

  componentWillMount() {
    userStore.clearUser();
    userStore.user.langKey = '';
  }

  @computed
  get language() {
    return userStore.user.langKey;
  }

  register = () => {
    if (
      this.passwordValidation.trim() !== '' &&
      userStore.user.password.trim() !== '' &&
      this.passwordValidation !== userStore.user.password
    ) {
      snackbarStore.openSnackbar(SnackbarTypeEnum.WARNING, `You have to tap the same passowrd`);
    } else {
      registerApi.register();
    }
  };

  @action
  handleChange = name => event => {
    userStore.user = { ...userStore.user, [name]: event.target.value };
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
  onSelectChange = event => {
    userStore.user = { ...userStore.user, langKey: event.target.value };
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
