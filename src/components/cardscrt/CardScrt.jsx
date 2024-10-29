import React from "react";
import { Card, Col } from "react-bootstrap";
import styles from "./CardScrt.module.css";
import { Link } from 'react-router-dom';

const CardScrt = ({
  legenda,
  sublegenda,
  info = 0,
  bgColor,
  textColor = "#000000",
  children,
  isDataSelected,
  isCampanhaSelected,
  isCondominioSelected,
  infoTotal,
  link
}) => {
  const cardStyle = {
    backgroundColor: bgColor + "88",
    borderColor: bgColor,
    color: textColor,

  };
  const elementoInfo = infoTotal == undefined ? <> {info}</> : <>{info} <span className={styles.infoTotal}>/{infoTotal}</span></>;

  const cardBody = link == undefined ? <>
    <div className={styles.card}>
      <div>{children}</div>
      <Card.Title className={styles.titulo}>{legenda} <br />{sublegenda} </Card.Title>

      <Card.Text className={styles.info}>
        {(!isDataSelected && !isCampanhaSelected) && elementoInfo}
        {isDataSelected && (
          <div className={styles.selectDataContainer}>
            {isDataSelected}
          </div>
        )}
        {isCampanhaSelected && (
          <div className={styles.SelectScrtContainer}>
            {isCampanhaSelected}
          </div>
        )}
      </Card.Text>
    </div >
  </> :
    <>
        <div className={styles.card}>
      <Link className={styles.cardLink} to={link}>
          <div>{children}</div>
          <Card.Title className={styles.titulo}>{legenda} <br />{sublegenda} </Card.Title>

          <Card.Text className={styles.info}>
            {(!isDataSelected && !isCampanhaSelected && !isCondominioSelected) && elementoInfo}
            {isDataSelected && (
              <div className={styles.selectDataContainer}>
                {isDataSelected}
              </div>
            )}
            {isCampanhaSelected && (
              <div className={styles.SelectScrtContainer}>
                {isCampanhaSelected}
              </div>
            )}
            {isCondominioSelected && (
              <div className={styles.SelectScrtContainer}>
                {isCondominioSelected}
              </div>
            )}
          </Card.Text>
      </Link>
        </div >
    </>
  return (
    <Col md={3}>
      <Card style={cardStyle} className={styles.cardScrt}>
        {cardBody}
      </Card>
    </Col>
  );
};

export default CardScrt;