import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dropdown, Icon } from 'antd'

export default class LanguagePicker extends React.Component {
  getMenuItems = () => (
    <Menu onClick={({ key }) => this.props.i18n.changeLanguage(key)}>
      {Object.keys(this.props.i18n.store.data).map((lang) => (
        <Menu.Item key={lang}>{lang.slice(0, 2).toUpperCase()}</Menu.Item>
      ))}
    </Menu>
  );

  render() {
    return (
      <Dropdown overlay={this.getMenuItems()}>
        <a className='ant-dropdown-link' href='#'>
          {this.props.i18n.language.slice(0, 2).toUpperCase()} <Icon type='down' />
        </a>
      </Dropdown>
    )
  }
}

LanguagePicker.propTypes = {
  i18n: PropTypes.object.isRequired,
}
