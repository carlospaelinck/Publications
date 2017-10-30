import React from "react"
import { connect } from "react-redux"
import Modal from "../modal"
import styled, { injectGlobal } from "styled-components"
import { appFont, AppColors } from "../../util/constants"
import {
  activeModalSelector,
  activeModalPropsSelector
} from "../../modules/ui"

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @media print {
    html, body {
      margin: 0;
    }
    @page {
      size: auto;
      margin: 0mm;
      marks: none;
    }
  }
`

const AppView = styled.div`
  font-family: ${appFont};
  color: ${AppColors.DarkGray};
  font-size: 14px;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  top: 0; left: 0; right: 0; bottom: 0;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern" 1, "dlig" 1;
  -moz-font-feature-settings: "kern" 1, "dlig" 1;
`

const BaseView = props => {
  const {
    children,
    activeModal,
    activeModalProps
  } = props

  return (
    <AppView>
      <Modal
        component={activeModal}
        componentProps={activeModalProps}
      />
      { children }
    </AppView>
  )
}

export default connect(
  state => ({
    activeModal: activeModalSelector(state),
    activeModalProps: activeModalPropsSelector(state)
  }))(BaseView)
