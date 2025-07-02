import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import mermaid from 'mermaid';

const MarkdownPage = ({ path }) => {
  const [content, setContent] = useState('');
  const containerRef = useRef();

  // Step 1: Load the .md file
  useEffect(() => {
    fetch(path)
      .then((res) => res.text())
      .then(setContent);
  }, [path]);

  // Step 2: Run Mermaid after markdown renders
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' });

    // Wait a moment to ensure React rendered the DOM
    const timeout = setTimeout(() => {
      const mermaidElements = containerRef.current?.querySelectorAll('.mermaid') || [];
      mermaidElements.forEach((el, idx) => {
        const id = `mermaid-${idx}`;
        el.id = id;
        try {
          mermaid.render(id, el.textContent, (svg) => {
            el.innerHTML = svg;
          });
        } catch (err) {
          console.error('Mermaid render failed:', err);
        }
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [content]);

  return (
    <div ref={containerRef} className="prose prose-indigo max-w-none">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match?.[1];
            if (lang === 'mermaid') {
              return (
                <div className="mermaid">
                  {String(children).replace(/\n$/, '')}
                </div>
              );
            }
            return inline ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <pre className={className} {...props}>
                <code>{children}</code>
              </pre>
            );
          },
        }}
      />
    </div>
  );
};

export default MarkdownPage;
