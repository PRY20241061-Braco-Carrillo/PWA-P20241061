/** @type {import('next').NextConfig} */
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';


const nextConfig = {
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias['react'] = 'preact/compat';
      config.resolve.alias['react-dom'] = 'preact/compat';
      config.resolve.alias['react-dom/test-utils'] = 'preact/test-utils';
    }

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

export default nextConfig;

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
