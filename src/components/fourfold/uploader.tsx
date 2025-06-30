import React, { useCallback, useState } from "react";
import { Upload, X, FileText, Image, Video, Music, Archive, File, Check, AlertCircle, Loader2 } from "lucide-react";
import { FileMeta, useMultiFileUpload } from "../../hooks/use-uploader";

// File Upload Component
interface FileUploadComponentProps {
  dataType: 'pdf' | 'html' | 'image' | 'textimage' | 'cover' | 'info';
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
  if (type.startsWith('image/')) return <Image className="w-6 h-6" />;
  if (type.startsWith('video/')) return <Video className="w-6 h-6" />;
  if (type.startsWith('audio/')) return <Music className="w-6 h-6" />;
  if (type === 'application/pdf') return <FileText className="w-6 h-6" />;
  if (type.includes('zip') || type.includes('rar')) return <Archive className="w-6 h-6" />;
  return <File className="w-6 h-6" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
    autoUpload: true,
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

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${dragActive 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
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
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full transition-colors ${dragActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <Upload className={`w-12 h-12 ${dragActive ? 'text-blue-600' : 'text-gray-500'}`} />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-500">
              <span>حداکثر حجم: {maxSize}MB</span>
              <span className="hidden sm:block">•</span>
              <span>نوع داده: {dataType}</span>
            </div>
          </div>
          
          <button
            type="button"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            انتخاب فایل
          </button>
        </div>
      </div>

      {/* File List */}
      {fileUploader.files.length > 0 && (
        <div className="mt-8 space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">فایل‌های انتخاب شده</h4>
          
          <div className="space-y-3">
            {fileUploader.files.map((fileMeta) => (
              <div
                key={fileMeta.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 space-x-reverse flex-1">
                  <div className="flex-shrink-0 text-gray-500">
                    {getFileIcon(fileMeta.file)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {fileMeta.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(fileMeta.file.size)} • {fileMeta.dataType}
                    </p>
                  </div>
                  
                  {/* Progress Bar */}
                  {fileMeta.status === 'uploading' && (
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${fileMeta.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{fileMeta.progress}%</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  {/* Status Icon */}
                  {fileMeta.status === 'uploading' && (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  )}
                  {fileMeta.status === 'success' && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                  {fileMeta.status === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => fileUploader.removeFile(fileMeta.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="حذف فایل"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={fileUploader.resetFiles}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              پاک کردن همه
            </button>
            
            <div className="text-sm text-gray-500">
              {fileUploader.files.filter(f => f.status === 'success').length} از {fileUploader.files.length} فایل آپلود شده
            </div>
          </div>
        </div>
      )}
    </div>
  );
}