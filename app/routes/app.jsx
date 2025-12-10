// app/routes/app.js
import { json } from "@remix-run/node";
import { Link, useLoaderData, useActionData, Form } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { NavMenu } from "@shopify/app-bridge-react";

const prisma = new PrismaClient();

export const loader = async () => {
  try {
    const colorSetting = await prisma.colorsetting.findFirst();
    return json({ 
      color: colorSetting?.color || '#ffffff'
    });
  } catch (error) {
    console.error('Loader error:', error);
    return json({ color: '#ffffff' });
  }
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const color = formData.get('color') || '#ffffff';
    
    await prisma.colorsetting.upsert({
      where: { id: 1 },
      update: { color },
      create: { color },
    });
    
    return json({ 
      message: "Color saved successfully!",
      color 
    });
  } catch (error) {
    console.error("Error saving color:", error);
    return json({ error: "Failed to save color" }, { status: 500 });
  }
};
  // Update sync status when fetcher completes
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      setIsSyncing(false);
      setSyncMessage(fetcher.data.message);
      // Revalidate the root loader to refresh the products list
      if (fetcher.data.success) {
        revalidator.revalidate();
      }
      // Clear message after 5 seconds
      const timer = setTimeout(() => setSyncMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.state, fetcher.data, revalidator]);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncMessage('Syncing diamonds...');
    fetcher.submit(
      { sync: 'true' },
      { method: 'post', action: '/api/sync' }
    );
  };
export default function AppRoute() {
  const { color } = useLoaderData();
  const actionData = useActionData();

  return (
    <>
    <h1 className="title">Diamonds Management</h1>
                  
                  <Card>
                    <BlockStack gap="300">
                      <InlineStack align="space-between">
                        <div>
                          <h2>Database Status</h2>
                          <p className="text">{message}</p>
                          {syncMessage && (
                            <Text as="p" variant="bodyMd" color={fetcher.data?.success ? 'success' : 'critical'}>
                              {syncMessage}
                            </Text>
                          )}
                        </div>
                        <Button
                          onClick={handleSync}
                          disabled={isSyncing}
                          variant="primary"
                        >
                          {isSyncing ? 'Syncing...' : 'Sync Diamonds'}
                        </Button>
                      </InlineStack>
                    </BlockStack>
                  </Card>
    
      <h2>Customize Appearance</h2>
      <Form method="post">
        <div>
          <label htmlFor="color">Select Color: </label>
          <input
            type="color"
            name="color"
            id="color"
            defaultValue={color}
            required
          />
        </div>
        
        {actionData?.error && <div style={{ color: 'red' }}>{actionData.error}</div>}
        {actionData?.message && <div style={{ color: 'green' }}>{actionData.message}</div>}
        
        <button type="submit">Save Color</button>
      </Form>

      <div>
        <p>Current Color:</p>
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: actionData?.color || color,
            border: "1px solid #000"
          }}
        />
      </div>
    </>
  );
}

export function ErrorBoundary() {
  return <div>Something went wrong in the app route!</div>;
}