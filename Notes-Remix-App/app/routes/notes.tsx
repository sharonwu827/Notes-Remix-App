import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NewList, { links as newListLinks } from "~/components/NewList";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { redirect, json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NewList notes={notes} />
    </main>
  );
}

//request coming from <form> element, browser action
export async function action({ request }) {
  const formData = await request.formData();
  const noteData = {
    id: new Date().toISOString(),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const existingData = await getStoredNotes();
  const updatedData = existingData.concat(noteData);
  await storeNotes(updatedData);
  // add validation
  //need to return a response redirect users
  return redirect("/notes");
}

export async function loader() {
  const Notes = await getStoredNotes();
  return Notes; //json string
  // if we want to send a responese
  // return json(notes);
}

//The purpose of this is to ensure that all necessary styles are loaded when rendering the NotesPage.
// If your NewNote component has its own styles, those styles will be included in the overall application when you import and use the links in the links function.
export function links() {
  return [...newNoteLinks(), ...newListLinks()];
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <p>{error.message}</p>;
}
