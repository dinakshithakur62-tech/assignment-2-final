import { test, expect } from '@playwright/test';

test.describe('Tabs Generator', () => {
  test('should generate valid HTML output with inline CSS', async ({ page }) => {
    await page.goto('/tabs');

    await expect(page.locator('h1')).toContainText('Dynamic Tabs Generator');

    await page.fill('input[placeholder="Tab header"]', 'Test Tab');
    await page.fill('textarea[placeholder="Tab content (HTML)"]', '<p>Test Content</p>');

    const htmlOutput = await page.locator('pre code').textContent();

    expect(htmlOutput).toContain('<!DOCTYPE html>');
    expect(htmlOutput).toContain('<html lang="en">');
    expect(htmlOutput).toContain('<style>');
    expect(htmlOutput).toContain('Test Tab');
    expect(htmlOutput).toContain('<script>');
    expect(htmlOutput).toContain('function openTab');

    const hasInlineStyles = htmlOutput?.includes('background:') || htmlOutput?.includes('padding:');
    expect(hasInlineStyles).toBeTruthy();

    console.log('✓ Test 1: Tabs HTML generated successfully with inline CSS');
  });

  test('should copy HTML to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/tabs');

    await page.click('button:has-text("Copy")');

    await expect(page.locator('button:has-text("Copied!")')).toBeVisible();

    console.log('✓ Tabs: Copy to clipboard functionality works');
  });
});
