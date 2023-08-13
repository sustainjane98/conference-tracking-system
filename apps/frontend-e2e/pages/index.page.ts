import { expect, Page } from '@playwright/test';
import { DataTestIds } from '@conference-tracking-system/frontend/tests';
import { tasks } from '../data/tasks';
export class IndexPage {
  public constructor(private page: Page) {}

  public async goto() {
    await this.page.goto('/');
  }

  public async enterExampleTasksInTaskInput() {
    for (const task of tasks) {
      await this.enterTextInTaskInput(task);
      await this.submitTaskForm();
    }
  }

  public async getValueInTextProcessingArea() {
    return await this.page
      .getByTestId(DataTestIds.INDEX.TALK_PROCESSING_AREA)
      .inputValue();
  }

  public async validateSnapshotOfTasksProcessingArea() {
    const value = await this.getValueInTextProcessingArea();
    expect(value).toMatchSnapshot('text-processing-area.txt');
  }

  public async enterTextInTaskInput(text: string) {
    await this.page.getByTestId(DataTestIds.INDEX.TALK_ENTRY_INPUT).fill(text);
  }

  public async submitTaskForm() {
    await this.page.getByTestId(DataTestIds.INDEX.TALK_ENTRY_SUBMIT).click();
  }
}
