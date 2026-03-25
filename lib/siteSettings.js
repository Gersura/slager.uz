import fs from "fs"
import path from "path"

const MATERIALS_PATH = path.join(process.cwd(), "materials")
const SITE_SETTINGS_PATH = path.join(MATERIALS_PATH, "site-settings.md")

const extractCodeValue = (source, heading) => {
  const pattern = new RegExp(`### ${heading}[\\s\\S]*?- \`([^\\n]+)\``)
  const match = source.match(pattern)

  if (!match) {
    throw new Error(`Unable to find "${heading}" in site-settings.md`)
  }

  return match[1].trim()
}

export const getSiteSettings = () => {
  const source = fs.readFileSync(SITE_SETTINGS_PATH, "utf8")
  const email = extractCodeValue(source, "Email")
  const telegramUrl = extractCodeValue(source, "Telegram")
  const linkedinUrl = extractCodeValue(source, "LinkedIn")
  const resumeFileName = extractCodeValue(source, "Current resume file")

  return {
    email,
    telegramUrl,
    linkedinUrl,
    resumeFileName,
    resumeHref: `/resume/${resumeFileName}`,
  }
}
