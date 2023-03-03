/**
 * COMMENT FOR ASSIGNMENT REQUIREMENTS:
 *
 * ------ PERSONAL ------
 * ** Jesse Putnam
 * ** jessejputnam@gmail.com
 *
 * ** I testify that the work done on this take-home
 * ** assignment is my own.
 *
 * ----- TIME SPENT -----
 * ** I believe I ended up spending about 8-10 hours
 * ** on this. I had never used MaterialUI nor D3 before,
 * ** and decided this was as good a time and reason as any
 * ** to learn them. So, there was a good portion of time also
 * ** spent reading the Material and (especially) the D3 docs as
 * ** I was learning them.
 *
 * -- INTERACTIVITY NOTE --
 * Make sure to click on the bar graph for more information on win factors!
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
console.log("nope");

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
