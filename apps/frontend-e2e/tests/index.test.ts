import { test } from '../fixtures/index.fixture';
import { expect } from '@playwright/test';

test.describe('Index Page', () => {
  test('Add talks and check if output matches', async ({ indexPage }) => {
    await indexPage.enterExampleTasksInTaskInput();
    await indexPage.validateSnapshotOfTasksProcessingArea();
  });

  test('Check if Input Count equals Output Count', async ({ indexPage }) => {
    await indexPage.enterExampleTasksInTaskInput();
    await indexPage.checkIfCountOfOutputMatchesInput();
  });

  test('Check if available Space between talks is used if possible', async ({
    indexPage,
  }) => {
    await indexPage.enterExampleTasksInTaskInput();
    const fillTask = await indexPage.enterFillTask();

    const processingAreaArray =
      await indexPage.getValueArrayInTextProcessingArea();

    expect(processingAreaArray?.[13]).toMatch(
      new RegExp(`^\\d+:\\d+\\s(AM|PM)\\s${fillTask.replace(/\s+/gm, '\\s')}$`)
    );
  });
});
