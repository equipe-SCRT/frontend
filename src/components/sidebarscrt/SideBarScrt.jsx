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
        style={{ height: "100%", position: "fixed" }}
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
                                    marginTop:"20px",
                                    padding: "9px"
                                  }}>
                    <img src={imagemLogo} className='logo' alt="SCRT Logo" loading="lazy"/>
            </div>
              </MenuItem>
            )}
            <hr />
          </Menu>

          <Menu
        className={`${styles.sidebarChild}`}
        >
                     <SubMenu component={<Link to="/home" />} label="Gráficos" 
        className={`${styles.sidebarChild}`}
        >
                         <MenuItem className={`${styles.sidebarChild}`}
                          component={<Link to="/campanhas" />}> Campanhas </MenuItem>
                         <MenuItem className={`${styles.sidebarChild}`}
                          component={<Link to="/condominios" />}> Condomínios </MenuItem>
                     </SubMenu>
                     <MenuItem className={`${styles.sidebarChild}`}
                      component={<Link to="/voluntarios/cadastro" />}> Colaboradores </MenuItem>
                     <MenuItem className={`${styles.sidebarChild}`}
                      component={<Link to="/produtos-unitarios/cadastro" />}> Produtos </MenuItem>
                     <MenuItem className={`${styles.sidebarChild}`}
                      component={<Link to="/cestas/cadastro" />}> Cestas </MenuItem>
                     <MenuItem className={`${styles.sidebarChild}`}
                      component={<Link to="/condominios/cadastro" />}> Condomínios </MenuItem>
                     <MenuItem className={`${styles.sidebarChild}`}
                      component={<Link to="/campanhas/cadastro" />}> Campanhas </MenuItem>
                     <MenuItem className={`${styles.sidebarChild}`}
                      component={<Link to="/indicadores/cadastro" />}> Indicadores </MenuItem>
                     <MenuItem className={`${styles.sidebarChild}`}
                      component={<Link to="/relatorios" />}> Relatórios </MenuItem>
                 </Menu>
        </main>
      </Sidebar>



    </div>
    
    
    </>
  );
}



//     );
// }
export default SideBarScrt;

// export default NavBar;
