import { word_statistics } from "../src/index";
import path from "path";

const file_path: string = path.join(
  __dirname,
  "fixtures",
  "file_for_word_count_test.txt"
);

test("The word count is 6, as expected", async () => {
  const word_count = await word_statistics(file_path);
  expect(word_count).toBe(6);
});
