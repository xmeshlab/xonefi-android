import { describe, expect, test } from "@jest/globals";

import { log } from "../xonefi-api-client/log";

/**
 * const log = require("../api/log");

function main() {
    log.log("Howdy!");
}

main();
 */

describe("log-test", () => {
  test("log.log", () => {
    log("Howdy!");
    //Should return true if there is no error
    expect(1).toBe(1);
  });
});
