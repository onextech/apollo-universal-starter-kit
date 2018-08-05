import React from 'react'
import Helmet from 'react-helmet'
import { Block } from '@onextech/react-semantic-booster'
import { Container } from 'reactstrap'
import { PageLayout } from '../../common/components/web'
import settings from '../../../../../../settings'

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
    <PageLayout>
      {renderMetaData()}
      <Block spacer={3} secondary textAlign='center'>
        <h1>{settings.app.name}</h1>
      </Block>
      <Block inverted>
        <Container>
          B boostrap Container = 720px
        </Container>
      </Block>
    </PageLayout>
  )
}

export default HomeView
