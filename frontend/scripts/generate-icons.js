/**
 * Generate PWA icons from the SVG source.
 * Uses the Canvas API via a simple HTML approach.
 * Run: node scripts/generate-icons.js
 */
const fs = require('fs');
const path = require('path');

// We'll create simple solid-color PNG icons with the wheat symbol
// since we don't have sharp/canvas installed.
// These are valid minimal PNGs with the brand color.

function createMinimalPNG(size) {
    // Create a simple PNG with green background
    // PNG structure: signature + IHDR + IDAT + IEND

    const width = size;
    const height = size;

    // PNG Signature
    const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

    // IHDR chunk
    const ihdrData = Buffer.alloc(13);
    ihdrData.writeUInt32BE(width, 0);
    ihdrData.writeUInt32BE(height, 4);
    ihdrData[8] = 8; // bit depth
    ihdrData[9] = 2; // color type: RGB
    ihdrData[10] = 0; // compression
    ihdrData[11] = 0; // filter
    ihdrData[12] = 0; // interlace

    const ihdrChunk = createChunk('IHDR', ihdrData);

    // Raw image data (green #16a34a)
    const r = 0x16, g = 0xa3, b = 0x4a;
    const rawData = [];
    for (let y = 0; y < height; y++) {
        rawData.push(0); // filter byte: None
        for (let x = 0; x < width; x++) {
            // Create a simple circular icon with white center symbol
            const cx = width / 2, cy = height / 2;
            const dx = x - cx, dy = y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const cornerRadius = width * 0.18;

            // Check if we're inside rounded rect
            const inset = cornerRadius;
            let inside = true;
            if (x < inset && y < inset) {
                inside = Math.sqrt((x - inset) ** 2 + (y - inset) ** 2) <= cornerRadius;
            } else if (x >= width - inset && y < inset) {
                inside = Math.sqrt((x - (width - inset)) ** 2 + (y - inset) ** 2) <= cornerRadius;
            } else if (x < inset && y >= height - inset) {
                inside = Math.sqrt((x - inset) ** 2 + (y - (height - inset)) ** 2) <= cornerRadius;
            } else if (x >= width - inset && y >= height - inset) {
                inside = Math.sqrt((x - (width - inset)) ** 2 + (y - (height - inset)) ** 2) <= cornerRadius;
            }

            if (!inside) {
                rawData.push(255, 255, 255); // white/transparent outside
            } else {
                // Gradient from #16a34a to #15803d
                const gradFactor = (x + y) / (width + height);
                const gr = Math.round(0x16 + (0x15 - 0x16) * gradFactor);
                const gg = Math.round(0xa3 + (0x80 - 0xa3) * gradFactor);
                const gb = Math.round(0x4a + (0x3d - 0x4a) * gradFactor);

                // Draw a simple white sprout in center
                const relX = (x - cx) / (width * 0.35);
                const relY = (y - cy) / (height * 0.35);

                // Stem
                const isStem = Math.abs(relX) < 0.06 && relY > -0.6 && relY < 0.8;
                // Left leaf
                const leafL = Math.abs(relX + 0.25 + relY * 0.3) < 0.15 && relY > -0.5 && relY < 0.2;
                // Right leaf
                const leafR = Math.abs(relX - 0.25 - relY * 0.3) < 0.15 && relY > -0.3 && relY < 0.4;
                // Top
                const isTop = Math.abs(relX) < 0.1 && relY > -0.9 && relY < -0.5;

                if (isStem || leafL || leafR || isTop) {
                    rawData.push(255, 255, 255); // white
                } else {
                    rawData.push(gr, gg, gb);
                }
            }
        }
    }

    const rawBuf = Buffer.from(rawData);

    // Compress with zlib
    const zlib = require('zlib');
    const compressed = zlib.deflateSync(rawBuf);

    const idatChunk = createChunk('IDAT', compressed);

    // IEND chunk
    const iendChunk = createChunk('IEND', Buffer.alloc(0));

    return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
    const length = Buffer.alloc(4);
    length.writeUInt32BE(data.length, 0);

    const typeBuffer = Buffer.from(type, 'ascii');
    const crcData = Buffer.concat([typeBuffer, data]);

    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(crcData), 0);

    return Buffer.concat([length, typeBuffer, data, crc]);
}

function crc32(buf) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
        crc ^= buf[i];
        for (let j = 0; j < 8; j++) {
            if (crc & 1) {
                crc = (crc >>> 1) ^ 0xEDB88320;
            } else {
                crc = crc >>> 1;
            }
        }
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Generate icons
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

[192, 512].forEach(size => {
    const png = createMinimalPNG(size);
    const outPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    fs.writeFileSync(outPath, png);
    console.log(`Generated: ${outPath} (${png.length} bytes)`);
});

console.log('PWA icons generated successfully!');
