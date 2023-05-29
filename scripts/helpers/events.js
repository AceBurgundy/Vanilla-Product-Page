export default class Event {
    static click(elementId, callback) {
      const element = document.querySelector(elementId);
      element.addEventListener("click", callback);
    }
}
