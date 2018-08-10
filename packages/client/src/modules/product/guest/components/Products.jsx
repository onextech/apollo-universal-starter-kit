import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import _ from 'lodash'
import { Label, Input, FormGroup } from 'reactstrap'
import {
  Form,
  PageLayout,
  Pagination,
  Row,
  Col,
  CardGrid,
  Card,
  CardHeader,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from '../../../common/components/web'
import translate from '../../../../i18n/index'
import settings from '../../../../../../../settings'
import paginationConfig from '../../../../../../../config/pagination'

const { itemsNumber, type } = paginationConfig.web

const OrderDateTimePicker = ({
  order,
  onDateTimeChange: handleDateTimeChange,
}) => {
  return (
    <Form>
      <FormGroup>
        <Label for='exampleDate'>Date</Label>
        <Input type='date' name='date' id='exampleDate' placeholder='date placeholder' value={order.date} onChange={(e) => handleDateTimeChange(e, 'date')} />
      </FormGroup>
      <FormGroup>
        <Label for='exampleTime'>Time</Label>
        <Input type='time' name='time' id='exampleTime' placeholder='time placeholder' value={order.time} onChange={(e) => handleDateTimeChange(e, 'time')} />
      </FormGroup>
    </Form>
  )
}

OrderDateTimePicker.propTypes = {
  onDateTimeChange: PropTypes.func.isRequired,
  order: PropTypes.shape({
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }),
}

const ProductCard = ({ data, onClick: handleClick }) => {
  const { id, title, image, description } = data
  return (
    <Card id={id} style={{ marginBottom: '1em' }}>
      {image && <CardImg top width='100%' src={image} />}
      <CardBody>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardText className='text-muted'>{description}</CardText>}
        <Button onClick={(e) => handleClick(e, data)}>Add to Order</Button>
      </CardBody>
    </Card>
  )
}

ProductCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
  onClick: PropTypes.func.isRequired,
}

class Products extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.object,
    loadData: PropTypes.func,
    history: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    cart: [],
    order: {
      date: '2018-08-10',
      time: '18:30',
    },
  }

  getCart = () => {
    const { cart } = this.state
    const reduceQuantity = (acc, val) => {
      const index = _.findIndex(acc, { id: val.id })
      const isExist = index > -1
      if (!isExist) {
        acc.push({ ...val, quantity: 1 })
      } else {
        acc[index].quantity = acc[index].quantity + 1
      }
      return acc
    }
    return cart.reduce(reduceQuantity, [])
  }

  renderMetaData = () => {
    const { t } = this.props
    return (
      <Helmet
        title={`${settings.app.name} - ${t('list.title')}`}
        meta={[
          { name: 'description', content: `${settings.app.name} - ${t('list.meta')}` },
        ]}
      />
    )
  }

  handleCartSubmit = () => {
    const { history } = this.props
    return history.push({
      pathname: '/checkout',
      state: { cart: this.getCart(), order: this.state.order },
    })
  }

  handleDateTimeChange = (e, name) => {
    console.log('value ', e.target.value)
    const { order } = this.state
    const nextOrder = { ...order, [name]: e.target.value }
    return this.setState({ order: nextOrder })
  }

  handleProductClick = (e, data) => {
    this.setState({ cart: this.state.cart.concat(data) })
  }

  handlePageChange = (pagination, pageNumber) => {
    const {
      products: {
        pageInfo: { endCursor },
      },
      loadData,
    } = this.props
    if (pagination === 'relay') {
      loadData(endCursor + 1, 'add')
    } else {
      loadData((pageNumber - 1) * itemsNumber, 'replace')
    }
  }

  render() {
    const { cart, order } = this.state
    const { loading, products, t } = this.props
    if (loading && !products) {
      return (
        <PageLayout container>
          {this.renderMetaData()}
          <div className='text-center'>{t('list.loadMsg')}</div>
        </PageLayout>
      )
    } else {
      const renderCartItems = (item, i) => {
        const { id, title, quantity } = item
        return (
          <div key={id} style={{ marginBottom: '1em' }}>
            <h5 style={{ fontWeight: '400' }}>
              <span style={{ opacity: 0.7, fontSize: '80%', marginRight: '.5em' }}>{i + 1}.</span>
              <strong style={{ fontWeight: '500' }}>{title}</strong> x {quantity}</h5>
          </div>
        )
      }
      return (
        <PageLayout container>
          {this.renderMetaData()}
          <h1>{t('list.title')}</h1>
          <p>{t('list.subtitle')}</p>
          <Row>
            <Col sm={8}>
              <CardGrid
                columns={2}
                dataSource={products.edges.map(({ node }) => node)}
                card={({ data }) => <ProductCard data={data} onClick={this.handleProductClick} />}
              />
              <Pagination
                itemsPerPage={products.edges.length}
                handlePageChange={this.handlePageChange}
                hasNextPage={products.pageInfo.hasNextPage}
                pagination={type}
                total={products.totalCount}
                loadMoreText={t('list.btn.more')}
                defaultPageSize={itemsNumber}
              />
            </Col>
            <Col sm={4}>
              <Card>
                <CardHeader tag='h3'>Cart</CardHeader>
                <CardBody>
                  {
                    cart.length ?
                      <div style={{ marginBottom: '2em' }}>
                        {this.getCart().map(renderCartItems)}
                        <hr />
                        <OrderDateTimePicker onDateTimeChange={this.handleDateTimeChange} order={order} />
                      </div> :
                      <div style={{ padding: '4em 0', textAlign: 'center' }}>
                        <h6 style={{ opacity: 0.5 }}>Your cart is empty</h6>
                      </div>
                  }
                  <Button
                    block
                    size='lg'
                    disabled={!cart.length}
                    color={!cart.length ? 'secondary' : 'primary'}
                    onClick={this.handleCartSubmit}
                  >
                    Order
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </PageLayout>
      )
    }
  }
}

export default translate('product')(Products)
