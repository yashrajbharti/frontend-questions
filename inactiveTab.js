document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("🔕 Tab is inactive — pausing work");
    pauseWork();
  } else {
    console.log("🔔 Tab is active — resuming work");
    resumeWork();
  }
});
