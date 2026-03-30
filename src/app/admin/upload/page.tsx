
"use client";

import { useState } from 'react';
import PublicFileUploadComponent from '../../../components/fourfold/public-uploader';
import FileUploadComponent from '../../../components/fourfold/uploader';
import ProtectedRoute from '../../../components/protected-route';
import { useLanguage } from '../../../lib/language-context';
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const { language, selectedLang } = useLanguage();
  const [uploadedData, setUploadedData] = useState<{id: string, status: string, url: string}>();

  return (
    <ProtectedRoute accessRoles={['admin', 'user']}>
      <div dir={selectedLang.dir} className="flex flex-col min-h-full p-4 md:p-6 bg-muted/40 font-persian">
        <PublicFileUploadComponent
          multiple={false}
          processDocument={false}
          maxSize={200}
          accept="*/*"
          title="آپلود"
          onError={(error) => console.log('Error:', error)}
          onUploadComplete={(meta) => {
            setUploadedData((meta as any)?.uploadedData)
          }}
          >
        </PublicFileUploadComponent>
        <div className="w-full flex flex-wrap gap-3 justify-start items-center p-2">
          <p>لینک دانلود: </p>
          <a href={uploadedData?.url} target='_top'>{uploadedData?.url}</a>
        </div>
      </div>
    </ProtectedRoute>
  );
}