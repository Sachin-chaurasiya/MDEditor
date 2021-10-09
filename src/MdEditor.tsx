import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef, useState } from "react";

const MdEditor = ({ list }: { list: Array<{ name: string; url: string }> }) => {
  const editorRef = useRef<Editor>(null);
  const reWidgetRule = /\[(@\S+)\]\((\S+)\)/;
  const [searchtext, setSearchText] = useState<string>("");
  const [searchList, setSearchList] =
    useState<Array<{ name: string; url: string }>>(list);
  const [isMentioning, setIsmentioning] = useState<boolean>(false);
  const getSuggestionsList = (
    suggesstion: Array<{ name: string; url: string }>
  ) => {
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
          `[@${e.target.textContent}](${e.target.id})`,
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
      setSearchList(list);
    }
  }, [searchtext, list]);

  useEffect(() => {
    setSearchList(list);
  }, [list]);

  return (
    <>
      <Editor
        ref={editorRef}
        placeholder="Write your description"
        previewStyle="vertical"
        initialEditType="markdown"
        toolbarItems={[
          ["heading", "bold", "italic"],
          ["hr"],
          ["ul", "ol"],
          ["link"],
        ]}
        previewHighlight={false}
        extendedAutolinks={true}
        hideModeSwitch={true}
        onKeyup={(_editorType, ev: any) => {
          if (ev.key === "@") {
            setIsmentioning(true);
            editorRef.current
              ?.getInstance()
              .addWidget(getSuggestionsList(searchList), "bottom");
          } else {
            const text: string = ev.target.textContent || "";
            if (text.includes("@") && isMentioning) {
              const index = text.lastIndexOf("@");
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
        useCommandShortcut={true}
      />
    </>
  );
};

export default MdEditor;
