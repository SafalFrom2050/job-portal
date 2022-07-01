/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const pwaConfig = withPWA({
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true
    }
})

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['job-post-test.herokuapp.com', 'slcsolicitors.com', 'images.pexels.com']
    }
}


module.exports = {...nextConfig, ...pwaConfig}
