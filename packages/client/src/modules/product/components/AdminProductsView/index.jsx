import React from 'react'
import Helmet from 'react-helmet'
import { PageLayout } from '../../../common/components/web/index'

const renderMetaData = () => {
  return (
    <Helmet
      title='Admin Products'
      meta={[
        { name: 'description', content: 'Admin Products page' },
      ]}
    />
  )
}

const AdminProductsView = () => {
  return (
    <PageLayout container>
      {renderMetaData()}
      <div className='text-center mt-4 mb-4'>
        <p>Welcome to Admin Products!</p>
      </div>
    </PageLayout>
  )
}

export default AdminProductsView
