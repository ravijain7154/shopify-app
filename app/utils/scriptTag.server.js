import prisma from "../db.server";

const API_VERSION = '2024-07';

export async function ensureScriptTagForShop(shop) {
  if (!shop) return false;

  // Find a session for the shop with an access token
  const sessionRecord = await prisma.session.findFirst({
    where: { shop, accessToken: { not: null } },
  });

  if (!sessionRecord) {
    console.warn(`No session found with access token for shop ${shop}`);
    return false;
  }

  const token = sessionRecord.accessToken;
  const base = `https://${shop}/admin/api/${API_VERSION}`;

  const scriptSrc = `${(process.env.SHOPIFY_APP_URL || '').replace(/\/$/, '')}/diamond-filter/inject.js`;

  try {
    // Check existing script tags
    const listRes = await fetch(`${base}/script_tags.json`, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
    });

    if (!listRes.ok) {
      const text = await listRes.text();
      console.warn('Failed to list script_tags:', listRes.status, text);
      return false;
    }

    const listJson = await listRes.json();
    const existing = (listJson.script_tags || []).find(tag => tag.src === scriptSrc);

    if (existing) {
      console.log(`ScriptTag already exists for ${shop}`);
      return true;
    }

    // Create ScriptTag
    const createRes = await fetch(`${base}/script_tags.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ script_tag: { event: 'onload', src: scriptSrc } }),
    });

    if (!createRes.ok) {
      const text = await createRes.text();
      console.error('Failed to create script_tag:', createRes.status, text);
      return false;
    }

    const createJson = await createRes.json();
    console.log('Created ScriptTag for', shop, createJson.script_tag?.id);
    return true;
  } catch (err) {
    console.error('Error creating/checking script tag for', shop, err);
    return false;
  }
}
