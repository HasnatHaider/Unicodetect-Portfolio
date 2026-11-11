import { createContactHandler } from "../server/contact-handler.js";
const handle = createContactHandler();
export const GET = handle;
export const POST = handle;
