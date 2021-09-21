import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";


import "./DialogService.css";


let resolve;

class DialogService extends Component {

   /** @return {DialogService}  */

   static modalId = "";

  static create(props = {}) {

    DialogService.modalId=Math.random().toString(32).split('.')[1];

    const containerElement = document.createElement("div");
    containerElement.setAttribute("id", this.modalId);
    containerElement.setAttribute("class","gk-modal");

    document.body.appendChild(containerElement);

    var comp=render(<DialogService />, containerElement);

 

    comp.DiagRef=React.createRef();

    // @ts-ignore
    return comp;
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modalParams: {},
    };

    this.show = this.show.bind(this);
  }

   /**
 * @param {{title: string, isContainer:boolean,formBody: object, width?:number,height?:number, 
 * showFooter:boolean,okText?:object, cancelText?:object}} params description
    */
     show(params) {

      //ref={frm.DiagRef}

      this.dragElement(document.getElementById("gkModalId"));

      console.log(params);

      //  params.formBody.ref=this.DiagRef;

       this.setState({ isOpen: true, modalParams: params });
       return new Promise((res) => {
         resolve = res;
       });
     }
   

  componentDidMount() {
    document.addEventListener("keydown", this.keydownHandle, false);

  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandle, false);
  }

  close() {
    this.setState({ isOpen: false });

    const containerElement = document.getElementById(DialogService.modalId);

    unmountComponentAtNode(containerElement);
    document.body.removeChild(containerElement);
  }

  keydownHandle = (e) => {
    if (e.keyCode === 27) this.handleCancel();
  };

  handleCancel=()=> {

    console.log(this.DiagRef.current);
     this.close();
     resolve(false);
  }

  handleConfirm=()=> {
      this.close();
      resolve(true);
      return;
  }

  dragElement=(elmnt)=> {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
   
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }


 
  render() {
    const { isOpen } = this.state;

    var footerAktifMi= this.state.modalParams.cancelText ||  this.state.modalParams.okText;

    return (
      
      <div   className={!isOpen ? "gk-modal gk-modal-bg" : "gk-modal gk-modal-bg gk-modal-isactive"}>
        <div id="gkModalId"  style={{width:this.state.modalParams.width}} className="gk-modal-dialog gk-card">
          <header id="gkModalIdheader" className="gk-modal-header">
            <div className="gk-modal-title"> {this.state.modalParams.title}</div>
            <button onClick={()=>this.handleCancel()} className="gk-close">
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div style={{overflowY: this.state.modalParams.isContainer==true?'auto' :'none'}} 
                className="gk-modal-body">{this.state.modalParams.formBody}</div>
        </div>
      </div>
     
    );
  }
}

export default DialogService;
