"use client";

import { ChangeEvent, useState } from "react";

type Props = {
  onSelected?: (file: File) => void;
};

export default function ImageUploader({ onSelected }: Props) {
  const [fileName, setFileName] = useState<string>("");

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setFileName(file.name);
    onSelected?.(file);
  };

  return (
    <label className="block rounded-lg border border-dashed border-gray-300 p-6 text-center">
      <span className="text-sm text-gray-600">Drag and drop or choose an image</span>
      <input className="mt-3 block w-full" type="file" accept="image/*" onChange={onFileChange} />
      {fileName ? <p className="mt-2 text-sm">Selected: {fileName}</p> : null}
    </label>
  );
}
