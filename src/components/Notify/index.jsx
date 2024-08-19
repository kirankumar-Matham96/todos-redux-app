import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Displays a success notification with the provided message.
 *
 * @param {string} message - The message to display in the success notification.
 */
export const notifySuccess = (message) => toast.success(message);

/**
 * Displays an error notification with the provided message or a default message.
 *
 * @param {string} [message="Something went wrong...!"] - The message to display in the error notification. Defaults to "Something went wrong...!" if not provided.
 */
export const notifyDanger = (message) =>
  toast.error(message || "Something went wrong...!");

/**
 * A component that renders the ToastContainer for displaying toast notifications.
 *
 * This component includes the `ToastContainer` which is responsible for rendering
 * toast notifications. It is configured to allow dragging and to close notifications
 * on click.
 *
 * @component
 * @returns {JSX.Element} The JSX code for the ToastContainer component.
 */
export const Notify = () => {
  return (
    <div>
      <ToastContainer draggable closeOnClick />
    </div>
  );
};
