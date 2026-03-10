import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const syllabusDir = path.join(__dirname, "../syllabus");
const coursesDir = path.join(syllabusDir, "courses");
const outputFile = path.join(syllabusDir, "syllabus.json");

async function buildSyllabus() {

  const courses = [];

  const courseFolders = fs.readdirSync(coursesDir, { withFileTypes: true });

  for (const folder of courseFolders) {

    if (!folder.isDirectory()) continue;

    const coursePath = path.join(coursesDir, folder.name, "course.js");

    const courseModule = await import(pathToFileURL(coursePath));
    const course = courseModule.default;

    const chaptersDir = path.join(coursesDir, folder.name, "chapters");

    const chapterObjects = [];

    for (const chapterSlug of course.chapters) {

      const chapterPath = path.join(chaptersDir, `${chapterSlug}.js`);

      const chapterModule = await import(pathToFileURL(chapterPath));
      const chapter = chapterModule.default;

      chapterObjects.push(chapter);
    }

    course.chapters = chapterObjects;

    courses.push(course);
  }

  const syllabus = { courses };

  fs.writeFileSync(outputFile, JSON.stringify(syllabus, null, 2));

  console.log("✅ syllabus.json built");
}

buildSyllabus();