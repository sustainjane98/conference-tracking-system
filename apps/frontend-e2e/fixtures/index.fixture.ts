import { test as base } from '@playwright/test';
import { IndexPage } from '../pages/index.page';

export const test = base.extend<{ indexPage: IndexPage }>({
  indexPage: async ({ page }, use) => {
    const todoPage = new IndexPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});
