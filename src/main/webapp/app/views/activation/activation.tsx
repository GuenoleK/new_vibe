import React from 'react';
import './activation.scss';
import { registerApi } from 'app/api/register-api';
import { observable, computed } from 'mobx';
import { AxiosResponse } from 'axios';
import { observer } from 'mobx-react';
import { IActivateProps } from 'app/modules/account/activate/activate';

@observer
export class ActivationView extends React.Component<IActivateProps> {
  @observable
  informationText: undefined | JSX.Element | AxiosResponse<any>;

  async componentDidMount() {
    const key = this.props.location.search.split('=').find(data => data !== '?key');
    if (key) {
      this.informationText = await registerApi.activateAccount(key);
      // setTimeout(() => {
      //     this.props.history.push('/home');
      // }, 5000);
    }
  }

  render() {
    return <div className="activation-view">{this.InformationTextElement}</div>;
  }

  @computed
  get InformationTextElement() {
    if (this.informationText) {
      return this.informationText;
    }

    return <div>A TRADUIRE : Votre compte a bie été activé, vous allez être redirigé vers la page d'accueil</div>;
  }
}
