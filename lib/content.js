import fs from "fs"
import path from "path"

const MATERIALS_PATH = path.join(process.cwd(), "materials")

const PROJECT_SLUGS = [
  "click-miniapps",
  "click-admins",
  "smartbank-retention-activation",
  "smartbank-kartoteka",
  "cheil-marketplace-mvp",
]

const PROJECT_TITLES = {
  "click-miniapps": "Click MiniApps",
  "click-admins": "Click Admins",
  "smartbank-retention-activation": "Smart Bank Retention & Activation",
  "smartbank-kartoteka": "Smart Bank Kartoteka",
  "cheil-marketplace-mvp": "Cheil Marketplace MVP",
}

const PROJECT_FILE_MAP = {
  "click-miniapps": {
    ru: "project-click-miniapps-ru.md",
    en: "project-click-miniapps-en.md",
  },
  "click-admins": {
    ru: "project-click-admins-ru.md",
    en: "project-click-admins-en.md",
  },
  "smartbank-retention-activation": {
    ru: "project-smartbank-retention-activation-ru.md",
    en: "project-smartbank-retention-activation-en.md",
  },
  "smartbank-kartoteka": {
    ru: "project-smartbank-kartoteka-ru.md",
    en: "project-smartbank-kartoteka-en.md",
  },
  "cheil-marketplace-mvp": {
    ru: "project-cheil-marketplace-mvp-ru.md",
    en: "project-cheil-marketplace-mvp-en.md",
  },
}

const getMaterialsFile = fileName =>
  fs.readFileSync(path.join(MATERIALS_PATH, fileName), "utf8").trim()

const isListLine = line => line.startsWith("- ") || /^\d+\.\s+/.test(line)

const parseRichTextBlock = block => {
  const lines = block
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)

  if (lines.length === 0) {
    return []
  }

  const firstBulletIndex = lines.findIndex(isListLine)

  if (firstBulletIndex === -1) {
    return [
      {
        type: "paragraph",
        text: lines.join(" "),
      },
    ]
  }

  const leadLines = lines.slice(0, firstBulletIndex)
  const items = lines
    .slice(firstBulletIndex)
    .filter(isListLine)
    .map(line => {
      if (line.startsWith("- ")) {
        return line.replace(/^- /, "").trim()
      }

      return line.trim()
    })

  const parsed = []

  if (leadLines.length > 0) {
    parsed.push({
      type: "paragraph",
      text: leadLines.join(" "),
    })
  }

  if (items.length > 0) {
    parsed.push({
      type: "list",
      items,
    })
  }

  return parsed
}

const parseRichTextSections = content =>
  content
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .filter(Boolean)
    .flatMap(parseRichTextBlock)

const splitProjectLine = line => {
  const match = line.match(/^(.*?\.)\s+(.+?\s+•\s+\d{4})$/)

  if (!match) {
    return {
      title: line,
      meta: "",
    }
  }

  return {
    title: match[1].trim(),
    meta: match[2].trim(),
  }
}

export const getHomepageContent = lang => {
  const source = getMaterialsFile(`homepage-content-${lang}.md`)
  const blocks = source.split(/\n\s*\n/).map(block => block.trim())
  const [heroBlock, ...contentBlocks] = blocks
  const heroLines = heroBlock.split("\n").map(line => line.trim())
  const projectsLeadIndex = contentBlocks.findIndex(
    block =>
      block.startsWith("Вот несколько проектов") ||
      block.startsWith("Here are a few projects")
  )

  if (heroLines.length < 2 || projectsLeadIndex === -1) {
    throw new Error(`Unexpected homepage structure for language "${lang}"`)
  }

  const projectsBlock = contentBlocks[projectsLeadIndex]
  const projectLines = projectsBlock
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)

  return {
    name: heroLines[0],
    role: heroLines[1],
    intro: contentBlocks.slice(0, projectsLeadIndex),
    projectsIntro: projectLines[0],
    projects: projectLines
      .slice(1)
      .filter(line => line.startsWith("•"))
      .map((line, index) => {
        const cleanLine = line.replace(/^•\s*/, "")
        const { title, meta } = splitProjectLine(cleanLine)

        return {
          slug: PROJECT_SLUGS[index],
          text: cleanLine,
          title,
          meta,
        }
      }),
    closing: contentBlocks[projectsLeadIndex + 1] || "",
  }
}

