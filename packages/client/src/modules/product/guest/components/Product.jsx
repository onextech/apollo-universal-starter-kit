import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import settings from '../../../../../../../settings'
import translate from '../../../../i18n'
import { PageLayout } from '../../../common/components/web'

const Product = ({ loading, product, location, t }) => {
  let productObj = product
  // if new product was just added read it from router
  if (!productObj && location.state) {
    productObj = location.state.product
  }

  const renderMetaData = () => {
    return (
      <Helmet
        title={`${settings.app.name} - ${t('product.title')}`}
        meta={[
          { name: 'description', content: t('product.meta') },
        ]}
      />
    )
  }

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
        <Link id='back-button' to='/products'>{t('product.btn.back')}</Link>
        <h2>{t('product.label.product')}</h2>
        <p>{JSON.stringify(product)}</p>
      </PageLayout>
    )
  }
}

Product.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object,
  location: PropTypes.object.isRequired,
  t: PropTypes.func,
}

export default translate('product')(Product)
