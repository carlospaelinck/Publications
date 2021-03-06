import * as React from "react";
import styled from "styled-components";
import {
  SectionTitle,
  Separator,
  ControlGrid,
  VerticalControlGrid,
} from "./components";
import ControlInput, { ControlInputLabel } from "../ui/control-input";
import get from "lodash/fp/get";
import { css } from "styled-components";
import {
  getPropertyOrNull,
  isText,
  getStringPropertyOrNull,
  supportsRadius,
  supportsBorder,
} from "./format-tab-fns";
import ColorPicker from "../color-picker";
import {
  colorFromStyles,
  sizeFromStyles,
  INLINE_STYLES,
} from "../../util/text";
import { styles as textStyles } from "../shapes/text-box";
import IconButton from "../ui/icon-button";
import { RichUtils } from "draft-js";
import { AppColors } from "../../util/constants";
import ControlSelect from "../ui/control-select";
import { useAppStateContext } from "../../contexts/app-state-provider";

const nameInputProps = {
  labelCSS: css`
    width: 16%;
  `,
  inputContainerCSS: css`
    width: 82%;
  `,
  inputCSS: css`
    width: 100%;
    text-align: left;
  `,
};

const FontStyleGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const fontOptions = [
  { value: "IBM Plex Sans", label: "Sans" },
  { value: "IBM Plex Serif", label: "Serif" },
];

export default function DocumentTab() {
  const {
    currentDocument,
    actions,
    selectedObject: shape,
  } = useAppStateContext();
  const { updateSelectedObject } = actions;
  let currentStyle = null;
  if (isText(shape)) {
    currentStyle = shape.editorState.getCurrentInlineStyle();
  }

  const setFont = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      updateSelectedObject({
        editorState: textStyles.fontFamily.add(
          shape!.editorState,
          event.target.value
        ),
      });
    },
    [updateSelectedObject, shape]
  );

  const setFontSize = React.useCallback(
    ({ fontSize }: { fontSize: string }) => {
      const numericValue = parseInt(fontSize, 10);
      if (!isNaN(numericValue) && numericValue >= 6 && numericValue <= 144) {
        updateSelectedObject({
          editorState: textStyles.fontSize.add(
            shape!.editorState,
            `${numericValue}px`
          ),
        });
      }
    },
    [updateSelectedObject, shape]
  );

  const setFill = React.useCallback(
    sender => {
      if (!isText(shape)) {
        updateSelectedObject(sender);
        return;
      }
      updateSelectedObject({
        editorState: textStyles.color.add(shape!.editorState, sender.color),
      });
    },
    [shape, updateSelectedObject]
  );

  return (
    <>
      <SectionTitle marginTop>Document</SectionTitle>
      <VerticalControlGrid>
        <ControlInput
          isString
          property="name"
          value={get("name")(currentDocument) || null}
          label="Name"
          disabled={!currentDocument}
          onChange={actions.updateCurrentDocument}
          {...nameInputProps}
        />
      </VerticalControlGrid>
      <ControlGrid>
        <ControlInput
          property="width"
          value={get("pages[0].width")(currentDocument) || null}
          label="Width"
          unit="in"
          disabled={!currentDocument}
          onChange={actions.updateCurrentPage}
        />
        <ControlInput
          property="height"
          value={get("pages[0].height")(currentDocument) || null}
          label="Height"
          unit="in"
          disabled={!currentDocument}
          onChange={actions.updateCurrentPage}
        />
      </ControlGrid>
      <Separator />
      <SectionTitle>Object</SectionTitle>
      <ControlGrid>
        <ControlInput
          property="x"
          value={getPropertyOrNull(shape, "x")}
          label="X"
          unit="in"
          disabled={!shape}
          onChange={updateSelectedObject}
        />
        <ControlInput
          property="y"
          value={getPropertyOrNull(shape, "y")}
          label="Y"
          unit="in"
          disabled={!shape}
          onChange={updateSelectedObject}
        />
        <ControlInput
          property="width"
          value={getPropertyOrNull(shape, "width")}
          label="Width"
          unit="in"
          disabled={!shape}
          onChange={updateSelectedObject}
        />
        <ControlInput
          property="height"
          value={getPropertyOrNull(shape, "height")}
          label="Height"
          unit="in"
          disabled={!shape}
          onChange={updateSelectedObject}
        />
        <ControlInput
          property="strokeWidth"
          value={getPropertyOrNull(shape, "strokeWidth")}
          label="Border"
          unit="pt"
          disabled={!shape || !supportsBorder(shape)}
          onChange={updateSelectedObject}
        />
        <ControlInput
          property="r"
          value={getPropertyOrNull(shape, "r")}
          label="Radius"
          unit="pt"
          disabled={!shape || !supportsRadius(shape)}
          onChange={updateSelectedObject}
        />
      </ControlGrid>
      <Separator />
      <SectionTitle marginTop>Color</SectionTitle>
      <ControlGrid>
        <ColorPicker
          property={isText(shape) ? "color" : "fill"}
          onChange={setFill}
          alpha={getStringPropertyOrNull(shape, "fillOpacity")}
          hex={
            isText(shape)
              ? colorFromStyles(currentStyle)
              : getStringPropertyOrNull(shape, "fill")
          }
          disabled={!shape}
        />
        <ControlInput
          isHEX
          property={isText(shape) ? "color" : "fill"}
          value={
            isText(shape)
              ? colorFromStyles(currentStyle)
              : getStringPropertyOrNull(shape, "fill")
          }
          label="HEX"
          unit=""
          disabled={!shape}
          onChange={setFill}
        />
        <ColorPicker
          property="stroke"
          onChange={updateSelectedObject}
          hex={getStringPropertyOrNull(shape, "stroke")}
          alpha={getStringPropertyOrNull(shape, "strokeOpacity")}
          disabled={!shape || isText(shape)}
        />
        <ControlInput
          isHEX
          property="stroke"
          value={getPropertyOrNull(shape, "stroke")}
          label="HEX"
          unit=""
          disabled={!shape || isText(shape)}
          onChange={updateSelectedObject}
        />
      </ControlGrid>
      <Separator />
      <SectionTitle marginTop>Text</SectionTitle>
      <VerticalControlGrid>
        <ControlSelect
          label="Font"
          disabled={!isText(shape)}
          onChange={setFont}
          options={fontOptions}
        />
      </VerticalControlGrid>
      <ControlGrid>
        <ControlInput
          property="fontSize"
          value={isText(shape) ? sizeFromStyles(currentStyle) : null}
          label="Size"
          unit="pt"
          disabled={!isText(shape)}
          onChange={setFontSize}
        />
        <FontStyleGrid>
          <ControlInputLabel label="Style" disabled={!isText(shape)} />
          {INLINE_STYLES.map(type => (
            <IconButton
              key={type.label}
              size={15}
              style={{ margin: "0 0.25em" }}
              disabled={!isText(shape)}
              onClick={() =>
                updateSelectedObject({
                  editorState: RichUtils.toggleInlineStyle(
                    shape!.editorState!,
                    type.style
                  ),
                })
              }
            >
              {React.createElement(type.icon, {
                color:
                  isText(shape) && currentStyle!.has(type.style)
                    ? AppColors.White
                    : AppColors.MidTextGray,
                size: 13,
              })}
            </IconButton>
          ))}
        </FontStyleGrid>
      </ControlGrid>
      <Separator />
    </>
  );
}
