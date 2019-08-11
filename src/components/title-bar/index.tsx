import * as React from "react";
import styled from "styled-components";
import { Colors } from "../../util/constants";
import PublicationsIcon from "../icons/publications";
import VectorShapeIcon from "../ui/icons/vector-shape";
import FloppyDiskIcon from "../ui/icons/floppy-disk";
import DownloadIcon from "../ui/icons/download";
import CopyIcon from "../ui/icons/copy";
import CutIcon from "../ui/icons/cut";
import PasteIcon from "../ui/icons/paste";
import ZoomInIcon from "../ui/icons/zoom-in";
import ZoomOutIcon from "../ui/icons/zoom-out";
import Spacer from "../ui/spacer";
import TitleBarButton from "./title-bar-button";
import { StateContext } from "../../contexts/app-state";
import downloadPdfAction from "../../util/download-pdf";
import { ClipboardAction } from "../../types/data";
import Menu, { MenuDivider, MenuItem } from "../ui/menu";
import { Shapes } from "../../util/new-shapes";

const Container = styled.header`
  background: ${Colors.TitleBar.Background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 25px;
  z-index: 1;
`;

const ControlGroup = styled.div`
  padding: 0 0.5em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 13px;
  color: ${Colors.TitleBar.Text};
`;

const ZoomLabel = styled.span<{ disabled: boolean }>`
  font-size: 10px;
  font-weight: 600;
  line-height: 25px;
  width: 35px;
  text-align: center;
  color: ${({ disabled }) =>
    disabled ? Colors.TitleBar.DisabledText : Colors.TitleBar.Text};
`;

const LeftControlGroup = styled(ControlGroup)`
  font-weight: bold;
  svg {
    margin-right: 0.25em;
  }
`;

export default function TitleBar() {
  const {
    actions,
    currentDocument,
    clipboardContents,
    selectedObject,
    zoom,
    user,
    userFetching,
  } = React.useContext(StateContext);
  const hasValidUserAuthenticated = !userFetching && !!user;
  const hasNoUserAuthenticated = !userFetching && !user;

  const saveDocument = React.useCallback(() => actions.saveDocument(), [
    actions,
  ]);
  const downloadPdf = React.useCallback(
    () =>
      actions
        .saveDocument()
        .then(({ data }) => downloadPdfAction(data.saveDocument)),
    [actions]
  );
  const zoomIn = React.useCallback(
    () => actions.setZoom(Math.min(4.0, zoom + 0.25)),
    [actions, zoom]
  );
  const zoomOut = React.useCallback(
    () => actions.setZoom(Math.max(0.25, zoom - 0.25)),
    [actions, zoom]
  );
  return (
    <Container>
      <LeftControlGroup>
        <Menu
          renderButton={(setMenuActive, menuActive) => (
            <TitleBarButton
              active={menuActive}
              onPress={() => setMenuActive(prevState => !prevState)}
            >
              <PublicationsIcon
                stroke={
                  menuActive
                    ? Colors.Button.ActiveBackground
                    : Colors.TitleBar.Background
                }
                size={20}
              />
              Publications
            </TitleBarButton>
          )}
          renderMenu={
            <>
              {currentDocument && hasValidUserAuthenticated && (
                <>
                  <MenuItem onClick={() => actions.setSaveDialogVisible(true)}>
                    View All Documents
                  </MenuItem>
                  <MenuDivider />
                </>
              )}
              {hasValidUserAuthenticated && (
                <MenuItem onClick={actions.logout}>Log Out</MenuItem>
              )}
              {hasNoUserAuthenticated && (
                <>
                  <MenuItem onClick={() => actions.setLoginModalVisible(true)}>
                    Log In…
                  </MenuItem>
                  <MenuItem onClick={() => actions.setLoginModalVisible(true)}>
                    Create Account…
                  </MenuItem>
                </>
              )}
              <MenuDivider />

              <MenuItem onClick={() => actions.setAboutModalVisible(true)}>
                About Publications…
              </MenuItem>
            </>
          }
        />
      </LeftControlGroup>
      {currentDocument && (
        <>
          <ControlGroup>
            <TitleBarButton disabled={!currentDocument} onPress={saveDocument}>
              <FloppyDiskIcon />
              Save
            </TitleBarButton>
            <TitleBarButton disabled={!currentDocument} onPress={downloadPdf}>
              <DownloadIcon />
              PDF
            </TitleBarButton>
            <Menu
              renderButton={(setMenuActive, active) => (
                <TitleBarButton
                  disabled={!currentDocument}
                  active={active}
                  onPress={() => setMenuActive(prevState => !prevState)}
                >
                  <VectorShapeIcon />
                  Objects
                </TitleBarButton>
              )}
              renderMenu={
                <>
                  <MenuItem onClick={() => actions.addObject(Shapes.Rectangle)}>
                    Rectangle
                  </MenuItem>
                  <MenuItem onClick={() => actions.addObject(Shapes.Ellipse)}>
                    Ellipse
                  </MenuItem>
                  <MenuItem onClick={() => actions.addObject(Shapes.Text)}>
                    Text Box
                  </MenuItem>
                </>
              }
            />
            <Spacer width="1em" />
            <TitleBarButton
              disabled={!currentDocument || !selectedObject}
              onPress={() => actions.handleClipboardAction(ClipboardAction.Cut)}
            >
              <CutIcon />
              Cut
            </TitleBarButton>
            <TitleBarButton
              disabled={!currentDocument || !selectedObject}
              onPress={() =>
                actions.handleClipboardAction(ClipboardAction.Copy)
              }
            >
              <CopyIcon />
              Copy
            </TitleBarButton>
            <TitleBarButton
              disabled={!currentDocument || !clipboardContents}
              onPress={() =>
                actions.handleClipboardAction(ClipboardAction.Paste)
              }
            >
              <PasteIcon />
              Paste
            </TitleBarButton>
            <Spacer width="1em" />
            <TitleBarButton
              disabled={!currentDocument}
              noLabel
              onPress={zoomIn}
            >
              <ZoomInIcon />
            </TitleBarButton>
            <ZoomLabel disabled={!currentDocument}>{zoom * 100}%</ZoomLabel>
            <TitleBarButton
              disabled={!currentDocument}
              noLabel
              onPress={zoomOut}
            >
              <ZoomOutIcon />
            </TitleBarButton>
          </ControlGroup>
        </>
      )}
    </Container>
  );
}
