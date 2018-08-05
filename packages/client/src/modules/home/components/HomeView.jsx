import React from 'react'
import Helmet from 'react-helmet'
import { Block } from '@onextech/react-semantic-booster'
import { PageLayout } from '../../common/components/web'

const renderMetaData = () => {
  return (
    <Helmet
      title='Home'
      meta={[
        {
          name: 'description',
          content: 'Home page',
        },
      ]}
    />
  )
}

const HomeView = () => {
  return (
    <PageLayout container>
      {renderMetaData()}
      <div className='text-center mt-4 mb-4'>
        <p>Hello Home!</p>

      </div>
      <Block spacer={3} secondary textAlign='center'>
        <p>Hello Home 2!</p>
      </Block>
    </PageLayout>
  )
}

export default HomeView
