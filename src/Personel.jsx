import React, { Component } from "react";

export default class Personel extends Component {
  constructor(props) {
    super(props);
  }

  OnKaydet = () => {
    this.props.OkCommand();
  };

  OnIptal = () => {
    alert("değişiklik var");
    //this.props.CancelCommand();
  };

  OnKapat=()=>{
    alert("kapat");
  }

  render() {
    return (
      <div>
        Personel
        <footer className="gk-modal-footer">
          <button
            className="gk-btn gk-btn-secondary"
            onClick={(e) => this.OnIptal()}
          >
            İptal
          </button>
          <button
            className="gk-btn gk-btn-primary"
            onClick={(e) => this.OnKaydet()}
          >
            Tamamxxx
          </button>
        </footer>
      </div>
    );
  }
}
