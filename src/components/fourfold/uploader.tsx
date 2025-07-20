import React, { useCallback, useState } from "react";
import { Upload, X, FileText, Image, Video, Music, Archive, File, Check, AlertCircle, Loader2, CloudUpload, Trophy, UploadIcon } from "lucide-react";

import { FileMeta, useMultiFileUpload } from "../../hooks/use-uploader";
import { DataType } from "../../lib/content-types";
import { Button } from "../ui/button";
import { useLanguage } from "../../lib/language-context";

// File Upload Component
interface FileUploadComponentProps {
  dataType: DataType;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  onUploadComplete?: (meta: FileMeta) => void;
  onError?: (file: File, error: any) => void;
  className?: string;
  title?: string;
  description?: string;
  processDocument?: boolean;
}

const getFileIcon = (file: File) => {
  const type = file.type;
  if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
  if (type.startsWith('video/')) return <Video className="w-4 h-4" />;
  if (type.startsWith('audio/')) return <Music className="w-4 h-4" />;
  if (type === 'application/pdf') return <FileText className="w-4 h-4" />;
  if (type.includes('zip') || type.includes('rar')) return <Archive className="w-4 h-4" />;
  return <File className="w-4 h-4" />;
};

const formatFileSize = (bytes: number, language="fa") => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = [{'en': 'Bytes', 'fa': 'بایت'}, {'en': 'KB', 'fa': 'کیلوبایت'}, {'en': 'MB', 'fa': 'مگابایت'}, {'en': 'GB', 'fa': 'گیگابایت'}];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i][language==="fa"?"fa":"en"];
};

export default function FileUploadComponent({
  dataType,
  multiple = true,
  accept,
  maxSize = 10, // 10MB default
  onUploadComplete,
  onError,
  className = "",
  title = "آپلود فایل",
  description = "فایل‌های خود را انتخاب کنید یا اینجا بکشید",
  processDocument = false
}: FileUploadComponentProps) {
  const [dragActive, setDragActive] = useState(false);
  const {language} = useLanguage();
  const validateFile = useCallback((file: File) => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      alert(`حجم فایل نباید بیشتر از ${maxSize}MB باشد`);
      return false;
    }
    return true;
  }, [maxSize]);

  const fileUploader = useMultiFileUpload({
    multiple,
    validateFile,
    onUploadComplete,
    onError,
    autoUpload: false,
    uploadOptions: {
      processDocument: processDocument
    }
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const mockEvent = {
        target: { files: e.dataTransfer.files }
      } as React.ChangeEvent<HTMLInputElement>;
      fileUploader.handleFileSelect(mockEvent, dataType);
    }
  }, [fileUploader, dataType]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    fileUploader.handleFileSelect(e, dataType);
  }, [fileUploader, dataType]);

  const openFileDialog = () => {
    fileUploader.fileInputRef.current?.click();
  };

  const pendingFiles = fileUploader.files.filter(f => f.status === 'idle');
  const uploadingFiles = fileUploader.files.filter(f => f.status === 'uploading');
  const successFiles = fileUploader.files.filter(f => f.status === 'success');

  return (
    <div className={`w-full bg-gray-900 rounded-lg border border-gray-700 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 cursor-pointer
          ${dragActive 
            ? 'border-blue-500 bg-blue-950/30' 
            : 'border-gray-600 hover:border-blue-400 hover:bg-gray-800/50'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileUploader.fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-wrap items-center justify-center space-x-3 space-x-reverse">
          <div className={`p-2 rounded-full transition-colors ${dragActive ? 'bg-blue-900/50' : 'bg-gray-800'}`}>
            <Upload className={`w-6 h-6 ${dragActive ? 'text-blue-400' : 'text-gray-400'}`} />
          </div>
          
          <div className="text-right">
            <h3 className="text-sm font-medium text-gray-200">{title}</h3>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            انتخاب فایل
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-gray-500">
          <span>حداکثر: {maxSize}MB</span>
          <span>نوع</span>
          <span>{dataType}</span>
        </div>
      </div>

      {/* File List */}
      {fileUploader.files.length > 0 && (
        <div className="mt-4 p-4 border-t border-gray-700">
          <div className="space-y-2">
            {fileUploader.files.map((fileMeta: FileMeta) => (
              <div
                key={fileMeta.id}
                className="flex flex-wrap items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-750 transition-colors"
              >
                <div className="flex flex-wrap items-center space-x-3 space-x-reverse flex-1">
                  {/* Preview Image */}
                  {fileMeta.previewUrl && (
                    <div className="flex-shrink-0">
                      <img 
                        src={fileMeta.previewUrl} 
                        alt="Preview" 
                        className="w-8 h-8 rounded object-cover"
                      />
                    </div>
                  )}
                  
                  {/* File Icon */}
                  {!fileMeta.previewUrl && (
                    <div className="flex-shrink-0 text-gray-400">
                      {getFileIcon(fileMeta.file)}
                    </div>
                  )}
                  <p className="text-xs lg:text-md text-wrap font-medium text-gray-200 truncate">
                      {fileMeta?.file.name}
                  </p>
                  <div className="flex-1 min-w-0">
                    {fileMeta?.uploadedData?.id && <p className="text-xs font-medium text-gray-200 truncate">
                      <span>ID: </span>
                      {fileMeta?.uploadedData?.id}
                    </p>}
                    <p className="text-xs font-medium text-gray-200 truncate">
                      اندازه فایل
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(fileMeta.file.size, language)}
                    </p>
                  </div>
                  
                  {/* Progress Bar */}
                  {fileMeta.status === 'uploading' && (
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${fileMeta.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1 text-center">{fileMeta.progress}%</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  {/* Status Icon */}
                  {fileMeta.status === 'idle' && (
                    <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  )}
                  {fileMeta.status === 'uploading' && (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  )}
                  {fileMeta.status === 'success' && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}

                  {fileMeta.status === 'error' && (
                    <div className="flex justify-start items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                  
                  {(fileMeta.status === 'idle' || fileMeta.status === 'error') && (
                    <button
                      onClick={() => fileUploader.uploadFile(fileMeta)}
                      className="p-1 text-gray-500 hover:text-blue-400 transition-colors"
                      title="بارگذاری"
                    >
                      <UploadIcon className="w-4 h-4" />
                    </button>
                  )}
                  
                  {/* Remove Button */}
                  {fileMeta.status !== 'uploading' && (
                    <button
                      onClick={() => fileUploader.removeFile(fileMeta.id)}
                      className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                      title="حذف فایل"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center gap-2 pt-3 mt-3 border-t border-gray-700">
            <button
              onClick={fileUploader.resetFiles}
              className="px-3 py-1.5 text-sm text-gray-400 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
              disabled={uploadingFiles.length > 0}
            >
              پاک کردن همه
            </button>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-xs text-gray-500">
                {successFiles.length} از {fileUploader.files.length} فایل آپلود شده
              </div>
              
              {pendingFiles.length > 0 && (
                <button
                  onClick={() => fileUploader.uploadAll()}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-2 space-x-reverse"
                  disabled={uploadingFiles.length > 0}
                >
                  <CloudUpload className="w-4 h-4" />
                  <span>آپلود ({pendingFiles.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}