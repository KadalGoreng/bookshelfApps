document.addEventListener("DOMContentLoaded", function () {
  const sumbitForm = document.getElementById("form");

  sumbitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
  });

  if(isStorageExist()){
    loadDataFromStorage();
}
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
  refreshDataBooks();
});

