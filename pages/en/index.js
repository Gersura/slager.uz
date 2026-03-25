import Layout from "@/components/layout"
import SEO from "@/components/seo"
import ContactActions from "@/components/contact-actions"
import ProjectList from "@/components/project-list"
import { getHomepageContent } from "@/lib/content"
import { getSiteSettings } from "@/lib/siteSettings"

const HomePageEn = ({ content, settings }) => {
  return (
    <Layout>
      <SEO title="Slava Gerasimenko" description={content.role} />

      <div className="max-w-[737px] pb-8 pt-12 md:pt-20">
        <section className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-1">
            <h1 className="max-w-[672px] text-[26px] font-normal leading-9 text-primary">
              {content.name}
            </h1>
            <p className="max-w-[608px] text-base leading-[22px] text-accent">
              {content.role}
            </p>
          </div>

          <div className="flex max-w-[672px] flex-col gap-[22px] text-base">
            {content.intro.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-[22px] max-w-[745px] space-y-[10px]">
          <p className="max-w-[672px] text-base leading-[26px] text-accent">
            {content.projectsIntro}
          </p>
          <ProjectList items={content.projects} hrefPrefix="/en/projects" />
        </section>

        <section className="mt-[22px] flex max-w-[672px] flex-col gap-2">
          <p className="text-base leading-[26px] text-secondary">{content.closing}</p>
          <ContactActions settings={settings} leadingHref="/en/career-track" />
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      content: getHomepageContent("en"),
      settings: getSiteSettings(),
    },
  }
}

export default HomePageEn