export const getProjectSlugs = () => PROJECT_SLUGS

export const getProjectTitle = slug => PROJECT_TITLES[slug] || slug

export const getCareerTrackContent = lang => {
  const source = getMaterialsFile(`career-track-${lang}.md`)
  const sections = source.split(/\n---\n/g).map(section => section.trim())
  const [introSection, ...entrySections] = sections
  const introLines = introSection.split("\n").map(line => line.trim())
  const title = introLines[0].replace(/^#\s+/, "")
  const intro = introSection
    .split(/\n\s*\n/)
    .slice(1)
    .map(block => block.trim())
    .filter(Boolean)

  const entries = entrySections.map(section => {
    const lines = section
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean)

    const heading = lines[0].replace(/^##\s+/, "")
    const companyLine = lines.find(line => /^\*\*.*\*\*$/.test(line))
    const company = companyLine ? companyLine.replace(/^\*\*|\*\*$/g, "") : ""
    const companyIndex = companyLine ? lines.indexOf(companyLine) : -1
    const bulletIndex = lines.findIndex(line => line.startsWith("- "))
    const role =
      companyIndex >= 0 && bulletIndex > companyIndex + 1
        ? lines.slice(companyIndex + 1, bulletIndex).join(" ")
        : companyIndex >= 0 && lines[companyIndex + 1] && !lines[companyIndex + 1].startsWith("- ")
          ? lines[companyIndex + 1]
          : ""
    const bullets = lines
      .filter(line => line.startsWith("- "))
      .map(line => line.replace(/^- /, "").trim())

    return {
      heading,
      company,
      role,
      bullets,
    }
  })

  return {
    title,
    intro,
    entries,
  }
}

export const getProjectContent = (slug, lang) => {
  const fileName = PROJECT_FILE_MAP[slug]?.[lang]

  if (!fileName) {
    throw new Error(`No project content mapped for slug "${slug}" and lang "${lang}"`)
  }

  const source = getMaterialsFile(fileName)
  const lines = source.split("\n")
  const title = lines[0].replace(/^#\s+/, "").trim()
  const metaLine = lines.find(line => /^\*\*.*\*\*$/.test(line.trim()))
  const meta = metaLine ? metaLine.replace(/^\*\*|\*\*$/g, "").trim() : ""
  const body = source
    .split("\n")
    .slice(lines.findIndex(line => line.trim() === metaLine) + 1)
    .join("\n")
    .trim()

  const rawSections = body.split(/\n(?=##\s)/g).map(section => section.trim()).filter(Boolean)

  const parsedSections = rawSections.map(section => {
    const sectionLines = section.split("\n")
    const heading = sectionLines[0].replace(/^##\s+/, "").trim()
    const rest = sectionLines.slice(1).join("\n").trim()
    const subsectionChunks = rest
      ? rest.split(/\n(?=###\s)/g).map(chunk => chunk.trim()).filter(Boolean)
      : []

    const introChunk =
      subsectionChunks.length > 0 && subsectionChunks[0].startsWith("### ")
        ? ""
        : subsectionChunks.shift() || rest

    const blocks = introChunk ? parseRichTextSections(introChunk) : []

    const subsections = subsectionChunks.map(chunk => {
      const chunkLines = chunk.split("\n")
      const subheading = chunkLines[0].replace(/^###\s+/, "").trim()
      const content = chunkLines.slice(1).join("\n").trim()

      return {
        heading: subheading,
        blocks: parseRichTextSections(content),
      }
    })

    return {
      heading,
      blocks,
      subsections,
    }
  })

  const [firstSection, ...remainingSections] = parsedSections
  const isOverviewSection =
    firstSection &&
    (firstSection.heading === "О проекте" || firstSection.heading === "Overview")
  const overview =
    isOverviewSection
      ? firstSection.blocks
      : []
  const sections =
    isOverviewSection
      ? remainingSections
      : parsedSections

  return {
    slug,
    title,
    meta,
    overview,
    sections,
  }
}
