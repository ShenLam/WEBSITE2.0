import { Page } from "@playwright/test";
import { getDateNow } from "../utils/timeUtils";

export class WaitFunction {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async pageLoadComplete(maxWaitMilliseconds = 40000, pollIntervalMilliseconds = 1000) {
        const startTime = getDateNow();
        let i = 0;

        while (getDateNow() < startTime + maxWaitMilliseconds) {
            const prevState = await this.page.content();
            await this.page.waitForTimeout(pollIntervalMilliseconds);
            i++;

            if (prevState === await this.page.content()) {
                // console.log(`Page load completed. Elapsed time: ${i * pollIntervalMilliseconds / 1000} seconds`);
                return;
            }
        }
    }
}