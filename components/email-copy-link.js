import { useState } from "react"

const EmailCopyLink = ({ email, label = "Email" }) => {
  const [copied, setCopied] = useState(false)

  const handleClick = async event => {
    event.preventDefault()

    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline p-0 text-left text-secondary underline decoration-linkline/50 underline-offset-[3px] [text-decoration-thickness:1px] transition duration-200 ease-in-out hover:text-primary hover:decoration-tertiary/70"
      aria-live="polite"
    >
      {copied ? "Email copied" : label}
    </button>
  )
}

export default EmailCopyLink
