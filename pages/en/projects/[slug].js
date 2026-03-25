import Layout from "@/components/layout"
import SEO from "@/components/seo"
import ContactActions from "@/components/contact-actions"
import { getProjectContent, getProjectSlugs } from "@/lib/content"
import { getSiteSettings } from "@/lib/siteSettings"

const renderInlineRichText = text => {
  const parts = text.split(/(\*\*.*?\*\*)/g)

  return parts.filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
    }

    return <span key={`${part}-${index}`}>{part}</span>
  })
}

const ManualList = ({ items }) => {
  return (
    <ul className="m-0 flex flex-col gap-[10px] p-0">
      {items.map(item => (
        <li
          key={item}
          className="flex w-full list-none items-start gap-3 text-base leading-[26px]"
        >
          <span className="mt-[10px] h-[6px] w-[6px] shrink-0 bg-subtle"></span>
          <span className="text-secondary">{renderInlineRichText(item)}</span>
        </li>
      ))}
    </ul>
  )
}

const ContentBlock = ({ block }) => {
  if (block.type === "list") {
    return <ManualList items={block.items} />
  }

  return (
    <p className="text-base leading-[26px] text-secondary">
      {renderInlineRichText(block.text)}
    </p>
  )
}

const SectionSeparator = () => <div className="career-separator"></div>

const ProjectSection = ({ section, isLast }) => {
  return (
    <>
      <section className="flex max-w-[737px] flex-col gap-3">
        <h2 className="text-sm leading-6 text-accent">{section.heading}</h2>

        {section.blocks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {section.blocks.map((block, index) => (
              <ContentBlock
                key={`${section.heading}-${block.type}-${index}`}
                block={block}
              />
            ))}
          </div>
        ) : null}

        {section.subsections.length > 0 ? (
          <div className="flex flex-col gap-3">
            {section.subsections.map(subsection => (
              <div key={subsection.heading} className="flex flex-col gap-3">
                <h3 className="text-[18px] leading-7 text-tertiary">
                  {subsection.heading}
                </h3>
                <div className="flex flex-col gap-3">
                  {subsection.blocks.map((block, index) => (
                    <ContentBlock
                      key={`${subsection.heading}-${block.type}-${index}`}
                      block={block}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {!isLast ? <SectionSeparator /> : null}
    </>
  )
}

const ProjectPageEn = ({ project, settings }) => {
  return (
    <Layout showHeader={false}>
      <SEO title={`${project.title} — Slava Gerasimenko`} description={project.meta} />

      <div className="max-w-[737px] pb-8 pt-[86px]">
        <div className="flex flex-col gap-[22px]">
          <section className="flex flex-col gap-1">
            <h1 className="max-w-[737px] text-[26px] font-normal leading-9 text-primary">
              {project.title}
            </h1>
            <p className="text-base leading-[22px] text-accent">{project.meta}</p>
          </section>

          {project.overview.length > 0 ? (
            <section className="flex max-w-[737px] flex-col gap-[22px]">
              {project.overview.map((block, index) => (
                <ContentBlock key={`overview-${block.type}-${index}`} block={block} />
              ))}
            </section>
          ) : null}

          <section className="flex flex-col gap-[22px]">
            {project.sections.map((section, index) => (
              <ProjectSection
                key={section.heading}
                section={section}
                isLast={index === project.sections.length - 1}
              />
            ))}
          </section>

          <section className="flex max-w-[737px] flex-col">
            <ContactActions settings={settings} leadingLabel="Me" leadingHref="/en" />
          </section>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      project: getProjectContent(params.slug, "en"),
      settings: getSiteSettings(),
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: getProjectSlugs().map(slug => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export default ProjectPageEn
