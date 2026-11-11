import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { useState, useEffect, useRef } from "react";
import { getSocialSource } from "../../utils/socialSource";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  PlaySquare,
  Code2,
  Eraser,
  Undo2,
  Redo2,
} from "lucide-react";

const ToolbarBtn = ({ onClick, active, title, children, disabled }) => (
  <button
    type="button"
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={"rte-btn" + (active ? " rte-btn--active" : "")}
    title={title}
    aria-label={title}
    disabled={disabled}
    aria-pressed={active}
  >
    {children}
  </button>
);

const Divider = () => <span className="rte-divider" />;

const RichTextEditor = ({ value, onChange, onSocialPaste }) => {
  const [mode, setMode] = useState("visual"); // "visual" | "html"
  const [htmlValue, setHtmlValue] = useState(value || "");
  const socialPasteRef = useRef(onSocialPaste);
  useEffect(() => {
    socialPasteRef.current = onSocialPaste;
  }, [onSocialPaste]);

  const editor = useEditor({
    editorProps: {
      handlePaste: (_view, event) => {
        const text = event.clipboardData?.getData("text/plain")?.trim();
        const source = getSocialSource(text);
        if (source && socialPasteRef.current) {
          event.preventDefault();
          socialPasteRef.current(source.url);
          return true;
        }
        return false;
      },
    },
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      Image,
      Youtube.configure({ controls: true }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setHtmlValue(html);
      onChange(html);
    },
  });

  // sync external value when loaded or cleared
  useEffect(() => {
    if (!editor) return;
    const nextVal = value || "";
    if (nextVal !== htmlValue && editor.getHTML() !== nextVal) {
      editor.commands.setContent(nextVal, false);
      setHtmlValue(nextVal);
    }
  }, [editor, value]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!editor) return null;

  const switchToHtml = () => {
    setHtmlValue(editor.getHTML());
    setMode("html");
  };

  const switchToVisual = () => {
    editor.commands.setContent(htmlValue, false);
    setMode("visual");
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addYoutube = () => {
    const url = window.prompt("Enter YouTube URL:");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  return (
    <div className="rte">
      <div className="rte-toolbar">
        <div className="rte-toolbar__left">
          <ToolbarBtn
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
            disabled={!editor.can().undo()}
          >
            <Undo2 size={14} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
            disabled={!editor.can().redo()}
          >
            <Redo2 size={14} />
          </ToolbarBtn>
          <Divider />
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={14} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={14} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={14} />
          </ToolbarBtn>
          <Divider />
          <ToolbarBtn
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            H1
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            H2
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            H3
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <Quote size={14} />
          </ToolbarBtn>
          <Divider />
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={14} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Ordered List"
          >
            <ListOrdered size={14} />
          </ToolbarBtn>
          <Divider />
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft size={14} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter size={14} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight size={14} />
          </ToolbarBtn>
          <Divider />
          <ToolbarBtn
            onClick={addLink}
            active={editor.isActive("link")}
            title="Insert Link"
          >
            <LinkIcon size={14} />
          </ToolbarBtn>
          <ToolbarBtn onClick={addImage} title="Insert Image">
            <ImageIcon size={14} />
          </ToolbarBtn>
          <ToolbarBtn onClick={addYoutube} title="Embed YouTube">
            <PlaySquare size={14} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Inline Code"
          >
            <Code2 size={14} />
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
            title="Clear Formatting"
          >
            <Eraser size={14} />
          </ToolbarBtn>
        </div>
        <div className="rte-toolbar__right">
          <button
            type="button"
            className={
              "rte-mode-btn" +
              (mode === "visual" ? " rte-mode-btn--active" : "")
            }
            onClick={switchToVisual}
          >
            Visual
          </button>
          <button
            type="button"
            className={
              "rte-mode-btn" + (mode === "html" ? " rte-mode-btn--active" : "")
            }
            onClick={switchToHtml}
          >
            HTML
          </button>
        </div>
      </div>
      {mode === "visual" ? (
        <EditorContent editor={editor} className="rte-content" />
      ) : (
        <textarea
          className="rte-html-textarea"
          value={htmlValue}
          onPaste={(event) => {
            const source = getSocialSource(
              event.clipboardData.getData("text/plain").trim(),
            );
            if (source && onSocialPaste) {
              event.preventDefault();
              onSocialPaste(source.url);
            }
          }}
          onChange={(e) => {
            setHtmlValue(e.target.value);
            onChange(e.target.value);
          }}
          spellCheck={false}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
