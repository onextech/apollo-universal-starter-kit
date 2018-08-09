import React from 'react'
import Helmet from 'react-helmet'
import { PageLayout } from '../../common/components/web'

const renderMetaData = () => {
  return (
    <Helmet
      title="Admin $Module$s"
      meta={[
        {
          name: 'description',
          content: 'Admin $Module$s page'
        }
      ]}
    />
  )
}

const Admin$Module$sView = () => {
  return (
    <PageLayout container>
      {renderMetaData()}
      <div className="text-center mt-4 mb-4">
        <p>Welcome to Admin$Module$s!</p>
      </div>
    </PageLayout>
  )
}

export default Admin$Module$sView
