import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import settings from '../../../../../../../settings'
import translate from '../../../../i18n'
import { PageLayout } from '../../../common/components/web'
import ProductForm from './ProductForm'

const Product = ({ loading, product, location, updateProduct, t }) => {
  let productObj = product
  // if new product was just added read it from router
  if (!productObj && location.state) {
    productObj = location.state.product
  }

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('product.title')}`}
      meta={[
        {
          name: 'description',
          content: t('product.meta'),
        },
      ]}
    />
  )

  if (loading && !productObj) {
    return (
      <PageLayout container>
        {renderMetaData()}
        <div className='text-center'>{t('product.loadMsg')}</div>
      </PageLayout>
    )
  } else {
    return (
      <PageLayout container>
        {renderMetaData()}
        <Link id='back-button' to='/admin/products'>{t('product.btn.back')}</Link>
        <h2>{t(`product.label.edit`)} {t('product.label.product')}</h2>
        <ProductForm onSubmit={(values) => updateProduct({ ...productObj, ...values })} product={product} />
      </PageLayout>
    )
  }
}

Product.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object,
  updateProduct: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  subscribeToMore: PropTypes.func.isRequired,
  t: PropTypes.func,
}

export default translate('product')(Product)
