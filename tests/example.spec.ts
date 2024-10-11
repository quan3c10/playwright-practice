import { test, expect } from '@playwright/test';
import { PageManager } from '../pages/PageManager';

test('has title', async ({ page }) => {
  const pageManager = new PageManager(page, null);
  
  const dashBoardPage = pageManager.dashBoardPage;
  await dashBoardPage.open();
  if (await dashBoardPage.isOpened()) {
    await dashBoardPage.verifyTitleIs('Dashboard');
  }
});

test('get started link', async ({ page }) => {
  const pageManager = new PageManager(page, null);
  
  const dashBoardPage = pageManager.dashBoardPage;
  await dashBoardPage.open();
  if (await dashBoardPage.isOpened()) {
    await dashBoardPage.verifyTitleIs('VnShop - Mua sắm đơn giản hơn');
  }
});
