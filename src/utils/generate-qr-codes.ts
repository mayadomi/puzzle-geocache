/**
 * Utility to generate QR code data for puzzle pieces
 * This generates the URLs that should be encoded into QR codes and printed on cards
 */

export interface PieceQRData {
  pieceId: string;
  row: number;
  col: number;
  url: string;
  displayName: string;
}

/**
 * Generate QR code URLs for all pieces in a puzzle
 * 
 * @param baseUrl - The base URL of your puzzle (e.g., "https://yoursite.com/puzzle")
 * @param rows - Number of rows in the puzzle
 * @param columns - Number of columns in the puzzle
 * @returns Array of QR code data for each piece
 * 
 * @example
 * const qrData = generatePuzzleQRCodes("https://mysite.com/puzzle", 4, 3);
 * // Returns: [
 * //   { pieceId: "0-0", row: 0, col: 0, url: "https://mysite.com/puzzle?unlock=0-0", displayName: "Piece 1" },
 * //   { pieceId: "0-1", row: 0, col: 1, url: "https://mysite.com/puzzle?unlock=0-1", displayName: "Piece 2" },
 * //   ...
 * // ]
 */
export const generatePuzzleQRCodes = (
  baseUrl: string,
  rows: number,
  columns: number
): PieceQRData[] => {
  const qrData: PieceQRData[] = [];
  let pieceNumber = 1;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const pieceId = `${row}-${col}`;
      const url = `${baseUrl}?unlock=${pieceId}`;

      qrData.push({
        pieceId,
        row,
        col,
        url,
        displayName: `Piece ${pieceNumber}`,
      });

      pieceNumber++;
    }
  }

  return qrData;
};

/**
 * Generate a single QR code URL for a specific piece
 * 
 * @param baseUrl - The base URL of your puzzle
 * @param row - Row index of the piece
 * @param col - Column index of the piece
 * @returns The URL to encode in a QR code
 */
export const generateSinglePieceQRCode = (
  baseUrl: string,
  row: number,
  col: number
): string => {
  const pieceId = `${row}-${col}`;
  return `${baseUrl}?unlock=${pieceId}`;
};

/**
 * Export QR code data as CSV format for easy printing
 * 
 * @param qrData - Array of QR data from generatePuzzleQRCodes
 * @returns CSV string that can be saved to a file
 */
export const exportQRCodesAsCSV = (qrData: PieceQRData[]): string => {
  const headers = ['Piece ID', 'Display Name', 'Row', 'Column', 'QR Code URL'];
  const rows = qrData.map((piece) => [
    piece.pieceId,
    piece.displayName,
    piece.row.toString(),
    piece.col.toString(),
    piece.url,
  ]);

  const csvRows = [headers, ...rows].map((row) => row.join(',')).join('\n');
  return csvRows;
};

/**
 * Example usage - prints QR data to console
 * This can be used to generate QR codes for printing
 */
export const printQRCodeExample = () => {
  const baseUrl = 'https://yoursite.com/puzzle';
  const rows = 4;
  const columns = 3;

  const qrData = generatePuzzleQRCodes(baseUrl, rows, columns);

  console.log('=== QR Code URLs for Printing ===');
  console.log('Generate QR codes from these URLs and print them on cards:\n');

  qrData.forEach((piece) => {
    console.log(`${piece.displayName} (${piece.pieceId}):`);
    console.log(`  URL: ${piece.url}`);
    console.log('');
  });

  console.log('\n=== CSV Export ===');
  console.log('Copy this CSV data and paste into a spreadsheet:');
  console.log(exportQRCodesAsCSV(qrData));
};

/**
 * Instructions for generating physical QR codes:
 * 
 * 1. Call generatePuzzleQRCodes() with your puzzle URL and dimensions
 * 2. Use each URL to generate a QR code using:
 *    - Online tools: qr-code-generator.com, qrcode-monkey.com
 *    - Libraries: qrcode npm package, react-qr-code
 * 3. Print the QR codes on cards (one per piece)
 * 4. Distribute the cards to users
 * 5. When a user scans a card, they'll be taken to your puzzle with that piece unlocked!
 */


