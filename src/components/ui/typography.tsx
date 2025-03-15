import { cn } from "~/lib/utils";
import * as React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Typography({ className, ...props }: TypographyProps) {
  return (
    <div
      className={cn(
        "prose prose-zinc dark:prose-invert max-w-none",
        // Base text color and spacing
        "text-foreground leading-relaxed",

        // Headings
        "prose-headings:scroll-m-20 prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-primary",
        "prose-h1:text-4xl prose-h1:lg:text-5xl prose-h1:mt-8 prose-h1:mb-4 prose-h1:border-b prose-h1:border-border prose-h1:pb-2",
        "prose-h2:text-3xl prose-h2:lg:text-4xl prose-h2:mt-8 prose-h2:mb-4",
        "prose-h3:text-2xl prose-h3:lg:text-3xl prose-h3:mt-6 prose-h3:mb-3",
        "prose-h4:text-xl prose-h4:lg:text-2xl prose-h4:mt-4 prose-h4:mb-2",
        "prose-h5:text-lg prose-h5:font-bold prose-h5:mt-4 prose-h5:mb-2",
        "prose-h6:text-base prose-h6:font-bold prose-h6:mt-4 prose-h6:mb-2",

        // Paragraphs
        "prose-p:my-4 prose-p:leading-7",

        // Lead text
        "prose-lead:text-xl prose-lead:text-muted-foreground prose-lead:font-normal",

        // Links - enhanced with transitions and states
        "prose-a:font-medium prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/30 prose-a:transition-colors",
        "hover:prose-a:text-primary/80 hover:prose-a:decoration-primary/60",
        "prose-a:visited:text-primary/70 prose-a:visited:decoration-primary/20",
        "prose-a:focus:outline-none prose-a:focus:ring-2 prose-a:focus:ring-primary/20 prose-a:focus:ring-offset-2",

        // Lists
        "prose-ul:my-6 prose-ul:ml-6 prose-ul:list-disc prose-ul:pl-2",
        "prose-ol:my-6 prose-ol:ml-6 prose-ol:list-decimal prose-ol:pl-2",
        "prose-li:my-2 prose-li:marker:text-primary/70",

        // Nested lists
        "[&_ul_li]:my-1 [&_ol_li]:my-1",

        // Blockquotes - enhanced styling
        "prose-blockquote:my-8 prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:pl-6 prose-blockquote:text-foreground/90 prose-blockquote:font-normal",
        "prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-4 prose-blockquote:rounded-r-md prose-blockquote:shadow-sm",
        "prose-blockquote:relative",
        "prose-blockquote:not-first-of-type:mt-8",

        // Nested blockquotes
        "[&_blockquote_blockquote]:mt-4 [&_blockquote_blockquote]:ml-4 [&_blockquote_blockquote]:border-l-4 [&_blockquote_blockquote]:border-primary/20",

        // Code blocks and inline code - improved for light mode visibility
        "prose-code:font-mono prose-code:text-sm prose-code:font-medium",
        "prose-pre:mt-6 prose-pre:mb-6 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:p-4 prose-pre:border prose-pre:border-border",

        // Tables
        "prose-table:w-full prose-table:my-6 prose-table:overflow-hidden prose-table:rounded-md prose-table:border prose-table:border-border",
        "prose-thead:bg-muted prose-thead:text-primary",
        "prose-th:p-3 prose-th:text-left prose-th:font-semibold",
        "prose-td:p-3 prose-td:border-t prose-td:border-border",
        "prose-tr:even:bg-muted/50",

        // Horizontal rule
        "prose-hr:my-12 prose-hr:border-t-2 prose-hr:border-border prose-hr:w-full",

        // Images
        "prose-img:rounded-md prose-img:my-8 prose-img:border prose-img:border-border prose-img:shadow-sm",

        // Task lists
        "[&_ul_li_input[type=checkbox]]:mr-2 [&_ul_li_input[type=checkbox]]:h-4 [&_ul_li_input[type=checkbox]]:w-4 [&_ul_li_input[type=checkbox]]:accent-primary",
        "[&_ul:has(li_input[type=checkbox])]:list-none [&_ul:has(li_input[type=checkbox])]:pl-0",
        "[&_ul_li:has(input[type=checkbox])]:flex [&_ul_li:has(input[type=checkbox])]:items-center",

        // Custom className
        className
      )}
      {...props}
    />
  );
}
