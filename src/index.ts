#!/usr/bin/env node

/** 
A commandline utility to count words in a file
*/

import * as fs from "fs";
import * as rd from "readline";
import { once } from "events";

async function main() {
  let file_path: string = "";
  if (process.argv.length == 3) {
    file_path = process.argv[2];
  } else {
    console.log(
      `${
        process.argv.length - 2
      } arguments provided, 1 expected. Exiting without action`
    );
    process.exit();
  }

  const word_count = await word_statistics(file_path);

  console.log(`File "${file_path}" contains ${word_count} words`);
}

export async function word_statistics(file_path: string): Promise<number> {
  let word_count: number = 0;

  const reader = rd.createInterface(fs.createReadStream(file_path));

  reader.on("line", (line: string) => {
    const words = line.split(" ");
    word_count += words.length;
  });

  await once(reader, "close");
  return word_count;
}

if (require.main === module) {
  main();
}
