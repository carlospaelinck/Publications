import React, { PropTypes } from "react"
import styled from "styled-components"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { hideModal as hideModalAction } from "../../actions/app-ui"
import { connect } from "react-redux"
import "./modal.css"

const ModalContainer = styled.div`
  align-items: center;
  background: hsla(0, 0%, 0%, 0.5);
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  left: 0;
  justify-content: space-around;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 9005;

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background-color: hsla(0, 0%, 0%, 0.25);
  }
`

export const ModalContent = styled.div`
  background: #fff;
  box-shadow: 0 1px 10px hsla(0, 0%, 0%, 0.25);
  border-radius: 2px;
  margin: auto;
  padding: 1em 1em calc(1em + 50px);
  position: relative;
`

const handleHideModal = (event, hideModalAction) => {
  event.preventDefault()
  hideModalAction()
}

const Modal = ({
  component: ModalComponent,
  componentProps = {}
}) => (
  <ReactCSSTransitionGroup
    transitionName="modal-transition"
    transitionEnterTimeout={200}
    transitionLeaveTimeout={350}
  >
    { !!ModalComponent && (
      <ModalContainer>
        <ModalComponent {...componentProps} />
      </ModalContainer>
    ) }
  </ReactCSSTransitionGroup>
)

export default Modal