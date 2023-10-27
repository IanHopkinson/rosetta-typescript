import { word_statistics, word_statistics_promise } from "../src/index";
import path from "path";

const file_path: string = path.join(
  __dirname,
  "fixtures",
  "file_for_word_count_test.txt"
);

test("The word count is 6, as expected (async/await)", async () => {
  const word_count = await word_statistics(file_path);
  expect(word_count).toBe(6);
});

test("The word count is 6, as expected (promises)", () => {
  const word_count_promise = word_statistics_promise(file_path);
  word_count_promise.then((word_count) => {
    expect(word_count).toBe(6);
  });
});
