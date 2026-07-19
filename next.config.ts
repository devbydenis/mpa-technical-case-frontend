import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: process.env.NODE_ENV === 'production', // biar development lebih ringan
  transpilePackages: ['@mui/material', '@mui/icons-material'],
};

export default nextConfig;
