const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:/Users/Luis/.gemini/antigravity/brain/73e2fe3a-cf25-4764-a3e9-dba238a49439/.system_generated/logs/transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let edits = [];

  for await (const line of rl) {
    try {
      const entry = JSON.parse(line);
      if (entry.tool_calls) {
        for (const tc of entry.tool_calls) {
          if ((tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') && tc.args.TargetFile.includes('index.html')) {
            edits.push({
              step: entry.step_index,
              name: tc.name,
              args: tc.args
            });
          }
        }
      }
    } catch (e) {
      // ignore parsing errors on truncated lines
    }
  }

  // Save the edits to a JSON file for analysis
  fs.writeFileSync('edits.json', JSON.stringify(edits, null, 2));
  console.log(`Found ${edits.length} edits.`);
}

processLineByLine();
