/**
 * Converts a Google Drive share link into a direct image URL that can be consumed by next/image.
 * 
 * Example Input: https://drive.google.com/file/d/1CVB-vZTKtupYdSJIywZijnO8hQP3MGLt/view?usp=drive_link
 * Example Output: https://drive.google.com/uc?id=1CVB-vZTKtupYdSJIywZijnO8hQP3MGLt&export=download
 * 
 * @param {string} url - The original image URL.
 * @returns {string} - The direct image URL if it's a Google Drive link, otherwise the original URL.
 */
export function getDirectImageUrl(url) {
    if (!url) return url;

    // Check if it's a Google Drive link
    if (url.includes('drive.google.com')) {
        // Match file ID from various formats (/file/d/{ID} or ?id={ID})
        const fileIdMatch = url.match(/\/file\/d\/([^/?]+)/) || url.match(/[?&]id=([^&]+)/);

        if (fileIdMatch && fileIdMatch[1]) {
            const fileId = fileIdMatch[1];
            return `https://drive.google.com/uc?id=${fileId}&export=download`;
        }
    }

    return url;
}
