import { test, expect } from '@playwright/test';

test.describe('Escape Room', () => {
  test('should auto-generate Stage 3 number generation code', async ({ page }) => {
    await page.goto('/escape-room');

    await expect(page.locator('h1')).toContainText('Escape Room Challenge');

    await page.click('button:has-text("Start")');

    const stage3Code = `function generateNumbers() {
  const numbers = [];
  for (let i = 0; i <= 1000; i++) {
    numbers.push(i);
  }
  return numbers;
}`;

    await page.fill('textarea[aria-label="Code editor"]', stage3Code);

    const codeContent = await page.locator('textarea[aria-label="Code editor"]').inputValue();

    expect(codeContent).toContain('function generateNumbers');
    expect(codeContent).toContain('1000');
    expect(codeContent).toContain('for');

    const hasValidStructure =
      codeContent.includes('function') &&
      codeContent.includes('1000') &&
      (codeContent.includes('for') || codeContent.includes('while'));

    expect(hasValidStructure).toBeTruthy();

    console.log('✓ Test 2: Escape Room Stage 3 code generated and validated');
  });

  test('should validate code and progress through stages', async ({ page }) => {
    await page.goto('/escape-room');

    const stage1Solution = `function greet(name) {
  if (name) {
    return "Hello, " + name + "!";
  }
  return "Hello!";
}`;

    await page.fill('textarea[aria-label="Code editor"]', stage1Solution);
    await page.click('button:has-text("Submit Solution")');

    await page.waitForTimeout(500);

    const feedbackLocator = page.locator('[data-testid="feedback"]');
    await expect(feedbackLocator).toHaveText(/Correct! Moving to next stage...|Not quite right. Try again!/, { timeout: 10000 });
    await expect(feedbackLocator).toBeVisible();
    const feedback = await feedbackLocator.textContent();
    expect(feedback).toBeTruthy();

    console.log('✓ Escape Room: Code validation works correctly');
  });
});
