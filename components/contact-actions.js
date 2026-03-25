import Link from "next/link"
import EmailCopyLink from "./email-copy-link"

const ActionLink = ({ href, children, external = false, download = false }) => {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  if (download) {
    return (
      <a href={href} download>
        {children}
      </a>
    )
  }

  return <Link href={href}>{children}</Link>
}

const ContactActions = ({
  settings,
  leadingLabel = "Career Track",
  leadingHref = "/career-track",
}) => {
  return (
    <div className="flex w-full flex-wrap items-center gap-2 text-sm leading-6 text-secondary">
      <ActionLink href={leadingHref}>{leadingLabel}</ActionLink>
      <span className="h-1 w-1 shrink-0 bg-subtle"></span>
      <ActionLink href={settings.resumeHref} download>
        Resume
      </ActionLink>
      <span className="h-1 w-1 shrink-0 bg-subtle"></span>
      <ActionLink href={settings.linkedinUrl} external>
        LinkedIn
      </ActionLink>
      <span className="h-1 w-1 shrink-0 bg-subtle"></span>
      <ActionLink href={settings.telegramUrl} external>
        Telegram
      </ActionLink>
      <span className="h-1 w-1 shrink-0 bg-subtle"></span>
      <EmailCopyLink email={settings.email} />
    </div>
  )
}

export default ContactActions
