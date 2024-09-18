import React from "react";
import { Card, Col } from "react-bootstrap";
import styles from "./CardScrt.module.css";

const CardScrt = ({
  legenda,
  info,
  bgColor,
  textColor = "#000000",
  children,
  isDataSelected,
  isCampanhaSelected,
}) => {
  const cardStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    <Col md={3}>
      <Card style={cardStyle} className={styles.cardScrt}>
        <Card.Body>
          <div>{children}</div>
          <Card.Title className={styles.titulo}>{legenda}</Card.Title>
          <Card.Text className={styles.info}>
            {info && <>{info}</>}
            {isDataSelected && (
              <div className={styles.selectDataContainer}>
                {isDataSelected}
              </div>
            )}
            {isCampanhaSelected && (
              <div className={styles.selectCampanhaContainer}>
                {isCampanhaSelected}
              </div>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardScrt;