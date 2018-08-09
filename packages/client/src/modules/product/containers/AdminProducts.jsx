import React from 'react'
import AdminProductsView from '../components/AdminProductsView/AdminProductsView'

class AdminProducts extends React.Component {
  render() {
    return (
      <AdminProductsView {...this.props} />
    )
  }
}

export default AdminProducts
