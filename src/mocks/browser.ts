import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Setup the MSW worker with all handlers
export const worker = setupWorker(...handlers);
