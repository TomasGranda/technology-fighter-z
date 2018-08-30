export const showSome = (element, className, timeout) => {
  element.classList.add(className);

  setTimeout(() => {
    element.classList.remove(className);
  }, timeout);
};