import React from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { ARTICLES } from '@/data/articles';

export const WritingSection: React.FC = () => {
  return (
    <section id="writing" className="py-20 md:py-28 border-b border-border-subtle">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Technical Notes &amp; Publications</span>
            </div>
            <h2 className="font-serif fluid-3xl font-bold tracking-tight text-ink">
              Writing &amp; Architectural Field Notes
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-ink-muted text-sm max-w-sm font-sans leading-relaxed">
              Published engineering articles on mobile security, real-time networking, and clean code.
            </p>
            <a
              href="https://medium.com/@ziad.w.khedr"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono rounded border border-border-strong bg-surface hover:border-accent hover:text-accent transition-colors self-start sm:self-auto"
              aria-label="Medium Profile: View Zyad Wael's technical articles on Medium"
            >
              <span>Medium Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Editorial Articles Ledger */}
        <div className="divide-y divide-border-subtle pt-6">
          {ARTICLES.map((article) => (
            <article
              key={article.url}
              className="py-8 group flex flex-col md:flex-row md:items-baseline justify-between gap-6 transition-colors"
            >
              <div className="md:w-3/4 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-ink-muted">
                  <span className="text-accent font-semibold uppercase tracking-wider">
                    {article.publication}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-ink-faint" />
                    <span>{article.readTime}</span>
                  </span>
                  <span>·</span>
                  <span className="px-2 py-0.5 rounded bg-elevated border border-border-subtle text-[11px] text-ink-muted">
                    {article.topic}
                  </span>
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-ink group-hover:text-accent transition-colors pt-1">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none focus-visible:underline"
                  >
                    {article.title}
                  </a>
                </h3>

                <p className="text-sm text-ink-muted leading-relaxed font-sans max-w-2xl mt-1">
                  {article.summary}
                </p>
              </div>

              <div className="md:w-1/4 flex md:justify-end items-center">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium rounded-md border border-border-subtle bg-surface group-hover:border-accent group-hover:text-accent transition-colors"
                  aria-label={`Read Article: ${article.title} on ${article.publication}`}
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WritingSection;
