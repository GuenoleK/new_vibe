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
          label="Nom d'utilisateur"
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
          type="email"
          required
        />

        <TextField
          label="Mot de passe"
          onChange={this.handleChange('password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />

        <TextField
          label="Validation mot de passe"
          onChange={this.onValidationChange('validate_password')}
          onKeyPress={this.fireLoginOnEnterKey}
          margin="normal"
          variant="outlined"
          type="password"
          required
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="structure-input-label" htmlFor="outlined-language" required>
            Structure
          </InputLabel>
          <Select
            value={userStore.user.langKey}
            onChange={this.onSelectChange}
            input={<OutlinedInput name="structure" labelWidth={this.labelWidth} id="outlined-structure" />}
          >
            <MenuItem value={LanguageEnum.FRANCAIS}>Français</MenuItem>
            <MenuItem value={LanguageEnum.ENGLISH}>English</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="language-input-label" htmlFor="outlined-language" required>
            Langue
          </InputLabel>
          <Select
            value={userStore.user.langKey}
            onChange={this.onSelectChange}
            input={<OutlinedInput name="language" labelWidth={this.labelWidth} id="outlined-language" />}
          >
            <MenuItem value={LanguageEnum.FRANCAIS}>Français</MenuItem>
            <MenuItem value={LanguageEnum.ENGLISH}>English</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={this.register}>
          Inscription
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
    userStore.user[name] = event.target.value;
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
  onStructureSelectChange = event => {
    userStore.user.s = event.target.value;
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
