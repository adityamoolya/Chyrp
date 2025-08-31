// src/components/feather/text-renderer.tsx
'use client';

import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Or your preferred theme
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import { MathJax } from 'better-react-mathjax';

export function TextRenderer({ content }: { content: string }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <MathJax>
      <div className="prose dark:prose-invert lg:prose-lg max-w-none prose-pre:bg-background prose-pre:border prose-pre:rounded-md">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <pre className={className} {...props}>
                  <code className={`language-${match[1]}`}>{String(children).replace(/\n$/, '')}</code>
                </pre>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </MathJax>
  );
}
