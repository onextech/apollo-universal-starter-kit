import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import translate from '../../../../i18n/index'
import settings from '../../../../../../../settings'
import { PageLayout } from '../../../common/components/web'
import ProductForm from './ProductForm'

const ProductCreate = ({ createProduct, t }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('product.title')}`}
      meta={[
        { name: 'description', content: t('product.meta') },
      ]}
    />
  )
  return (
    <PageLayout container>
      {renderMetaData()}
      <Link id='back-button' to='/admin/products'>{t('product.btn.back')}</Link>
      <h2>{t(`product.label.create`)} {t('product.label.product')}</h2>
      <ProductForm onSubmit={(values) => createProduct(values)} />
      <br />
    </PageLayout>
  )
}

ProductCreate.propTypes = {
  createProduct: PropTypes.func.isRequired,
  t: PropTypes.func,
}

export default translate('product')(ProductCreate)
