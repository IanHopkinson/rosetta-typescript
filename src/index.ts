#!/usr/bin/env node

/** 
A commandline utility to count words in a file
*/

import * as fs from "fs";
import * as rd from "readline";
import { once } from "events";

function main() {
  let file_path: string = "";
  if (process.argv.length == 2) {
    file_path = process.argv[1];
  } else {
    console.log(
      `${
        process.argv.length - 1
      } arguments provided, 1 expected. Exiting without action`
    );
    process.exit();
  }
  const word_count: number = word_statistics(file_path);

  console.log(`File ${file_path} counts ${word_count} words`);
}

export async function word_statistics(file_path: string): Promise<number> {
  let word_count: number = 0;

  // https://stackoverflow.com/questions/46139797/looping-through-the-text-file-in-typescript
  const reader = rd.createInterface(fs.createReadStream(file_path));

  reader.on("line", (line: string) => {
    const words = line.split(" ");
    console.log(words);
    word_count += words.length;
    console.log(word_count);
  });

  await once(reader, "close");
  return word_count;
}

if (require.main === module) {
  main();
}
