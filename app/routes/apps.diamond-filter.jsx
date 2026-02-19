import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import {
  Page,
  Layout,
  BlockStack,
  Text,
  Card,
  Button,
  Banner,
  InlineStack,
  Divider
} from "@shopify/polaris";
import { prisma } from "~/db.server";

export const loader = async () => {
  try {
    // Get diamond count from database
    const diamondCount = await prisma.diamond.count();
    
    // Get color settings
    const colorSetting = await prisma.colorsetting.findFirst();
    
    return json({
      diamondCount: diamondCount || 0,
      color: colorSetting?.color || '#ffffff',
      appUrl: process.env.SHOPIFY_APP_URL || ''
    });
  } catch (error) {
    console.error('Error loading diamond-filter data:', error);
    return json({
      diamondCount: 0,
      color: '#ffffff',
      appUrl: ''
    });
  }
};

export default function AppsDiamondFilter() {
  const { diamondCount, color } = useLoaderData();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f1f2f4'
    }}>
      {/* Custom Shopify-style Header */}
      <header style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #dfe3e8',
        padding: '0 20px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <InlineStack gap="400" align="start">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="4" fill="#95BF47"/>
              <path d="M16 8L22 12V20L16 24L10 20V12L16 8Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <Text as="h1" variant="headingMd" style={{ margin: 0 }}>
              Diamond Filter
            </Text>
          </div>
        </InlineStack>
        
        <InlineStack gap="300" align="end">
          <Link to="/app">
            <Button variant="primary" size="slim">
              Go to Dashboard
            </Button>
          </Link>
        </InlineStack>
      </header>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <Layout>
          <Layout.Section>
            <BlockStack gap="500">
              <Banner title="Diamond Filter App" tone="info">
                <p>
                  Welcome to the Diamond Filter app. This app allows you to manage 
                  and filter your diamond inventory. Use the links below to access 
                  different features.
                </p>
              </Banner>

              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Quick Stats
                  </Text>
                  <InlineStack gap="600" wrap={false}>
                    <BlockStack gap="200">
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Total Diamonds
                      </Text>
                      <Text as="p" variant="headingLg">
                        💎 {diamondCount.toLocaleString()}
                      </Text>
                    </BlockStack>
                    <div style={{ width: '1px', backgroundColor: '#dfe3e8' }}></div>
                    <BlockStack gap="200">
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Theme Color
                      </Text>
                      <InlineStack gap="200" align="start">
                        <Text as="p" variant="headingLg">
                          <span 
                            style={{ 
                              display: 'inline-block', 
                              width: '24px', 
                              height: '24px', 
                              backgroundColor: color, 
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              verticalAlign: 'middle',
                              marginRight: '8px'
                            }} 
                          />
                          {color}
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </InlineStack>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="400">
                  <Text as="h2" variant="headingMd">
                    Available Features
                  </Text>
                  
                  <BlockStack gap="300">
                    <Link to="/app" style={{ textDecoration: 'none' }}>
                      <div style={{
                        padding: '16px',
                        border: '1px solid #dfe3e8',
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}>
                        <InlineStack gap="300" align="space-between">
                          <BlockStack gap="200">
                            <Text as="h3" variant="headingSm">
                              📊 Dashboard - Manage Diamonds
                            </Text>
                            <Text as="p" variant="bodyMd" tone="subdued">
                              Access the full diamond management interface with filtering, 
                              search, and inventory management tools.
                            </Text>
                          </BlockStack>
                          <Button variant="primary" size="slim">
                            Open
                          </Button>
                        </InlineStack>
                      </div>
                    </Link>
                  </BlockStack>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
          
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Need Help?
                </Text>
                <Text as="p" variant="bodyMd">
                  This app is integrated with your Shopify store. You can access 
                  additional features from the main dashboard.
                </Text>
                <Divider />
                <Link to="/app" style={{ textDecoration: 'none' }}>
                  <Button variant="secondary" override={{ width: '100%' }}>
                    Go to Dashboard
                  </Button>
                </Link>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text as="h2" variant="headingMd">
                  App Information
                </Text>
                <BlockStack gap="200">
                  <InlineStack gap="200" align="space-between">
                    <Text as="p" variant="bodyMd" tone="subdued">Version</Text>
                    <Text as="p" variant="bodyMd">1.0.0</Text>
                  </InlineStack>
                  <InlineStack gap="200" align="space-between">
                    <Text as="p" variant="bodyMd" tone="subdued">Status</Text>
                    <Text as="p" variant="bodyMd" tone="success">Active</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </main>

      {/* Custom Shopify-style Footer */}
      <footer style={{
        backgroundColor: '#fff',
        borderTop: '1px solid #dfe3e8',
        padding: '16px 24px',
        textAlign: 'center'
      }}>
        <InlineStack gap="400" align="center" blockAlign="center">
          <Text as="p" variant="bodySm" tone="subdued">
            © 2024 Diamond Filter App. All rights reserved.
          </Text>
          <InlineStack gap="300">
            <Link to="/app" style={{ color: '#008060', textDecoration: 'none', fontSize: '14px' }}>
              Dashboard
            </Link>
            <span style={{ color: '#dfe3e8' }}>|</span>
            <a href="#" style={{ color: '#008060', textDecoration: 'none', fontSize: '14px' }}>
              Help
            </a>
          </InlineStack>
        </InlineStack>
      </footer>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#f1f2f4'
    }}>
      <header style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #dfe3e8',
        padding: '0 20px',
        height: '60px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Text as="h1" variant="headingMd">
          Diamond Filter
        </Text>
      </header>
      
      <main style={{ flex: 1, padding: '24px' }}>
        <Page title="Error">
          <BlockStack gap="400">
            <Banner title="Something went wrong" tone="critical">
              <p>There was an error loading the Diamond Filter page. Please try again.</p>
            </Banner>
            <Link to="/app">
              <Button variant="primary">Go to Dashboard</Button>
            </Link>
          </BlockStack>
        </Page>
      </main>

      <footer style={{
        backgroundColor: '#fff',
        borderTop: '1px solid #dfe3e8',
        padding: '16px 24px',
        textAlign: 'center'
      }}>
        <Text as="p" variant="bodySm" tone="subdued">
          © 2024 Diamond Filter App
        </Text>
      </footer>
    </div>
  );
}
