import styles from "~/styles/newNote.css";
import { Form, useNavigation } from "@remix-run/react";

function NewNote() {
  const navigate = useNavigation();
  // if i am submitting the form, disable the "add note" button
  const isSubmitting = navigate.state === "submitting";

  return (
    <Form method="post" id="note-form" action="/notes">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
