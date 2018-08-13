export const showSnackBar = element => {
  element.classList.add("show");

  setTimeout(() => {
    element.classList.remove("show");
  }, 3000);
}