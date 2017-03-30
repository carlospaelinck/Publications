import React from "react"
import { IconButton } from "./icon-button"
import { Text } from "../text"
import { AppColors } from "../../../util/constants"

export const PasteIconButton = ({ onClick, margin, disabled }) => (
  <IconButton
    disabled={disabled}
    margin={margin}
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g stroke={!disabled ? AppColors.DarkGray : "#aaa"} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none">
        <path d="M18.5 2.5h2v21h-18v-21h2"/><path d="M13.5 2.5c0-1.104-.895-2-2-2-1.104 0-2 .896-2 2h-3v2h10v-2h-3zM18.5 4.5v17h-14v-17M9.5 8.5h6M9.5 11.5h6M9.5 14.5h6M9.5 17.5h6M7 8.5h.5M7 11.5h.5M7 14.5h.5M7 17.5h.5"/>
      </g>
    </svg>
    <Text block color={!disabled ? AppColors.DarkGray : "#aaa"}>Paste</Text>
  </IconButton>
)