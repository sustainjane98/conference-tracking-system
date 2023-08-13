import { test } from '../fixtures/index.fixture';

test.describe('Index Page', () => {
  test('Add talks and check if output matches', async ({ indexPage }) => {
    await indexPage.enterExampleTasksInTaskInput();
    await indexPage.validateSnapshotOfTasksProcessingArea();
  });
});
