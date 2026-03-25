import LanguageSwitch from "./language-switch"

const Layout = ({ children, showHeader = true }) => {
  return (
    <main>
      <div className="relative mx-auto mt-9 max-w-container-small px-6 md:mt-12 md:max-w-container-large">
        <LanguageSwitch />
        {children}
      </div>
    </main>
  )
}
export default Layout
