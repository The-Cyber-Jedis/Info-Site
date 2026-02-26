// Data registry for the static site (GitHub Pages)
// Manually update this when adding new .md files or images

const siteData = {
  // Calendar events: Add .md files from CALENDER/ folder
  calendar: [
    "CALENDER/02-27.md"
  ],
  
  // Team posts: Add .md files from TEAMS/*/posts/ folders
  posts: {
    episode: [
      "TEAMS/EPISODE/posts/blogcard-example.md"
    ],
    order404: [],
    research: [
      "TEAMS/RESEARCH/posts/QPost_001.md",
      "TEAMS/RESEARCH/posts/QPost_002.md",
      "TEAMS/RESEARCH/posts/CWPost_001.md"
    ]
  },
  
  // Merch items: Add .md files from MERCH/ folder
  merch: [
    "MERCH/tshirt.md",
    "MERCH/stickers.md"
  ],
  
  // Carousel images: Add image files from MEDIA/img/carousel/ folder
  // Supports: .jpg, .jpeg, .png, .gif, .webp
  // TO ADD A NEW IMAGE:
  // 1. Place your image in MEDIA/img/carousel/
  // 2. Add the path below (example: "MEDIA/img/carousel/myimage.jpg")
  carousel: [
    "MEDIA/img/carousel/0.png",
    "MEDIA/img/carousel/1.png",
    "MEDIA/img/carousel/3.png",
    "MEDIA/img/carousel/2.png"
  ]
};
