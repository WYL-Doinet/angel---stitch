import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Angel & Stitch",
        short_name: "Angel & Stitch",
        description: "Angel & Stitch App for who I really fond",
        start_url: "/",
        display: "standalone",
        background_color: "#5d9af4",
        theme_color: "#000000",
        icons: [
            {
                src: "/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
