import "@toast-ui/editor/dist/toastui-editor.css";
import "./MdEditor.css";
import { Editor } from "@toast-ui/react-editor";
import { createRef, Fragment, useState } from "react";
import { ToolbarItems } from "../constants/widgetConstant";
import { MdEditorProps } from "./MdEditor.types";

const MdEditor = ({
  placeHolder = "Write your description",
  previewStyle = "tab",
  editorType = "markdown",
  previewHighlight = false,
  useCommandShortcut = false,
  extendedAutolinks = true,
  hideModeSwitch = true,
}: MdEditorProps) => {
  const editorRef = createRef<Editor>();

  const [editorValue, setEditorValue] = useState("");

  const onChangeHandler = () => {
    const value = editorRef.current?.getInstance().getMarkdown() as string;
    setEditorValue(value);
  };

  return (
    <Fragment>
      <Editor
        ref={editorRef}
        initialValue={editorValue}
        placeholder={placeHolder}
        previewStyle={previewStyle}
        initialEditType={editorType}
        toolbarItems={ToolbarItems}
        previewHighlight={previewHighlight}
        extendedAutolinks={extendedAutolinks}
        hideModeSwitch={hideModeSwitch}
        useCommandShortcut={useCommandShortcut}
        onChange={onChangeHandler}
      />
    </Fragment>
  );
};

export default MdEditor;
