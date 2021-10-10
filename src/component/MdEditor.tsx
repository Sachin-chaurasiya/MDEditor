import "@toast-ui/editor/dist/toastui-editor.css";
import "./MdEditor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef, useState } from "react";
import { ToolbarItems } from "../constants/widgetConstant";
import { MdEditorProps } from "./MdEditor.types";

const MdEditor = ({
  mentionList,
  mentionTrigger = "@",
  placeHolder = "Write your description",
  previewStyle = "vertical",
  editorType = "markdown",
  previewHighlight = false,
  useCommandShortcut = false,
  extendedAutolinks = true,
  hideModeSwitch = true,
}: MdEditorProps) => {
  const reWidgetRule = new RegExp(
    "\\[(" + mentionTrigger + "\\S+)\\]\\((\\S+)\\)"
  );
  const editorRef = useRef<Editor>(null);
  const [searchtext, setSearchText] = useState<string>("");
  const [searchList, setSearchList] =
    useState<MdEditorProps["mentionList"]>(mentionList);
  const [isMentioning, setIsmentioning] = useState<boolean>(false);

  const getSuggestionsList = (suggesstion: MdEditorProps["mentionList"]) => {
    const popup = document.createElement("ul");
    popup.classList.add("suggesstion");
    suggesstion.forEach((u) => {
      const li = document.createElement("li");
      li.id = u.url;
      li.innerText = u.name;
      popup.appendChild(li);
    });
    popup.addEventListener("mousedown", (e: any) => {
      const [start, end]: any = editorRef.current?.getInstance().getSelection();
      editorRef.current
        ?.getInstance()
        .replaceSelection(
          `[${mentionTrigger}${e.target.textContent}](${e.target.id})`,
          [start[0], start[1] - searchtext.length - 2],
          end
        );
      setIsmentioning(false);
      setSearchText("");
    });
    return popup;
  };

  useEffect(() => {
    if (searchtext.length > 0) {
      setSearchList((prevList) =>
        prevList.filter((l) =>
          l.name.toLowerCase().includes(searchtext.toLowerCase())
        )
      );
    } else {
      setSearchList(mentionList);
    }
  }, [searchtext, mentionList]);

  useEffect(() => {
    setSearchList(mentionList);
  }, [mentionList]);

  return (
    <>
      <Editor
        ref={editorRef}
        placeholder={placeHolder}
        previewStyle={previewStyle}
        initialEditType={editorType}
        toolbarItems={ToolbarItems}
        previewHighlight={previewHighlight}
        extendedAutolinks={extendedAutolinks}
        hideModeSwitch={hideModeSwitch}
        onKeyup={(_editorType, ev: any) => {
          if (ev.key === mentionTrigger) {
            setIsmentioning(true);
            editorRef.current
              ?.getInstance()
              .addWidget(getSuggestionsList(searchList), "bottom");
          } else {
            const text: string = ev.target.textContent || "";
            if (text.includes(mentionTrigger) && isMentioning) {
              const index = text.lastIndexOf(mentionTrigger);
              setSearchText(text.slice(index + 1));
              editorRef.current
                ?.getInstance()
                .addWidget(getSuggestionsList(searchList), "bottom");
            } else {
              setSearchText("");
            }
          }
        }}
        onKeydown={(_e, e) => {
          if (e.key === "Backspace") {
            setIsmentioning(false);
          }
        }}
        widgetRules={[
          {
            rule: reWidgetRule,
            toDOM(text) {
              const rule = reWidgetRule;
              const matched = text.match(rule);
              const span = document.createElement("span");
              span.innerHTML = `<a class="widget-anchor" href="${matched?.[2]}">${matched?.[1]}</a>`;
              return span;
            },
          },
        ]}
        useCommandShortcut={useCommandShortcut}
      />
    </>
  );
};

export default MdEditor;
