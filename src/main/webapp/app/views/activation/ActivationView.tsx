import React from 'react';
import './activation.scss';
import { registerApi } from 'app/api/register-api';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { IActivateProps } from 'app/modules/account/activate/activate';
import { translationUtil } from 'app/translation/translation-util';
import SecurityIcon from '@material-ui/icons/Security';
import { EmptyState } from 'app/components/empty-state/empty-state';

@observer
export class ActivationView extends React.Component<IActivateProps> {
  @observable
  EmptyStateComponent = (
    <EmptyState
      icon={<SecurityIcon />}
      description={translationUtil.translate('registration.activation.inProgress')}
      title={translationUtil.translate('registration.activation.emptyState.title')}
    />
  );

  @observable
  icon: JSX.Element;

  async componentDidMount() {
    const key = this.props.location.search.split('=').find(data => data !== '?key');
    if (key) {
      this.EmptyStateComponent = await registerApi.activateAccount(key, this.props.history.push);
    }
  }

  render() {
    return <div className="activation-view">{this.EmptyStateComponent}</div>;
  }
}
