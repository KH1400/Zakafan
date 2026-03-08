'use client';

import { useEffect, useState, use } from 'react';
import DynosPage from './dynos';
import Posts from './posts';
import { apiGetDynoMastersByCategoryHref } from '../../lib/api';

export default function Page({ params }: any) {
  const unwrappedParams: any = use(params);
  const slug = unwrappedParams.dyno;

  const [dynoCount, setDynoCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const dynosResult = await apiGetDynoMastersByCategoryHref({ categoryHref: slug });
        const dyns: any = await dynosResult.json();
        
        const panelDataLength = dyns?.masters?.length || 0;
        setDynoCount(panelDataLength);
      } catch (error) {
        console.error('Error loading data:', error);
        setDynoCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white/70">
        در حال بارگذاری اطلاعات...
      </div>
    );
  }

  if (dynoCount > 0) {
    return <DynosPage slug={slug} />;
  }
  
  return <Posts slug={slug} />;
}