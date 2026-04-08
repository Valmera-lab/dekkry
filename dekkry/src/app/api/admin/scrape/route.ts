import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    // Fetch the page HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.5',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch page: ${response.status}` }, { status: 400 });
    }

    const html = await response.text();

    // Parse with cheerio (dynamic import for edge compatibility)
    const { load } = await import('cheerio');
    const $ = load(html);

    // Extract title
    const name =
      $('h1').first().text().trim() ||
      $('[class*="title"]').first().text().trim() ||
      $('title').text().replace(' - MuleBuy', '').trim() ||
      'Untitled Product';

    // Extract images
    const images: string[] = [];
    $('img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy');
      if (src && src.startsWith('http') && !src.includes('logo') && !src.includes('icon') && src.includes('image')) {
        images.push(src);
      }
    });

    // Also try og:image
    $('meta[property="og:image"]').each((_, el) => {
      const content = $(el).attr('content');
      if (content) images.push(content);
    });

    // Extract sizes
    const sizeKeywords = ['S', 'M', 'L', 'XL', 'XXL', 'One Size'];
    const foundSizes: string[] = [];
    $('*').each((_, el) => {
      const text = $(el).children().length === 0 ? $(el).text().trim() : '';
      if (sizeKeywords.includes(text) && !foundSizes.includes(text)) {
        foundSizes.push(text);
      }
    });

    // Extract colors from text patterns
    const colorKeywords = ['Black', 'White', 'Grey', 'Gray', 'Navy', 'Blue', 'Red', 'Green', 'Brown', 'Beige', 'Cream', 'Olive', 'Stone', 'Khaki'];
    const pageText = $('body').text();
    const foundColors = colorKeywords.filter((c) => pageText.includes(c));

    // Extract description
    const description =
      $('[class*="description"]').first().text().trim() ||
      $('[class*="detail"]').first().text().trim().substring(0, 300) ||
      'Premium streetwear piece from the DEKKRY collection.';

    // Extract price (look for numbers that look like prices)
    const priceMatch = pageText.match(/[£$€¥]?\s*(\d+\.?\d*)/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : 50;

    return NextResponse.json({
      name: name.substring(0, 100),
      description: description.substring(0, 500),
      price: Math.round(price),
      images: [...new Set(images)].slice(0, 8),
      sizes: foundSizes.length > 0 ? foundSizes : ['S', 'M', 'L', 'XL'],
      colors: foundColors.length > 0 ? foundColors : ['Black'],
      sourceUrl: url,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Scraping failed';
    console.error('Scrape error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
