import React from 'react'
import Helmet from 'react-helmet'
import { PageLayout } from '../../common/components/web'

const renderMetaData = () => {
  return (
    <Helmet
      title="$Module$"
      meta={[
        {
          name: 'description',
          content: '$Module$ page'
        }
      ]}
    />
  )
}

const $Module$View = () => {
  return (
    <PageLayout container>
      {renderMetaData()}
      <div className="text-center mt-4 mb-4">
        <p>Hello $Module$!</p>
      </div>
    </PageLayout>
  )
}

export default $Module$View
