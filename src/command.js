import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  getAllNotes,
  removeAllNotes,
  removeNote,
  newNote,
  findNote,
} from "./notes.js";
import { start } from "./server.js";

const listNote = (notes) => {
  notes.forEach(note => {
    console.log("\n")
    console.log("id: ", note.id)
    console.log("tags: ", note.tags.join(",  "))
    console.log("content: ", note.content)
  });
}

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      // configures the note argument
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note to create",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(",") : [];
      const note = await newNote(argv.note, tags);
      console.log("Note added!", note.id);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async () => {
      const notes = await getAllNotes()
       listNote(notes)
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        description:
          "The search term to filter notes by, will be applied to note.content",
      });
    },
    async (argv) => {
      const notes =  await findNote(argv.filter)
      listNote(notes)
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("number", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
     const id =  await removeNote(argv.id)
     if (id) {
      console.log("Removed note with: ",id)
     } else {
      console.log("Note not found")
     }
    
    }
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        description: "port to bind on",
        type: "number",
        default: 5000,
      });
    },
    async (argv) => {
      const notes = await getAllNotes()
      start(notes, argv.port)
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
     await  removeAllNotes()
     console.log("All notes have been removed!")
    }
  )
  .demandCommand(1)
  .parse();
