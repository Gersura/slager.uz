import Layout from "@/components/layout"
import SEO from "@/components/seo"
import ContactActions from "@/components/contact-actions"
import { getCareerTrackContent } from "@/lib/content"
import { getSiteSettings } from "@/lib/siteSettings"

const CareerBlock = ({ entry, isLast }) => {
  return (
    <article className="flex max-w-[737px] flex-col gap-[12px]">
      <p className="w-full text-sm leading-6 text-accent">{entry.heading}</p>

      <div className="w-full">
        <div className="flex w-full flex-wrap items-center gap-3 whitespace-nowrap">
          <p className="text-[18px] leading-7 text-primary">{entry.company}</p>
          {entry.role ? (
            <>
              <p className="text-base leading-[26px] text-tertiary">•</p>
              <p className="text-[18px] leading-7 text-tertiary">{entry.role}</p>
            </>
          ) : null}
        </div>
      </div>

      <ul className="m-0 flex flex-col gap-[10px] p-0">
        {entry.bullets.map(bullet => (
          <li
            key={bullet}
            className="flex w-full list-none items-center gap-3 px-[2px] text-base leading-[26px]"
          >
            <span className="h-[6px] w-[6px] shrink-0 bg-subtle"></span>
            <span className="text-secondary">{bullet}</span>
          </li>
        ))}
      </ul>

      {!isLast ? <div className="career-separator mt-[10px]"></div> : null}
    </article>
  )
}

const CareerTrackPage = ({ content, settings }) => {
  return (
    <Layout showHeader={false}>
      <SEO
        title="Career Track — Slava Gerasimenko"
        description="Career Track of Slava Gerasimenko."
      />

      <div className="max-w-[737px] pb-8 pt-[86px]">
        <section className="flex flex-col gap-[22px]">
          <div className="flex flex-col">
            <h1 className="max-w-[672px] text-[26px] font-normal leading-9 text-primary">
              {content.title}
            </h1>
          </div>

          <div className="flex max-w-[737px] flex-col text-base">
            {content.intro.map(paragraph => (
              <p key={paragraph} className="text-base leading-[26px] text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-[22px] flex max-w-[737px] flex-col gap-[22px]">
          {content.entries.map((entry, index) => (
            <CareerBlock
              key={`${entry.heading}-${entry.company}`}
              entry={entry}
              isLast={index === content.entries.length - 1}
            />
          ))}
        </section>

        <section className="mt-[22px] flex max-w-[737px] flex-col">
          <ContactActions settings={settings} leadingLabel="Me" leadingHref="/" />
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      content: getCareerTrackContent("ru"),
      settings: getSiteSettings(),
    },
  }
}

export default CareerTrackPage
