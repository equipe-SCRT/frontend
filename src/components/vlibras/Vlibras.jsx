import React, { Component } from 'react';

export default class VLibras extends Component {
  constructor(props) {
    super(props);
    this.widgetSrc = 'https://vlibras.gov.br/app';
    this.scriptSrc = '/plugin'; // URL relativa para usar o proxy
  }

  init() {
    this.script = document.createElement('script');
    this.script.src = this.scriptSrc;
    this.script.async = true;
    this.script.onload = () => {
      if (window.VLibras) {
        new window.VLibras.Widget(this.widgetSrc);
      }
      if (this.props.forceOnload && typeof window.onload === 'function') {
        window.onload();
      }
    };
    document.head.appendChild(this.script);
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    if (this.script) {
      document.head.removeChild(this.script);
    }
  }

  render() {
    return (
      <div vw="true" className="enabled">
        <div vw-access-button="true" className="active"></div>
        <div vw-plugin-wrapper="true">
          <div className="vw-plugin-top-wrapper"></div>
        </div>
      </div>
    );
  }
}