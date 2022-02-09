//dataset??

import { UI } from "./UI.js";

UI.ALWAYS_ON_DISPLAY.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    UI.ALWAYS_ON_DISPLAY.windows.forEach((tabContent) =>
      tabContent.classList.remove("active")
    );
    target.classList.add("active");
  });
});
