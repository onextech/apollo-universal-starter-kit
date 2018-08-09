import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { PageLayout, Table, Button, Pagination } from '../../../common/components/web/index'
import translate from '../../../../i18n/index'
import settings from '../../../../../../../settings'
import paginationConfig from '../../../../../../../config/pagination'

const { itemsNumber, type } = paginationConfig.web

class Products extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.object,
    deleteProduct: PropTypes.func.isRequired,
    loadData: PropTypes.func,
    t: PropTypes.func,
  };

  handleDeleteProduct = (id) => {
    const { deleteProduct } = this.props
    deleteProduct(id)
  };

  renderMetaData = () => {
    const { t } = this.props
    return (
      <Helmet
        title={`${settings.app.name} - ${t('list.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('list.meta')}`,
          },
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
      const columns = [
        {
          title: t('list.column.title'),
          dataIndex: 'title',
          key: 'title',
          render: (text, record) => (
            <Link className='product-link' to={`/admin/products/${record.id}`}>
              {text}
            </Link>
          ),
        },
        {
          title: t('list.column.actions'),
          key: 'actions',
          width: 50,
          render: (text, record) => (
            <Button
              color='primary'
              size='sm'
              className='delete-button'
              onClick={() => this.handleDeleteProduct(record.id)}
            >
              {t('list.btn.del')}
            </Button>
          ),
        },
      ]
      return (
        <PageLayout container>
          {this.renderMetaData()}
          <h2>{t('list.subTitle')}</h2>
          <Link to='/admin/products/new'>
            <Button color='primary'>{t('list.btn.add')}</Button>
          </Link>
          <h1 />
          <Table dataSource={products.edges.map(({ node }) => node)} columns={columns} />
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
