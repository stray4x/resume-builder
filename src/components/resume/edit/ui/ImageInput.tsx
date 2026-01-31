"use client";

import Compressor from "compressorjs";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  image: string;
  className?: string;
  setImage: (value: string) => void;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const base64ToBlob = (base64: string) => {
  const byteCharacters = atob(base64);

  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "application/octet-stream" });
};

export const ImageInput: React.FC<Props> = ({ className, image, setImage }) => {
  const t = useTranslations();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        if (reader.result) {
          const base64Data = (reader.result as string).split(",")[1]!;
          setImage(base64Data);
        }
      };
    }
  }, [file]);

  useEffect(() => {
    if (image) {
      const blob = base64ToBlob(image);
      setImageBlob(blob);
    }
  }, [image]);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large");
        return;
      }

      new Compressor(file, {
        quality: 0.6,
        width: 120,
        height: 120,
        resize: "cover",
        success(result) {
          setFile(result as File);
        },
        error() {
          toast.error("Something went wrong");
        },
      });

      if (inputRef.current) {
        inputRef.current.files = null;
        inputRef.current.value = "";
      }
    }
  };

  const handleDeleteImg = () => {
    setFile(null);
    setImageBlob(null);
    setImage("");
  };

  return (
    <div className={className}>
      <Label htmlFor="photo" className="mb-2">
        {t("photo")}
      </Label>
      <div className="flex gap-4">
        {imageBlob && (
          <Image
            src={URL.createObjectURL(imageBlob)}
            alt="resume photo"
            width={40}
            height={40}
            className="object-cover"
          />
        )}
        <Button
          variant="outline"
          className={`${imageBlob ? "w-[calc(100%-110px)]" : "w-full"} transition-none`}
          onClick={handleUploadClick}
        >
          {imageBlob ? t("changePhoto") : t("uploadPhoto")}
        </Button>
        {imageBlob && (
          <Button onClick={handleDeleteImg} variant="destructive">
            <Trash />
          </Button>
        )}
        <input
          ref={inputRef}
          type="file"
          id="photo"
          onChange={handleInputChange}
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
