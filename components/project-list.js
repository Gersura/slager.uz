import Link from "next/link"

const ProjectList = ({ items, hrefPrefix = "/projects" }) => {
  return (
    <ul className="m-0 flex w-[745px] max-w-full flex-col gap-[10px] p-0">
      {items.map(item => (
        <li
          key={item.slug}
          className="flex w-full list-none items-center gap-3 px-[2px] text-base leading-[26px]"
        >
          <span className="h-[6px] w-[6px] shrink-0 bg-subtle"></span>
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={`${hrefPrefix}/${item.slug}`}
              className="shrink-0 whitespace-nowrap text-primary"
            >
              {item.title}
            </Link>
            {item.meta ? (
              <span className="shrink-0 whitespace-nowrap text-subtle">
                {item.meta}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ProjectList
