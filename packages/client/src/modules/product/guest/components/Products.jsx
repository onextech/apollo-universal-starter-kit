import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { PageLayout, Pagination, CardGrid } from '../../../common/components/web'
import translate from '../../../../i18n/index'
import settings from '../../../../../../../settings'
import paginationConfig from '../../../../../../../config/pagination'

const { itemsNumber, type } = paginationConfig.web

class Products extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.object,
    loadData: PropTypes.func,
    t: PropTypes.func,
  };

  renderMetaData = () => {
    const { t } = this.props
    return (
      <Helmet
        title={`${settings.app.name} - ${t('list.title')}`}
        meta={[
          { name: 'description', content: `${settings.app.name} - ${t('list.meta')}` },
        ]}
      />
    )
  };

  handlePageChange = (pagination, pageNumber) => {
    const {
      products: {
        pageInfo: { endCursor },
      },
      loadData,
    } = this.props
    if (pagination === 'relay') {
      loadData(endCursor + 1, 'add')
    } else {
      loadData((pageNumber - 1) * itemsNumber, 'replace')
    }
  };

  render() {
    const { loading, products, t } = this.props
    if (loading && !products) {
      return (
        <PageLayout container>
          {this.renderMetaData()}
          <div className='text-center'>{t('list.loadMsg')}</div>
        </PageLayout>
      )
    } else {
      return (
        <PageLayout container>
          {this.renderMetaData()}
          <h1>{t('list.title')}</h1>
          <p>{t('list.subtitle')}</p>
          <CardGrid dataSource={products.edges.map(({ node }) => node)} />
          <Pagination
            itemsPerPage={products.edges.length}
            handlePageChange={this.handlePageChange}
            hasNextPage={products.pageInfo.hasNextPage}
            pagination={type}
            total={products.totalCount}
            loadMoreText={t('list.btn.more')}
            defaultPageSize={itemsNumber}
          />
        </PageLayout>
      )
    }
  }
}

export default translate('product')(Products)
