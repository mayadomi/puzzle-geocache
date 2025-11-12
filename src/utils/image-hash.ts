/**
 * Generates a unique identifier for an image URL
 * This is used to tie puzzle progress to specific images
 */
export const generateImageHash = (imageUrl: string): string => {
  // For URLs, use base64 encoding with length limit
  // For data URLs, use a subset to avoid performance issues
  try {
    if (imageUrl.startsWith('data:')) {
      // For data URLs, create a hash from the first part
      const hashInput = imageUrl.substring(0, Math.min(200, imageUrl.length));
      return btoa(hashInput).substring(0, 32).replace(/[/+=]/g, '_');
    }
    // For regular URLs, encode the full URL
    return btoa(imageUrl).substring(0, 32).replace(/[/+=]/g, '_');
  } catch (error) {
    // Fallback to a simple hash if btoa fails
    let hash = 0;
    for (let i = 0; i < imageUrl.length; i++) {
      const char = imageUrl.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }
};



