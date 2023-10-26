import { word_statistics } from "../src/index";
import path from "path";

const file_path: string = path.join(
  __dirname,
  "fixtures",
  "file_for_word_count_test.txt"
);

describe("Testing word_statistics function", () => {
  test("Test file contains six words", () => {
    expect(word_statistics(file_path)).toBe(6);
  });
});
