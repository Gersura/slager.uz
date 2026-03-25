const fs = require("fs")
const path = require("path")

const siteRoot = process.cwd()
const materialsDir = path.join(siteRoot, "..", "..", "materials")
const settingsPath = path.join(materialsDir, "site-settings.md")
const settingsSource = fs.readFileSync(settingsPath, "utf8")
const match = settingsSource.match(/### Current resume file[\s\S]*?- `([^\n]+)`/)

if (!match) {
  throw new Error("Unable to find current resume file in site-settings.md")
}

const resumeFileName = match[1].trim()
const sourcePath = path.join(materialsDir, resumeFileName)
const targetDir = path.join(siteRoot, "public", "resume")
const targetPath = path.join(targetDir, resumeFileName)

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Resume file not found: ${sourcePath}`)
}

fs.mkdirSync(targetDir, { recursive: true })
fs.copyFileSync(sourcePath, targetPath)
