import { UserOptions, ResolvedOptions, PageDirOptions } from './types'

export function resolveOptions(userOptions: UserOptions): ResolvedOptions {
  const {
    pagesDir = ['src/pages'],
    extensions = ['vue', 'js'],
    importMode = 'async',
    routeBlockLang = 'json5',
    exclude = [],
    syncIndex = true,
    replaceSquareBrackets = false,
    nuxtStyle = false,
  } = userOptions

  const root = process.cwd()

  let pagesDirOptions: PageDirOptions[] = []

  if (typeof pagesDir === 'string') {
    pagesDirOptions = pagesDirOptions.concat({ dir: pagesDir, baseRoute: '' })
  }
  else {
    for (const dir of pagesDir) {
      if (typeof dir === 'string')
        pagesDirOptions = pagesDirOptions.concat({ dir, baseRoute: '' })
      else if (dir as PageDirOptions)
        pagesDirOptions = pagesDirOptions.concat(dir)
    }
  }

  const extensionsRE = new RegExp(`\\.(${extensions.join('|')})$`)

  return Object.assign(
    {},
    {
      routeBlockLang,
      root,
      pagesDir,
      pagesDirOptions,
      extensions,
      importMode,
      exclude,
      syncIndex,
      replaceSquareBrackets,
      nuxtStyle,
      extensionsRE,
    },
    userOptions,
  )
}
