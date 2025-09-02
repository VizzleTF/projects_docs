import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  id?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const chartId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
    });

    if (ref.current) {
      ref.current.innerHTML = chart;
      mermaid.init(undefined, ref.current);
    }
  }, [chart]);

  return (
    <div 
      ref={ref} 
      id={chartId}
      className="mermaid-diagram my-6 flex justify-center"
      style={{ textAlign: 'center' }}
    />
  );
};

export default MermaidDiagram;