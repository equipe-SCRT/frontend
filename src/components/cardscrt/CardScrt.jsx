import React from "react";
import { Card, Col } from "react-bootstrap";
import styles from "./CardScrt.module.css";

const CardScrt = ({
  legenda,
  sublegenda,
  info = 0,
  bgColor,
  textColor = "#000000",
  children,
  isDataSelected,
  isCampanhaSelected,
  infoTotal
}) => {
  const cardStyle = {
    backgroundColor: bgColor + "88",
    borderColor:bgColor,
    color: textColor,
    
  };
  const elementoInfo = infoTotal == undefined ? <> {info}</> : <>{info} <span className={styles.infoTotal}>/{infoTotal}</span></>;

  return (
    <Col md={3}>
      <Card style={cardStyle} className={styles.cardScrt}>
        <Card.Body>
          <div>{children}</div>
          <Card.Title className={styles.titulo}>{legenda} <br />{sublegenda} </Card.Title>
          
          <Card.Text className={styles.info}>
            {elementoInfo}
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