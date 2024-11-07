import { beforeEach, expect, jest } from "@jest/globals";

// mocking out database actions without actuallly creating the database.
jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  saveDB: jest.fn(),
  getDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { getAllNotes, removeAllNotes, removeNote, newNote, findNote } =
  await import("../src/notes.js");

// clearing out the previous test state
beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const note = "Test note";
  const tags = ["note1", "note2"];
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };
  insertDB.mockResolvedValue(data);

  const result = await newNote(data.content, data.tags);
  expect(result.content).toEqual(data.content);
  //   expect(result.tags).toEqual(data.content.tags);
});

test("getAllNotes returns all notes", async () => {
  const db = {
    notes: ["notes1", "notes2", "notes3"],
  };
  getDB.mockResolvedValue(db);

  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

test("removeAllNotes removes all notes", async () => {
  const db = {
    notes: ["notes1", "notes2", "notes3"],
  };
  const newDb = {
    notes: []
  }
  saveDB.mockResolvedValue(db);
  const result = await removeAllNotes();
  expect(result).toEqual(newDb.notes);
});

test("removeNote removes specific note identified by id", async () => {
  const db = {
    notes: [
      {
        "tags": [],
        "content": "Test 1",
        "id": 1
      },
      {
        "tags": [],
        "content": "Test 2",
        "id": 2
      },
      {
        "tags": [],
        "content": "Test 3",
        "id": 3
      },
    ]
  }
  const id = 2
  saveDB.mockResolvedValue(db)
  const result = await removeNote(id)
  expect(result).toBeUndefined()
})

test("findNote returns note based on its content ", async()=> {
  const db = {
    notes: [
      {
        "tags": [],
        "content": "Test 1",
        "id": 1
      },
      {
        "tags": [],
        "content": "Test 2",
        "id": 2
      },
      {
        "tags": [],
        "content": "Test 3",
        "id": 3
      },
    ]
  }

  const content = "Test 2"
  getDB.mockResolvedValue(db)
  const result = await findNote(content)
  expect(result).not.toBeNull()
  expect(result[0].content).toEqual(content)
})
