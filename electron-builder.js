const { name, author, description } = require('./package.json')

const CURRENT_YEAR = new Date().getFullYear()
const AUTHOR_IN_KEBAB_CASE = author.name.replace(/\s+/g, '-')
const APP_ID = `com.${AUTHOR_IN_KEBAB_CASE}.${name}`.toLowerCase()

module.exports = {
  appId: APP_ID,
  productName: 'Mini Video Me',
  copyright: `Copyright © ${CURRENT_YEAR} — ${author.name}`,

  directories: {
    app: './.webpack',
    output: 'dist',
  },

  mac: {
    icon: `./assets/icon.icns`,
    category: 'public.app-category.utilities',
  },

  dmg: {
    icon: false,
  },

  linux: {
    category: 'Utilities',
    synopsis: description,
    target: ['AppImage', 'deb', 'pacman', 'freebsd', 'rpm'],
  },

  win: {
    icon: `./assets/icon.ico`,
    target: ['nsis', 'portable', 'zip'],
  },
}
