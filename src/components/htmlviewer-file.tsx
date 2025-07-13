import React, { useEffect, useRef, useState } from 'react';

interface HtmlFileRendererProps {
  htmlFileUrl: string;
  className?: string;
}

const HtmlFileRenderer: React.FC<HtmlFileRendererProps> = ({ htmlFileUrl, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHtmlFile = async () => {
      if (!containerRef.current) return;

      setLoading(true);
      setError(null);

      try {
        // پاک کردن محتوای قبلی
        containerRef.current.innerHTML = '';

        // دریافت فایل HTML از URL
        const response = await fetch(htmlFileUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to load HTML file: ${response.status} ${response.statusText}`);
        }

        const htmlContent = await response.text();
        
        // ایجاد iframe برای رندر ایمن HTML
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.minHeight = '70vh';
        iframe.style.border = 'none';
        iframe.style.backgroundColor = '#E7EFF6';
        iframe.style.display = 'block';
        
        containerRef.current.appendChild(iframe);
        
        // نوشتن HTML در iframe
        if (iframe.contentDocument) {
          iframe.contentDocument.open();
          iframe.contentDocument.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  background-color: #E7EFF6;
                }
              </style>
            </head>
            <body>
              ${htmlContent}
            </body>
            </html>
          `);
          iframe.contentDocument.close();
          
          // تنظیم ارتفاع iframe بعد از لود شدن محتوا
          iframe.onload = () => {
            if (iframe.contentDocument) {
              const body = iframe.contentDocument.body;
              const html = iframe.contentDocument.documentElement;
              
              // محاسبه ارتفاع کامل محتوا
              const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
              );
              
              iframe.style.height = `${height}px`;
            }
            setLoading(false);
          };
          
          // fallback برای موارد که onload فعال نشود
          setTimeout(() => {
            if (iframe.contentDocument) {
              const body = iframe.contentDocument.body;
              const html = iframe.contentDocument.documentElement;
              
              const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
              );
              
              iframe.style.height = `${height}px`;
            }
            setLoading(false);
          }, 100);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while loading the HTML file');
        setLoading(false);
      }
    };

    if (htmlFileUrl) {
      loadHtmlFile();
    }
  }, [htmlFileUrl]);

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center p-8`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading HTML file...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center p-8`}>
        <div className="text-center text-red-600">
          <p className="font-semibold mb-2">Error loading HTML file</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={containerRef} className="w-full" style={{ minHeight: 'auto' }} />
    </div>
  );
};

export default HtmlFileRenderer;