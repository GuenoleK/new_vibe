import React from 'react';
import './activation.scss';
import { registerApi } from 'app/api/register-api';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { IActivateProps } from 'app/modules/account/activate/activate';
import { translationUtil } from 'app/translation/translation-util';
import SecurityIcon from '@material-ui/icons/Security';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
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

  componentDidMount() {
    const key = this.props.location.search.split('=').find(data => data !== '?key');
    if (key) {
      const emptyStateTitle = translationUtil.translate('registration.activation.emptyState.title');
      registerApi
        .activateAccount(key)
        .then(() => {
          setTimeout(() => {
            this.props.history.push('/home');
          }, 5000);
          this.EmptyStateComponent = (
            <EmptyState
              icon={<VerifiedUserIcon />}
              description={<div>{translationUtil.translate('registration.activation.success')}</div>}
              title={emptyStateTitle}
            />
          );
        })
        .catch(
          () =>
            (this.EmptyStateComponent = (
              <EmptyState
                icon={<SecurityIcon />}
                description={
                  <div className="error-text">
                    <div>{translationUtil.translate('registration.activation.errorFirstSentence')}</div>
                    <div>{translationUtil.translate('registration.activation.errorSecondSentence')}</div>
                  </div>
                }
                title={emptyStateTitle}
              />
            ))
        );
    }
  }

  render() {
    return <div className="activation-view">{this.EmptyStateComponent}</div>;
  }
}
