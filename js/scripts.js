document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll("h1");
    headers.forEach(header => {
      header.style.opacity = "0";
      header.style.transform = "translateY(20px)";
      setTimeout(() => {
        header.style.transition = "all 0.5s ease-out";
        header.style.opacity = "1";
        header.style.transform = "translateY(0)";
      }, 300);
    });
  });
  