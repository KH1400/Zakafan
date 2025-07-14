"use client"
import { Check, Copy, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";

interface TextCardProps {
  content: string;
  onEdit?: (newContent: string) => void;
  onDelete?: () => void;
  onCopy?: () => void;
}

const TextCard: React.FC<TextCardProps> = ({ 
  content, 
  onEdit = () => {},
  onDelete = () => {},
  onCopy = () => {}
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy();
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditContent(content);
  };

  const handleSave = () => {
    onEdit(editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  // Function to format text with hashtags (supports Persian)
  const formatText = (text: string) => {
    // Regex to match hashtags with Persian, English, numbers and underscores
    const hashtagRegex = /#[\u0600-\u06FF\w_]+/g;
    const parts = text.split(hashtagRegex);
    const hashtags = text.match(hashtagRegex) || [];
    
    const result = [];
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) {
        result.push(parts[i]);
      }
      if (hashtags[i]) {
        result.push(
          <span key={i} className="inline-block text-amber-500 from-blue-400 to-purple-500 px-2 py-1 rounded-full text-sm font-medium mx-1 shadow-lg transition-all cursor-pointer hover:scale-105">
            {hashtags[i]}
          </span>
        );
      }
    }
    return result;
  };

  return (
    <div className="mx-auto bg-gray-900 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border border-gray-800">
      {/* Header gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-500 to-amber-500"></div>
      
      {/* Content */}
      <div className="p-8">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl opacity-50"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-gray-700 text-gray-100 rounded-lg p-4 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none min-h-[120px] leading-relaxed text-md font-medium"
                placeholder="متن خود را وارد کنید..."
                autoFocus
              />
            ) : (
              <p className="text-gray-100 leading-relaxed whitespace-pre-wrap text-md font-medium">
                {formatText(content)}
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 text-md px-4 py-1 bg-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-600 hover:shadow-md transition-all duration-200"
                title="لغو"
              >
                <X size={18} />
                <span>لغو</span>
              </button>
              
              <button
                onClick={handleSave}
                className="flex items-center gap-2 text-md px-4 py-1 bg-green-600 text-white rounded-xl font-medium hover:bg-green-500 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                title="ذخیره"
              >
                <Check size={18} />
                <span>ذخیره</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 text-md px-4 py-1 rounded-xl font-medium transition-all duration-200 ${
                  copied 
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/25' 
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700 hover:shadow-md border border-gray-700'
                }`}
                title="کپی کردن"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'کپی شد!' : 'کپی'}</span>
              </button>
              
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 text-md px-4 py-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                title="ویرایش"
              >
                <Edit size={18} />
                <span>ویرایش</span>
              </button>
              
              <button
                onClick={onDelete}
                className="flex items-center gap-2 text-md px-4 py-1 bg-red-600 text-white rounded-xl font-medium hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200"
                title="حذف"
              >
                <Trash2 size={18} />
                <span>حذف</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextCard