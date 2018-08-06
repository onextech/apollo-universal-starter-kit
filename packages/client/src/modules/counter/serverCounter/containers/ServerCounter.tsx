import React from 'react'
import { Mutation, Query } from 'react-apollo'
import update from 'immutability-helper'

import translate, { TranslateFunction } from '../../../../i18n'
import { ServerCounterView, ServerCounterButton } from '../components/ServerCounterView'
import ADD_COUNTER from '../graphql/AddCounter.graphql'
import COUNTER_SUBSCRIPTION from '../graphql/CounterSubscription.graphql'
import COUNTER_QUERY from '../graphql/CounterQuery.graphql'

interface ButtonProps {
  counterAmount: number
  t: TranslateFunction
  counter: any
}

interface ServerCounter {
  amount: number
}

const IncreaseButton = ({ counterAmount, t, counter }: ButtonProps) => {
  const updateServerCounterCache = (cache: any, data: any) => {
    const { addServerCounter }: { addServerCounter: ServerCounter } = data.data
    /**
     * Fix issue "Can't find field <field> on object (ROOT_QUERY)"
     * @link https://github.com/apollographql/apollo-client/issues/1701#issuecomment-380213533
     */
    if (cache.data.data.ROOT_QUERY.serverCounter) {
      const query = COUNTER_QUERY
      const prevData = cache.readQuery({ query })
      const nextData = update(prevData, { serverCounter: { amount: { $set: addServerCounter.amount } } })
      cache.writeQuery({ query, data: nextData })
    }
  }

  const optimisticResponse = {
    __typename: 'Mutation',
    addServerCounter: {
      __typename: 'Counter',
      amount: counter.amount + 1,
    },
  }

  return (
    <Mutation mutation={ADD_COUNTER} update={updateServerCounterCache} optimisticResponse={optimisticResponse}>
      {(addServerCounter: any) => {
        const handleAddServerCounter = (amount: number) => () => {
          addServerCounter({ variables: { amount } })
        }

        const onClickHandler = () => handleAddServerCounter(counterAmount)

        return <ServerCounterButton text={t('btnLabel')} onClick={onClickHandler()} />
      }}
    </Mutation>
  )
}

interface CounterProps {
  t: TranslateFunction
  subscribeToMore: (opts: any) => any
  loading: boolean
  counter: any
}

class ServerCounter extends React.Component<CounterProps> {
  private subscription: any

  constructor(props: CounterProps) {
    super(props)
    this.subscription = null
  }

  public componentDidMount() {
    if (!this.props.loading) {
      // Subscribe or re-subscribe
      if (!this.subscription) {
        this.subscribeToCount()
      }
    }
  }

  // remove when Renderer is overwritten
  public componentDidUpdate(prevProps: CounterProps) {
    if (!prevProps.loading) {
      // Subscribe or re-subscribe
      if (!this.subscription) {
        this.subscribeToCount()
      }
    }
  }

  public componentWillUnmount() {
    if (this.subscription) {
      this.subscription()
    }
  }

  public subscribeToCount() {
    this.subscription = this.props.subscribeToMore({
      document: COUNTER_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev: any, {
          subscriptionData: {
            data: { counterUpdated: { amount } },
          },
        }: any) => {
        return update(prev, {
          serverCounter: {
            amount: { $set: amount },
          },
        })
      },
    })
  }

  public render() {
    const { t, counter, loading } = this.props
    return (
      <ServerCounterView t={t} counter={counter} loading={loading}>
        <IncreaseButton t={t} counterAmount={1} counter={counter} />
      </ServerCounterView>
    )
  }
}

const ServerCounterWithQuery = (props: any) => (
  <Query query={COUNTER_QUERY}>
    {({ loading, error, data: { serverCounter }, subscribeToMore }) => {
      if (error) { throw new Error(String(error)) }
      return <ServerCounter {...props} loading={loading} subscribeToMore={subscribeToMore} counter={serverCounter} />
    }}
  </Query>
)

export default translate('serverCounter')(ServerCounterWithQuery)
