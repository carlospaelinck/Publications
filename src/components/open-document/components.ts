import styled from "styled-components";
import { ModalContent } from "../modal";
import { Colors } from "../../util/constants";
import FormInput from "../ui/form-input";

export const OpenDocumentContainer = styled(ModalContent)`
  width: 85%;
  height: 70%;
  padding: 0 0 51px;
  display: flex;
  flex-direction: row;
  background: ${Colors.FileOpen.BrowserBackground};
`;

export const HeaderContainer = styled.div`
  padding: 1.5em 1.5em 1em;
`;

export const DeleteConfirmationBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  height: 65px;
  background: ${Colors.FileOpen.DeleteConfirmationBarBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 1px 1px 0 hsla(0, 0%, 100%, 0.15),
    inset -1px 0 0 hsla(0, 0%, 100%, 0.1);
  border-radius: 8px 8px 0 0;
  padding: 0 16px;
  color: ${Colors.FileOpen.DeleteConfirmText};
  font-weight: bold;
`;

export const DeleteWarning = styled.div`
  font-size: 0.85em;
  margin-top: 3px;
  font-weight: 400;
  font-style: italic;
`;

export const FileBrowserBaseContainer = styled.div`
  width: calc(100% - 1em);
  flex: 1;
  border-radius: 0;
  padding: 1.5em 0.5em;
`;

export const FileBrowserLoadingContainer = styled(FileBrowserBaseContainer)`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const FileBrowserContentContainer = styled(FileBrowserBaseContainer)<{
  disabled?: boolean;
}>`
  border-top: 1px solid ${Colors.OpenDocument.FileBrowserBorder};
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  overflow: ${({ disabled }) => (disabled ? "none" : "scroll")};
`;

export const FileBrowserContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const SearchInputContainer = styled.div`
  background: ${Colors.Modal.ModalBackground};
  border-radius: 8px 8px 0 0;
  box-shadow: inset 1px 1px 0 hsla(0, 0%, 100%, 0.1),
    inset -1px 0 0 hsla(0, 0%, 100%, 0.05);
  display: flex;
  flex-direction: row;

  button {
    margin: 15px 8px 15px 0;
    :last-child {
      margin-right: 15px;
    }
  }
`;

export const SearchInput = styled(FormInput)`
  flex: 1;
  margin: 15px;
  text-align: center;
`;
