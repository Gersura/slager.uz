import Link from "next/link"
import { useRouter } from "next/router"

const normalizePath = path => {
  if (!path) {
    return "/"
  }

  return path.split("?")[0].split("#")[0]
}

const getLanguageSwitch = path => {
  const pathname = normalizePath(path)

  if (pathname === "/") {
    return {
      href: "/en",
      label: "EN",
    }
  }

  if (pathname === "/career-track") {
    return {
      href: "/en/career-track",
      label: "EN",
    }
  }

  if (pathname.startsWith("/projects/")) {
    return {
      href: `/en${pathname}`,
      label: "EN",
    }
  }

  if (pathname === "/en") {
    return {
      href: "/",
      label: "RU",
    }
  }

  if (pathname === "/en/career-track") {
    return {
      href: "/career-track",
      label: "RU",
    }
  }

  if (pathname.startsWith("/en/projects/")) {
    return {
      href: pathname.replace(/^\/en/, ""),
      label: "RU",
    }
  }

  return null
}

const LanguageSwitch = () => {
  const router = useRouter()
  const switchConfig = getLanguageSwitch(router.asPath)

  if (!switchConfig) {
    return null
  }

  return (
    <Link
      href={switchConfig.href}
      className="absolute left-6 -top-1 z-10 text-base leading-[26px] text-[#474747] underline decoration-[#474747] decoration-[1px] underline-offset-[3px] transition duration-200 ease-in-out hover:text-[#5a5a5a] hover:decoration-[#5a5a5a]"
    >
      {switchConfig.label}
    </Link>
  )
}

export default LanguageSwitch
