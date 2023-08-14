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
      await this.checkIfTaskInputHasNoErrors();
    }
  }

  public async enterFillTask(duration = 15) {
    const fillTask = `Fill Task ${duration}min`;

    await this.enterTextInTaskInput(fillTask);
    await this.submitTaskForm();
    await this.checkIfTaskInputHasNoErrors();

    return fillTask;
  }

  public async getValueInTextProcessingArea() {
    return await this.page
      .getByTestId(DataTestIds.INDEX.TALK_PROCESSING_AREA)
      .inputValue();
  }

  public async getValueArrayInTextProcessingArea() {
    return this.processingAreaElements(
      await this.page
        .getByTestId(DataTestIds.INDEX.TALK_PROCESSING_AREA)
        .inputValue()
    );
  }

  public async checkIfTaskInputHasNoErrors() {
    await expect(
      this.page.getByTestId(
        DataTestIds.INDEX.INPUT_ERROR(DataTestIds.INDEX.TALK_ENTRY_INPUT)
      )
    ).toHaveCount(0);
  }

  public processingAreaElements(area: string) {
    return area
      .replace(/Track \d: \n/gm, '')
      .replace(/\d+:\d+ (AM|PM) Lunch \d+min\n/gm, '')
      .replace(/\d+:\d+ (AM|PM) Networking Event\n/gm, '')
      .split('\n')
      .filter((out) => out !== '');
  }

  public async checkIfCountOfOutputMatchesInput() {
    const output = await this.getValueArrayInTextProcessingArea();
    expect(output.length).toBe(tasks.length);
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
