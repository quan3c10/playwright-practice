import { test } from '../fixture/pages';

test('has title', async ({ dashBoardPage }) => {
  await dashBoardPage.open();
  if (await dashBoardPage.isOpened()) {
    await dashBoardPage.verifyTitleIs('Automation Exercise');
  }
});

test('get started link', async ({ dashBoardPage }) => {
  await dashBoardPage.open();
  if (await dashBoardPage.isOpened()) {
    await dashBoardPage.verifyTitleIs('VnShop - Mua sắm đơn giản hơn');
  }
});
