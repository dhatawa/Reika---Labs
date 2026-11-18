import { Logo } from '../brand/Logo'
import { useSite } from '../../content/site'

export function Footer() {
  const { contact, footer, site } = useSite()
  const ig = contact.instagram.href
  return (
    <footer className="bg-paper text-ink">
      <div className="container-x hairline flex flex-col gap-6 border-t py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
          <Logo size="sm" />
          <p className="text-sm text-ink-3">{site.acronym}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-ink-3 md:flex-row md:items-center md:gap-8">
          {ig ? (
            <a href={ig} target="_blank" rel="noopener noreferrer" className="transition-colors duration-150 hover:text-ink">
              Instagram {contact.instagram.display}
            </a>
          ) : null}
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
