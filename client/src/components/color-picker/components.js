import styled from "styled-components";
import { AppColors } from "../../util/constants";

export const ColorPickerButton = styled.button`
  width: 32px;
  height: 15px;
  border: 1px solid ${AppColors.Gray40};
  box-shadow: inset 0 0 0 1px #fff;
  border-radius: 2px;
  background: ${({ color }) => color};
  outline: none;
  margin: 0;
  &:focus {
    box-shadow: inset 0 0 0 1px #fff, 0 0 0 1px ${AppColors.Highlight};
  }
`;

export const PickerContents = styled.div`
  position: absolute;
  top: 19px;
  left: 0;
`;