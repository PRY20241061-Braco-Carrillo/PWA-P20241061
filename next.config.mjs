/** @type {import('next').NextConfig} */
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.pexels.com',
      port: '',
    }], 
  },

  webpack: (config, options) => {
    //TODO: Update this to use Preact soon as Radix supports it
    // Alias para React a Preact
    //if (!options.isServer) {
    //  config.resolve.alias['react'] = 'preact/compat';
    //  config.resolve.alias['react-dom'] = 'preact/compat';
    //  config.resolve.alias['react-dom/test-utils'] = 'preact/test-utils';
    //}

    const imageRule = config.module.rules.find(rule => String(rule.test) === String(/\.(png|jpe?g|gif|webp|avif)$/i));
    if (imageRule) {
      imageRule.exclude = /\.svg$/i;
    }

    // Añade una nueva regla para procesar SVGs con SVGR
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 'auto',
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
};

export default withNextIntl(nextConfig);



//import withPWAInit from "@ducanh2912/next-pwa";

//const withPWA = withPWAInit({
//  dest: "public", // Directorio donde se generarán los assets de la PWA
//});

///** @type {import('next').NextConfig} */
//const nextConfig = {
  // Tu configuración de Next.js aquí
//};

//export default withPWA({
//  ...nextConfig,
  // Otras configuraciones específicas de PWA pueden ir aquí
//});
