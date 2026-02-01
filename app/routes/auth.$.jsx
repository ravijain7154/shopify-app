import { authenticate } from "../shopify.server";
import { ensureScriptTagForShop } from "../utils/scriptTag.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  // Attempt to create a ScriptTag for the shop so storefront gets the filter injected
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get('shop');
    if (shop) {
      await ensureScriptTagForShop(shop);
    }
  } catch (err) {
    console.error('Error ensuring script tag:', err);
  }

  return null;
};
