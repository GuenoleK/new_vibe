import React from 'react';
import { CardContainer } from 'app/components/layout-components/card-container/card-container';
import { articleApi } from 'app/api/article';
import { articleStore } from 'app/stores/article-store';
import { observer } from 'mobx-react';

@observer
export class ArticleListView extends React.Component {
  componentWillMount() {
    articleApi.getArticleListByStructureId(0);
  }

  render() {
    return <CardContainer />;
  }
}
