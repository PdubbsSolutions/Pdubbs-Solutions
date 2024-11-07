function goToPage(page) {
   window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function () {
   const icons = document.querySelectorAll("icon, .small-icon");
   icons.forEach((icon) => {
       icon.addEventListener("click", function () {
           const targetPage = this.querySelector("a") ? this.querySelector("a").href : this.id + ".html";
           goToPage(targetPage);
       });
   });
});
