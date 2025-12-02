import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownTextProps {
    children: string;
    className?: string;
}

export const MarkdownText: React.FC<MarkdownTextProps> = ({ children, className = '' }) => {
    return (
        <div className={`leading-relaxed ${className}`}>
            <ReactMarkdown
                components={{
                    ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside space-y-1 mt-1 ml-1" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside space-y-1 mt-1 ml-1" {...props} />
                    ),
                    li: ({ node, ...props }) => <li className="pl-1" {...props} />,

                    a: ({ node, children, ...props }) => (
                        <a
                            className="text-text-accent hover:underline font-medium transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                        >
                            {children}
                        </a>
                    ),

                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,

                    h1: ({ node, children, ...props }) => (
                        <h3 className="text-xl font-bold mt-4 mb-2" {...props}>
                            {children}
                        </h3>
                    ),
                    h2: ({ node, children, ...props }) => (
                        <h4 className="text-lg font-bold mt-3 mb-1" {...props}>
                            {children}
                        </h4>
                    ),
                    h3: ({ node, children, ...props }) => (
                        <h5 className="font-bold mt-2 mb-1" {...props}>
                            {children}
                        </h5>
                    ),

                    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                    em: ({ node, ...props }) => <em className="italic" {...props} />,

                    code: ({ node, ...props }) => (
                        <code
                            className="bg-page px-1 py-0.5 rounded text-sm font-mono text-text-primary border border-border"
                            {...props}
                        />
                    ),
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};
