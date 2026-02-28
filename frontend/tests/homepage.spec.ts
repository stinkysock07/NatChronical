import { test, expect } from '@playwright/test';

test.describe('Homepage Article List', () => {
  test.beforeEach(async ({ page }) => {
    // Change this to match your dev port
    await page.goto('http://localhost:3000/home');
  });

  test('should display the main heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /Latest Articles/i });
    await expect(heading).toBeVisible();
  });

  test('should list articles from the data file', async ({ page }) => {
    // This checks if at least one article link exists
    const articleLinks = page.locator('a[href^="/article/"]');
    const count = await articleLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to the correct article page when clicked', async ({
    page,
  }) => {
    // 1. Find the first article link
    const firstArticle = page.locator('a[href^="/article/"]').first();
    const articleTitle = await firstArticle.locator('h3').textContent();

    // 2. Click it
    await firstArticle.click();

    // 3. Verify the URL changed and the title matches
    await expect(page).toHaveURL(/\/article\//);
    const detailHeading = page.getByRole('heading', { level: 1 });
    await expect(detailHeading).toHaveText(articleTitle || '');
  });
});
