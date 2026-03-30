import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { apiPostStoreUploadUrl } from "../lib/api";
import { DataType } from "../lib/content-types";
import { useAuth } from "../contexts/AuthContext";

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
  onUploadAllComplete?: (ids: FileMeta[]) => void;
  onError?: (file: File, error: any) => void;
  validateFile?: (file: File) => boolean;
  allowPreview?: boolean;
  multiple?: boolean;
  autoUpload?: boolean;
  uploadOptions?: UploadOptions;
}

export function useMultiFileUpload({
  onUploadComplete,
  onUploadAllComplete,
  onError,
  validateFile,
  allowPreview = true,
  multiple = true,
  autoUpload = true,
  uploadOptions = {},
}: UseMultiFileUploadProps = {}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<FileMeta[]>([]);
  const {token} = useAuth();
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, dataType: DataType) => {

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
    async (meta: FileMeta, options: UploadOptions = {}): Promise<string | null> => {
      const mergedOptions = { ...uploadOptions, ...options };
      const controller = new AbortController();
      const formData = new FormData();
      const fileName =
        mergedOptions.generateFileName?.(meta.file) ??
        `${uuidv4()}.${meta.file.name.split(".").pop()}`;

      formData.append("file_name", fileName);
      formData.append("process_document", mergedOptions.processDocument ? "true" : "false");
      formData.append("file", meta.file);
      formData.append("data_type", meta.dataType);
      formData.append("is_public", "true");

      // شروع آپلود در استیت
      setFiles((prev) =>
        prev.map((f) =>
          f.id === meta.id
            ? { ...f, controller, error: null, status: "uploading", progress: 0 }
            : f
        )
      );

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", apiPostStoreUploadUrl());
        xhr.setRequestHeader("Authorization", `Bearer ${token || ""}`);

        // مدیریت پیشرفت
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setFiles((prev) =>
              prev.map((f) => (f.id === meta.id ? { ...f, progress: percent } : f))
            );
          }
        };

        // مدیریت موفقیت
        xhr.onload = () => {
          try {
            const response = JSON.parse(xhr.responseText);
            if (!response?.id) throw new Error("Invalid response: missing ID");

            setFiles((prev) =>
              prev.map((f) =>
                f.id === meta.id
                  ? { ...f, status: "success", uploadedData: response, controller: undefined }
                  : f
              )
            );
            onUploadComplete?.({ ...meta, uploadedData: response });
            resolve(response.id);
          } catch (err) {
            setFiles((prev) =>
              prev.map((f) => (f.id === meta.id ? { ...f, status: "error", error: err } : f))
            );
            onError?.(meta.file, err);
            reject(err);
          }
        };

        // مدیریت خطا
        xhr.onerror = () => {
          const errorText = xhr.statusText || "Upload failed";
          setFiles((prev) =>
            prev.map((f) => (f.id === meta.id ? { ...f, status: "error", error: errorText } : f))
          );
          onError?.(meta.file, errorText);
          reject(errorText);
        };

        // مدیریت Abort
        xhr.onabort = () => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === meta.id ? { ...f, status: "idle", progress: 0, controller: undefined } : f
            )
          );
          resolve(null);
        };

        xhr.send(formData);
      });
    },
    [token, onUploadComplete, onError, uploadOptions]
  );

  const uploadAll = useCallback(async (options?: UploadOptions): Promise<FileMeta[]> => {
    const pendingFiles = files.filter(
      (f) => f.status === "idle" || f.status === "error"
    );

    if (pendingFiles.length === 0) return [];

    const sortedFiles = [...pendingFiles].sort((a, b) =>
      a.file.name.localeCompare(b.file.name, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

    try {
      // ۱. اجرای آپلودها
      await Promise.all(sortedFiles.map((meta) => uploadFile(meta, options)));

      // ۲. دریافت اطلاعات نهایی از استیت با استفاده از یک Promise برای مدیریت Async
      return new Promise((resolve) => {
        setFiles((currentFiles) => {
          const finalUploadedFiles: FileMeta[] = [];
          
          sortedFiles.forEach((sortedFile) => {
            const found = currentFiles.find((f) => f.id === sortedFile.id);
            if (found && found.status === "success") {
              finalUploadedFiles.push(found);
            }
          });

          // ۳. حل خطای "Cannot update a component while rendering"
          // با استفاده از setTimeout، اجرای کالبک را به خارج از چرخه رندر فعلی منتقل می‌کنیم
          if (onUploadAllComplete && finalUploadedFiles.length > 0) {
            setTimeout(() => {
              onUploadAllComplete(finalUploadedFiles);
            }, 0);
          }
          
          resolve(finalUploadedFiles);
          return currentFiles; 
        });
      });

    } catch (err) {
      console.error("Bulk upload failed:", err);
      return [];
    }
  }, [files, uploadFile, onUploadAllComplete]);

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
