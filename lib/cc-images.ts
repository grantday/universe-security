export type CcImage = {
  src: string;
  alt: string;
  author: string;
  sourceUrl: string;
  licenseName: string;
  licenseUrl: string;
};

// Wikimedia Commons-hosted images (Creative Commons licensed).
// Replace these with your preferred CC images later; keep attribution accurate.
export const ccImages = {
  homeSecurity: {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/CCTV_camera.jpg",
    alt: "CCTV camera close-up",
    author: "Wikimedia Commons contributors",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:CCTV_camera.jpg",
    licenseName: "CC BY-SA",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  businessSecurity: {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Security_guard.jpg",
    alt: "Security guard on duty",
    author: "Wikimedia Commons contributors",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Security_guard.jpg",
    licenseName: "CC BY-SA",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  industrialSecurity: {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Warehouse_security_camera.jpg",
    alt: "Warehouse security camera",
    author: "Wikimedia Commons contributors",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Warehouse_security_camera.jpg",
    licenseName: "CC BY-SA",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  controlCentre: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Control_room.jpg",
    alt: "Control room monitors",
    author: "Wikimedia Commons contributors",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Control_room.jpg",
    licenseName: "CC BY-SA",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
} as const satisfies Record<string, CcImage>;

export type CcImageKey = keyof typeof ccImages;

