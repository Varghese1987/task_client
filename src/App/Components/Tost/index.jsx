import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export const Tost = (message, category) => {
  if (category === 1) toast.success(message);
  else if (category === 2) toast.warning(message);
  else if (category === 3) toast.error(message);
};
