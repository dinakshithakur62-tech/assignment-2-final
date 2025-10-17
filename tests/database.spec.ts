import { test, expect } from '@playwright/test';

test.describe('Database Integration', () => {
  test('should save tabs output to database and retrieve it', async ({ page }) => {
    await page.goto('/tabs');

    await page.fill('input[placeholder="Tab header"]', 'Database Test Tab');
    await page.fill('textarea[placeholder="Tab content (HTML)"]', '<p>Database Test Content</p>');

    await page.click('button:has-text("Save")');

    await expect(page.locator('button:has-text("Saved!")')).toBeVisible({ timeout: 5000 });

    const response = await page.request.get('/api/outputs');
    expect(response.ok()).toBeTruthy();

    const outputs = await response.json();
    expect(Array.isArray(outputs)).toBeTruthy();
    expect(outputs.length).toBeGreaterThan(0);

    const latestOutput = outputs[0];
    expect(latestOutput).toHaveProperty('id');
    expect(latestOutput).toHaveProperty('outputType');
    expect(latestOutput).toHaveProperty('htmlContent');
    expect(latestOutput.htmlContent).toContain('Database Test Tab');

    console.log('✓ Test 3: Database save and retrieve functionality works');
    console.log('✓ Latest output ID:', latestOutput.id, 'Type:', latestOutput.outputType);
  });

  test('should handle CRUD operations correctly', async ({ page }) => {
    const createResponse = await page.request.post('/api/outputs', {
      data: {
        outputType: 'test',
        htmlContent: '<html>Test Content</html>',
      },
    });
    expect(createResponse.ok()).toBeTruthy();
    const created = await createResponse.json();
    const outputId = created.id;

    const getResponse = await page.request.get(`/api/outputs/${outputId}`);
    expect(getResponse.ok()).toBeTruthy();

    const updateResponse = await page.request.put(`/api/outputs/${outputId}`, {
      data: {
        htmlContent: '<html>Updated Content</html>',
      },
    });
    expect(updateResponse.ok()).toBeTruthy();

    const deleteResponse = await page.request.delete(`/api/outputs/${outputId}`);
    expect(deleteResponse.ok()).toBeTruthy();

    console.log('✓ Database: All CRUD operations completed successfully');
  });
});
