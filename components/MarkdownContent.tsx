import React, { useEffect } from 'react';
import mermaid from 'mermaid';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  // Clean HTML content by removing p tags around block elements
  const cleanContent = (html: string): string => {
    return html
      // Remove p tags that wrap table elements
      .replace(/<p>\s*(<table[^>]*>)/gi, '$1')
      .replace(/(<\/table>)\s*<\/p>/gi, '$1')
      // Remove p tags that wrap other block elements
      .replace(/<p>\s*(<(?:div|section|article|aside|header|footer|nav|main)[^>]*>)/gi, '$1')
      .replace(/(<\/(?:div|section|article|aside|header|footer|nav|main)>)\s*<\/p>/gi, '$1')
      // Remove p tags that contain only images or badges
      .replace(/<p>\s*(<img[^>]*>(?:\s*<img[^>]*>)*(?:\s*<a[^>]*><img[^>]*><\/a>)*)\s*<\/p>/gi, '$1')
      // Remove p tags around single images
      .replace(/<p>\s*(<img[^>]*>)\s*<\/p>/gi, '$1')
      // Remove p tags around links with images (badges)
      .replace(/<p>\s*(<a[^>]*><img[^>]*><\/a>)\s*<\/p>/gi, '$1');
  };

  useEffect(() => {
    // Initialize Mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      themeVariables: {
        primaryColor: '#8b5cf6',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: '#6d28d9',
        lineColor: '#64748b',
        secondaryColor: '#1e293b',
        tertiaryColor: '#334155',
        background: '#0f172a',
        mainBkg: '#1e293b',
        secondBkg: '#334155',
        tertiaryBkg: '#475569'
      }
    });

    // Process Mermaid diagrams
    const processMermaidDiagrams = () => {
      const mermaidElements = document.querySelectorAll('code.language-mermaid');
      
      mermaidElements.forEach((element, index) => {
        const parent = element.parentElement;
        if (parent && parent.tagName === 'PRE') {
          const diagramText = element.textContent || '';
          const diagramId = `mermaid-diagram-${index}-${Date.now()}`;
          
          // Create a new div for the Mermaid diagram
          const diagramDiv = document.createElement('div');
          diagramDiv.className = 'mermaid-container my-6 flex justify-center';
          diagramDiv.innerHTML = `<div class="mermaid" id="${diagramId}">${diagramText}</div>`;
          
          // Replace the pre/code block with the diagram
          parent.replaceWith(diagramDiv);
        }
      });

      // Render all Mermaid diagrams
      mermaid.run();
    };

    // Process diagrams after a short delay to ensure DOM is ready
    const timer = setTimeout(processMermaidDiagrams, 100);

    return () => clearTimeout(timer);
  }, [content]);

  return (
    <div 
      className="prose prose-invert prose-purple max-w-none"
      dangerouslySetInnerHTML={{ __html: cleanContent(content) }}
    />
  );
};

export default MarkdownContent;