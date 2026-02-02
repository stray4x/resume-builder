"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { List, ListOrdered } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

import type { Fragment } from "@tiptap/pm/model";

type EditorBtn = "bold" | "italic" | "bulletList" | "orderedList";

type Props = {
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  maxLength?: number;
};

export const TextEditor: React.FC<Props> = ({
  className,
  value,
  maxLength,
  onChange,
}) => {
  const [activeBtns, setActiveBtns] = useState<EditorBtn[]>([]);
  const isInitialMount = useRef(true);

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `tiptap-editor h-48 overflow-auto border p-2 rounded-lg ${className}`,
      },
      handlePaste(view, _, slice) {
        if (!maxLength) {
          return false;
        }

        const currentLength = JSON.stringify(
          view.state.doc.content.toJSON(),
        ).length;
        const sliceLength = JSON.stringify(slice.content.toJSON()).length;
        const newLength = currentLength + sliceLength;

        if (newLength > maxLength) {
          toast.error("Text is too long");
          return true;
        }

        return false;
      },
      handleTextInput(view, _from, _to, text) {
        if (!maxLength) {
          return false;
        }

        const currentLength = JSON.stringify(
          view.state.doc.content.toJSON(),
        ).length;
        const newLength =
          currentLength + JSON.stringify([{ type: "text", text }]).length;

        return newLength > maxLength;
      },
    },

    onUpdate({ editor }) {
      if (isInitialMount.current) {
        return;
      }
      onChange?.(JSON.stringify(editor.getJSON().content));
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const current = editor.getJSON().content;

    if (value?.length && JSON.stringify(current) !== value) {
      editor.commands.setContent(JSON.parse(value) as Fragment);
      isInitialMount.current = false;
    }
  }, [value, editor]);

  useEffect(() => {
    if (!editor) return;

    const updateActiveBtns = () => {
      const next: EditorBtn[] = [];

      if (editor.isActive("bold")) next.push("bold");
      if (editor.isActive("italic")) next.push("italic");

      if (editor.isActive("bulletList")) next.push("bulletList");
      if (editor.isActive("orderedList")) next.push("orderedList");

      setActiveBtns(next);
    };

    editor.on("selectionUpdate", updateActiveBtns);
    editor.on("transaction", updateActiveBtns);

    return () => {
      editor.off("selectionUpdate", updateActiveBtns);
      editor.off("transaction", updateActiveBtns);

      isInitialMount.current = true;
    };
  }, [editor]);

  const getVariant = (btn: EditorBtn) =>
    activeBtns.includes(btn) ? "default" : "outline";

  return (
    <div>
      <div className="mb-2 flex gap-1">
        <Button
          className="w-8 font-bold"
          variant={getVariant("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          B
        </Button>

        <Button
          className="w-8 italic"
          variant={getVariant("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          I
        </Button>

        <Button
          className="w-8"
          variant={getVariant("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List />
        </Button>

        <Button
          className="w-8"
          variant={getVariant("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};
