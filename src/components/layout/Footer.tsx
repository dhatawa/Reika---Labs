import { Logo } from '../brand/Logo'
import { contact, footer, site } from '../../content/site'

export function Footer() {
  const ig = contact.instagram.href
  return (
    <footer className="bg-midnight text-foam">
      <div className="container-x flex flex-col gap-6 border-t border-foam/10 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
          <Logo markClassName="h-6 w-6 text-cyan" />
          <p className="label text-foam/40">{site.acronym}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-foam/50 md:flex-row md:items-center md:gap-8">
          {ig ? (
            <a href={ig} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cyan">
              Instagram
            </a>
          ) : (
            <span>Instagram · {contact.instagram.display}</span>
          )}
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
