import React, { useEffect, useRef, useState } from 'react';
import Loading from './fourfold/loading';

interface HtmlRendererProps {
  htmlContent: string;
  className?: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ htmlContent, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false)
  const htmlToRender = htmlContent;

  useEffect(() => {
    if (containerRef.current) {
      setLoading(true)
      // پاک کردن محتوای قبلی
      containerRef.current.innerHTML = '';
      
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
            ${htmlToRender}
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
        }, 1);
      }
      setLoading(false)
    }
  }, [htmlToRender]);

  if(loading) { return null }

  return (
    <div className={className}>
      <div ref={containerRef} className="w-full" style={{ minHeight: 'auto' }} />
    </div>
  );
};

export default HtmlRenderer;