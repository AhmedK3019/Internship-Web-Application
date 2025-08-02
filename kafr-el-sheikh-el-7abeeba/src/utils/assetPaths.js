// Utility function to handle asset paths for GitHub Pages deployment
export const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
};

// For images in the public folder
export const getPublicAssetPath = (filename) => {
  return getAssetPath(filename);
};
