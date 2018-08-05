import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import settings from '../../../../../../../../../settings'
import NavBar from './NavBar'

const footerHeight = '40px'

const Footer = styled.footer`
  margin-top: 10px;
  line-height: ${footerHeight};
  height: ${footerHeight};
`

interface PageLayoutProps {
  children?: React.ReactNode
  navBar?: boolean
  container?: boolean
}

const PageLayout: React.SFC<PageLayoutProps> = ({ children, navBar, container }) => {
  const Body = container ? Container : (props: any) => <div {...props} />
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex flex-column flex-grow-1 flex-shrink-0">
        <header className="d-flex flex-column">{navBar !== false && <NavBar />}</header>
        <Body id="content">{children}</Body>
      </div>
      <Footer className="d-flex flex-shrink-0 justify-content-center">
        <span>&copy 2018. {settings.app.name}.</span>
      </Footer>
    </div>
  )
}

export default PageLayout
