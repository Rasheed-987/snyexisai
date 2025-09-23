export const siteConfig = {
  name: "Snyexisai",
  description: "Modern Next.js application with component-based architecture",
  url: "https://snyexisai.example.com",
  ogImage: "https://snyexisai.example.com/og.jpg",
  links: {
    twitter: "https://twitter.com/snyexisai",
    github: "https://github.com/snyexisai",
  },
}

export const navConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
}

export const dashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
    },
  ],
  sidebarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: "dashboard",
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: "analytics",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}