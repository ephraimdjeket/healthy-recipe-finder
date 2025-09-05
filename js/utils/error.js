export function renderError(container, errMessage) {
  container.innerHTML = "";
  const div = document.createElement("div");
  div.className = "error-message";
  div.textContent = errMessage;
  container.appendChild(div);
}