import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { apiPostStoreUploadUrl } from "../lib/api";
import { DataType } from "../lib/content-types";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UploadOptions {
  bucketName?: string;
  processDocument?: boolean;
  generateFileName?: (file: File) => string;
}

export interface FileMeta {
  id: string;
  file: File;
  previewUrl?: string;
  progress: number;
  status: UploadStatus;
  dataType: DataType;
  error?: any;
  controller?: AbortController;
  uploadedData?: any;
}

export interface UseMultiFileUploadProps {
  onUploadComplete?: (meta: FileMeta) => void;
  onError?: (file: File, error: any) => void;
  validateFile?: (file: File) => boolean;
  allowPreview?: boolean;
  multiple?: boolean;
  autoUpload?: boolean;
  uploadOptions?: UploadOptions;
}

export function useMultiFileUpload({
  onUploadComplete,
  onError,
  validateFile,
  allowPreview = true,
  multiple = true,
  autoUpload = true,
  uploadOptions = {},
}: UseMultiFileUploadProps = {}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileMeta[]>([]);
  
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, dataType: DataType) => {

      // console.log("handleFileSelect", e.target.files);

      const selectedFiles = Array.from(e.target.files || []);
      const newFiles: FileMeta[] = [];

      selectedFiles.forEach((file) => {
        if (validateFile && !validateFile(file)) return;

        const id = uuidv4();
        const isMedia = file.type.startsWith("image/") || file.type.startsWith("video/");
        const previewUrl =
          allowPreview && isMedia
            ? URL.createObjectURL(file)
            : undefined;
            
        // console.log("previewUrl", previewUrl);

        newFiles.push({
          id,
          file,
          dataType,
          previewUrl,
          progress: 0,
          status: "idle",
        });
      });

      setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles));
    },
    [validateFile, allowPreview, multiple]
  );

  const uploadFile = useCallback(
    async (meta: FileMeta, options: UploadOptions = {}) => {
      // console.log("uploading", meta);
      const mergedOptions = { ...uploadOptions, ...options };
      const controller = new AbortController();
      const formData = new FormData();
      const fileName =
        mergedOptions.generateFileName?.(meta.file) ??
        `${uuidv4()}.${meta.file.name.split(".").pop()}`;

      formData.append("file_name", fileName);
      // formData.append("bucket_name", mergedOptions.bucketName || "");
      formData.append("process_document", mergedOptions.processDocument ? "true" : "false");
      formData.append("file", meta.file);
      formData.append("data_type", meta.dataType);
      formData.append("is_public", "true");
      // console.log("uploading", meta);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === meta.id
            ? { ...f, controller, error: null, status: "uploading", progress: 0 }
            : f
        )
      );

      try {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", apiPostStoreUploadUrl());
        xhr.setRequestHeader("Authorization", `Bearer ${process.env.NEXT_PUBLIC_TOKEN || ""}`);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setFiles((prev) =>
              prev.map((f) => (f.id === meta.id ? { ...f, progress: percent } : f))
            );
          }
        };

        xhr.onload = () => {
          try {
            const response = JSON.parse(xhr.responseText);
            console.log(response)
            if (!response?.id) {
              throw new Error("Invalid response: missing ID");
            }
            setFiles((prev) =>
              prev.map((f) =>
                f.id === meta.id
                  ? { ...f, status: "success", uploadedData: response, controller: undefined }
                  : f
              )
            );
            onUploadComplete?.({ ...meta, uploadedData: response });
          } catch (err) {
            console.log('test', err)
            setFiles((prev) =>
              prev.map((f) =>
                f.id === meta.id ? { ...f, status: "error", error: err } : f
              )
            );
            onError?.(meta.file, err);
          }
        };

        xhr.onerror = () => {
          console.log('error')
          setFiles((prev) =>
            prev.map((f) =>
              f.id === meta.id ? { ...f, status: "error", error: xhr.statusText } : f
            )
          );
          onError?.(meta.file, xhr.statusText);
        };

        xhr.onabort = () => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === meta.id ? { ...f, status: "idle", progress: 0, controller: undefined } : f
            )
          );
        };

        xhr.send(formData);
      } catch (err) {
        console.error(err);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === meta.id ? { ...f, status: "error", error: err } : f
          )
        );
        onError?.(meta.file, err);
      }
    },
    [process.env.NEXT_PUBLIC_TOKEN, onUploadComplete, onError, uploadOptions]
  );

  const uploadAll = useCallback((options?: UploadOptions) => {
    files.forEach((meta) => {
      if (meta.status === "idle" || meta.status === "error") {
        uploadFile(meta, options);
      }
    });
  }, [files, uploadFile]);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const toRemove = prev.find((f) => f.id === id);
      toRemove?.controller?.abort();
      if (toRemove?.previewUrl) {
        URL.revokeObjectURL(toRemove.previewUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const resetFiles = useCallback(() => {
    files.forEach((f) => {
      f.controller?.abort();
      if (f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl);
      }
    });
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [files]);

  useEffect(() => {
    if (autoUpload) {
      files.forEach((f) => {
        if (f.status === "idle" || f.status === "error") {
          uploadFile(f)
        }
      })
    }

    return () => {
      files.forEach((f) => {
        f.controller?.abort();
        if (f.previewUrl) {
          URL.revokeObjectURL(f.previewUrl);
        }
      });
    };
  }, [files, autoUpload,uploadFile]);

  return {
    files,
    fileInputRef,
    handleFileSelect,
    uploadAll,
    uploadFile,
    removeFile,
    resetFiles,
  };
}
