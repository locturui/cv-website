import { Mail, Send, Github } from 'lucide-react'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="brutal-border-t bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display uppercase text-2xl tracking-tight leading-none">
            Stepan&nbsp;Leonov
          </p>
          <p className="font-mono text-xs uppercase tracking-widest mt-2 text-cream/70">
            © {year} · Built loud.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="mailto:leonovstepan.jobs@outlook.com"
            aria-label="Email"
            className="grid place-items-center w-12 h-12 border-4 border-cream bg-brutal-yellow text-ink brutal-press"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://t.me/locturui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="grid place-items-center w-12 h-12 border-4 border-cream bg-brutal-blue text-cream brutal-press"
          >
            <Send className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/locturui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid place-items-center w-12 h-12 border-4 border-cream bg-cream text-ink brutal-press"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
