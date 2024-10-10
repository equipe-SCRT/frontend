import React, { useState } from 'react';
import styles from "./SideBarScrt.module.css"
import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem
  //useProSidebar
} from "react-pro-sidebar";

import imagemLogo from "../../assets/images/logo.svg";
import iconChart from "../../assets/images/icon-bar-chart.svg";
import iconUser from "../../assets/images/icon-user.svg";
import iconCesta from "../../assets/images/icon-cesta.svg";
import iconBuilding from "../../assets/images/icon-building.svg";
import iconCampaign from "../../assets/images/icon-campaign.svg";
import iconMetrics from "../../assets/images/icon-metrics.svg";
import iconSummary from "../../assets/images/icon-summary.svg";
import icon from "../../assets/images/icon-placeholder.svg";
import { Link } from 'react-router-dom';


function SideBarScrt() {
  //const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <>
      <div>
        <Sidebar
          // className={`app ${toggled ? "toggled" : ""}`}
          style={{ height: "100%", position: "fixed", borderRightWidth: "0px", minWidth: "17.2%", width: "17.2%" }}
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          className={`${styles.sidebar}`}
        >
          <main
            className={`${styles.sidebarChild}`}

          >
            <Menu
              className={`${styles.sidebarChild}`}
            >
              {collapsed ? (
                <MenuItem
                  className={`${styles.sidebarChild}`}

                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <MenuItem
                  className={`${styles.sidebarChild}`}

                  onClick={handleCollapsedChange}
                  component={<Link to="/home" />}
                >

                  <div id='img' className={styles.logo}
                    style={{
                      marginTop: "120px",
                      padding: "9px"
                    }}>
                    <img src={imagemLogo} className='logo' alt="SCRT Logo" loading="lazy" />
                  </div>
                </MenuItem>
              )}
            </Menu>

            <Menu className={`${styles.sidebarChild}`} style={{ marginTop: "120px" }}>
              <SubMenu
                component={<Link to="/home" />}
                label={
                  <div>
                    <img src={iconChart} alt="icon gráficos" style={{ marginRight: "8px" }} />
                    Gráficos
                  </div>
                }
                className={`${styles.sidebarChild}`}
              >
                <MenuItem className={`${styles.customMenuItem}`}
                  component={<Link to="/campanhas" />}> Campanhas </MenuItem>
                <MenuItem className={`${styles.customMenuItem}`}
                  component={<Link to="/condominios" />}> Condomínios </MenuItem>
              </SubMenu>

              <MenuItem className={`${styles.customMenuItem}`} component={<Link to="/voluntarios/cadastro" />}>
                <div>
                  <img src={iconUser} alt="icon colaboradores" style={{ marginRight: "8px" }} />
                  Colaboradores
                </div>
              </MenuItem>

              <MenuItem className={`${styles.customMenuItem}`} component={<Link to="/produtos-unitarios/cadastro" />}>
                <div>
                  <img src={icon} alt="icon produtos" style={{ marginRight: "8px" }} />
                  Produtos
                </div>
              </MenuItem>

              <MenuItem className={`${styles.customMenuItem}`} component={<Link to="/cestas/cadastro" />}>
                <div>
                  <img src={iconCesta} alt="icon cestas" style={{ marginRight: "8px" }} />
                  Cestas
                </div>
              </MenuItem>

              <MenuItem className={`${styles.customMenuItem}`} component={<Link to="/condominios/cadastro" />}>
                <div>
                  <img src={iconBuilding} alt="icon condomínios" style={{ marginRight: "8px" }} />
                  Condomínios
                </div>
              </MenuItem>

              <MenuItem className={`${styles.customMenuItem}`} component={<Link to="/campanhas/cadastro" />}>
                <div>
                  <img src={iconCampaign} alt="icon campanhas" style={{ marginRight: "8px" }} />
                  Campanhas
                </div>
              </MenuItem>

              <MenuItem className={`${styles.customMenuItem}`} component={<Link to="/indicadores/cadastro" />}>
                <div>
                  <img src={iconMetrics} alt="icon indicadores" style={{ marginRight: "8px" }} />
                  Indicadores
                </div>
              </MenuItem>

              <MenuItem className={`${styles.customMenuItem}`} component={<Link to="/relatorios" />}>
                <div>
                  <img src={iconSummary} alt="icon relatórios" style={{ marginRight: "8px" }} />
                  Relatórios
                </div>
              </MenuItem>
            </Menu>

          </main>
        </Sidebar>

      </div>
    </>
  );
}

export default SideBarScrt;