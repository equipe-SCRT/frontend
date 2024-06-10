import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import styles from './CardScrt.module.css'
const CardScrt = ({ legenda, info, bgColor, textColor='#000000' }) => {
  const cardStyle = {
    backgroundColor: bgColor,
    color: textColor
  };

  return (
    <Col md={3}>
      <Card style={cardStyle} className={styles.cardScrt}>
        <Card.Body>
          <Card.Title className={styles.titulo}>{legenda}</Card.Title>
          <Card.Text className={styles.info}>{info}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardScrt;
