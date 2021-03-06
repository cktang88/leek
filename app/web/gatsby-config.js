const {getThemeVariables} = require('antd/dist/theme');

let theme = getThemeVariables({
    dark: true, // Enable dark mode
    compact: true, // Enable compact mode
});

const customTheme = {
    ...theme,
    // Primary
    '@primary-color': "#00BFA6",
    '@layout-header-height': '50px',
    '@layout-footer-height': '50px',
    '@layout-header-background': '@menu-bg',
    '@body-background': '@menu-bg',
    '@layout-body-background': '@body-background',
};

module.exports = {
    siteMetadata: {
        title: 'Real time celery tasks monitoring',
    },
    plugins: [
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                allowNamespaces: true, // defaults to false
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Real time celery tasks monitoring',
                short_name: 'leek',
                start_url: '/',
                background_color: '#00BFA6',
                theme_color: '#00BFA6',
                display: 'minimal-ui',
                icon: 'src/images/leek.png', // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-plugin-antd',
            options: {
                style: true
            }
        },
        {
            resolve: "gatsby-plugin-less",
            options: {
                javascriptEnabled: true,
                modifyVars: customTheme
            }
        },
        `gatsby-plugin-remove-trailing-slashes`,
        "gatsby-plugin-use-query-params",
        `gatsby-plugin-styled-components`,
    ]
};
