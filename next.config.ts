import { sources } from "next/dist/compiled/webpack/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => {
      return [
        {
            source: "/",
            destination: "/home",
        },
        {
            source: "/carrinho",
            destination: "/cart"
        },
        {
            source: "/produtos",
            destination: "/products"
        },
        {
          source: "/login",
          destination: "/login"
        },
        {
            source: "/profile",
            destination: "/profile"
        },
        {
          source: "/adm",
          destination: "/adm"
        },
        {
          source: "/admCategories",
          destination: "/admCategories"
        }
      ]
  }
};

export default nextConfig;