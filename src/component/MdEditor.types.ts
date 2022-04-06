export type PreviewStyle = "tab" | "vertical";
export type EditorType = "markdown" | "wysiwyg";
export type MdEditorProps = {
  placeHolder?: string;
  previewStyle?: PreviewStyle;
  editorType?: EditorType;
  previewHighlight?: boolean;
  extendedAutolinks?: boolean;
  hideModeSwitch?: boolean;
  useCommandShortcut?: boolean;
};
