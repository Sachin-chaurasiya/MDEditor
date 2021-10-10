export type List = Array<{ name: string; url: string }>;
export type PreviewStyle = "tab" | "vertical";
export type EditorType = "markdown" | "wysiwyg";
export type MdEditorProps = {
  mentionList: List;
  mentionTrigger?: string;
  hashTagTrigger?: string;
  placeHolder?: string;
  previewStyle?: PreviewStyle;
  editorType?: EditorType;
  previewHighlight?: boolean;
  extendedAutolinks?: boolean;
  hideModeSwitch?: boolean;
  useCommandShortcut?: boolean;
};
