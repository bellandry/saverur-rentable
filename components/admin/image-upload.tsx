"use client";

import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  label,
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
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

        onChange(data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert(
          "Erreur lors de l'upload de l'image: " + (error as Error).message,
        );
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      {value ? (
        <div className={cn("relative", className)}>
          <Image
            fill
            src={value}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
            isDragActive
              ? "border-terracotta bg-terracotta/5"
              : "border-gray-300 hover:border-terracotta"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          {uploading ? (
            <p className="text-gray-600">Upload en cours...</p>
          ) : (
            <>
              <p className="text-gray-600 mb-1">
                Glissez une image ici ou cliquez pour sélectionner
              </p>
              <p className="text-sm text-gray-500">PNG, JPG, JPEG ou WEBP</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
