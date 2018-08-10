import React from 'react'
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from './'

interface TDataRecord {
  id: number,
  title: string,
  image?: string,
  description?: string,
}

const renderCol = (columns: number, record: TDataRecord, Card: any) => {
  const { id } = record
  return (
    <Col key={id} sm={12 / columns}>
      <Card data={record} />
    </Col>
  )
}

const renderRows = (columns: number, dataSource: TDataRecord[], Card: any) => {
  // Outer loop to create parent
  return dataSource.map((data: TDataRecord, i: number) => {
    if (i % columns === 0) {
      // Inner loop to create children
      const children = []
      for (let j = 0; j < columns; j++) {
        const record = dataSource[i + j]
        if (record) {
          children.push(renderCol(columns, record, Card))
        }
      }
      // Create the parent and add the children
      return (<Row key={`row-${i}`}>{children}</Row>)
    }
  })
}

interface CardGridProps {
  dataSource: TDataRecord[],
  columns?: number,
  card: any,
}

const CardGrid: React.SFC<CardGridProps> = ({ dataSource, columns = 3, card }) => {
  return (
    <React.Fragment>
      {renderRows(columns, dataSource, card)}
    </React.Fragment>
  )
}

export default CardGrid
