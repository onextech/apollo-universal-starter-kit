import React from 'react'
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from './'

interface TDataRecord {
  id: number,
  title: string,
  image?: string,
}

const renderCol = (columns: number, record: TDataRecord) => {
  const { id, title, image } = record
  return (
    <Col key={id} sm={12 / columns}>
      <Card id={id}>
        {image && <CardImg top width='100%' src={image} />}
        <CardBody>
          {title && <CardTitle>{title}</CardTitle>}
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </Col>
  )
}

const renderRows = (columns: number, dataSource: TDataRecord[]) => {
  // Outer loop to create parent
  return dataSource.map((data: TDataRecord, i: number) => {
    if (i % columns === 0) {
      // Inner loop to create children
      const children = []
      for (let j = 0; j < columns; j++) {
        const record = dataSource[i + j]
        if (record) {
          children.push(renderCol(columns, record))
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
}

const CardGrid: React.SFC<CardGridProps> = ({ dataSource, columns = 3 }) => {
  return (
    <React.Fragment>
      {renderRows(columns, dataSource)}
    </React.Fragment>
  )
}

export default CardGrid
