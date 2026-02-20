"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Redo,
  Underline as UnderlineIcon,
  Undo,
  Unlink,
  Youtube as YoutubeIcon,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: Editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const addYoutubeVideo = useCallback(() => {
    const url = window.prompt("Entrez l'URL de la vidéo YouTube");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        editor.chain().focus().setImage({ src: data.url }).run();
      } catch (error) {
        console.error("Error uploading image:", error);
        alert(
          "Erreur lors de l'upload de l'image: " + (error as Error).message,
        );
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [editor],
  );

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive("bold") ? "bg-gray-200 text-terracotta" : "text-gray-600"}`}
        title="Gras"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive("italic") ? "bg-gray-200 text-terracotta" : "text-gray-600"}`}
        title="Italique"
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive("underline") ? "bg-gray-200 text-terracotta" : "text-gray-600"}`}
        title="Souligné"
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 my-auto" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive("bulletList") ? "bg-gray-200 text-terracotta" : "text-gray-600"}`}
        title="Liste à puces"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive("orderedList") ? "bg-gray-200 text-terracotta" : "text-gray-600"}`}
        title="Liste ordonnée"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 my-auto" />
      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded hover:bg-gray-200 transition ${editor.isActive("link") ? "bg-gray-200 text-terracotta" : "text-gray-600"}`}
        title="Ajouter un lien"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        className="p-2 rounded hover:bg-gray-200 transition text-gray-600 disabled:opacity-30"
        title="Supprimer le lien"
      >
        <Unlink className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1 my-auto" />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className={`p-2 rounded hover:bg-gray-200 transition text-gray-600 disabled:opacity-30`}
        title="Ajouter une image"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin text-terracotta" />
        ) : (
          <ImageIcon className="w-4 h-4" />
        )}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        onClick={addYoutubeVideo}
        className={`p-2 rounded hover:bg-gray-200 transition text-gray-600`}
        title="Ajouter une vidéo YouTube"
      >
        <YoutubeIcon className="w-4 h-4" />
      </button>
      <div className="ml-auto flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-200 transition text-gray-600 disabled:opacity-30"
          title="Annuler"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-200 transition text-gray-600 disabled:opacity-30"
          title="Rétablir"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const TiptapEditor = ({
  value,
  onChange,
  placeholder = "Écrivez ici...",
}: TiptapEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-terracotta underline cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4 shadow-md mx-auto block",
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "aspect-video w-full rounded-lg shadow-md my-4",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[120px] px-4 py-3 text-gray-800",
      },
    },
  });

  return (
    <div className="w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-terracotta focus-within:border-transparent bg-white transition-all overflow-hidden">
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
          margin: 0.5rem 0 !important;
        }
        .ProseMirror ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem !important;
          margin: 0.5rem 0 !important;
        }
        .ProseMirror li {
          margin-bottom: 0.25rem !important;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .ProseMirror iframe {
          width: 100%;
          border-radius: 0.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};
