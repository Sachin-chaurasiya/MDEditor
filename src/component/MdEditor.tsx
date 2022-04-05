import "@toast-ui/editor/dist/toastui-editor.css";
import "./MdEditor.css";
import { Editor } from "@toast-ui/react-editor";
import { Fragment, useRef } from "react";
import { ToolbarItems } from "../constants/widgetConstant";
import { MdEditorProps } from "./MdEditor.types";

const MdEditor = ({
  placeHolder = "Write your description",
  previewStyle = "vertical",
  editorType = "markdown",
  previewHighlight = false,
  useCommandShortcut = false,
  extendedAutolinks = true,
  hideModeSwitch = true,
}: MdEditorProps) => {
  const editorRef = useRef<Editor>(null);

  console.log(editorRef);

  return (
    <Fragment>
      <Editor
        ref={editorRef}
        placeholder={placeHolder}
        previewStyle={previewStyle}
        initialEditType={editorType}
        toolbarItems={ToolbarItems}
        previewHighlight={previewHighlight}
        extendedAutolinks={extendedAutolinks}
        hideModeSwitch={hideModeSwitch}
        useCommandShortcut={useCommandShortcut}
      />
    </Fragment>
  );
};

export default MdEditor;
