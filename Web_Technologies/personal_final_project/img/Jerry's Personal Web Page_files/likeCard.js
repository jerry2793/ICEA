const likeBtns = document.querySelectorAll("#achievementsLikeBtn");
// const totalLikeOutput = document.getElementById();

let totalLikes = 0;

likeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.innerText === "Like") {
      btn.innerText = "Unlike";
    } else {
      btn.innerText = "Like";
    }
  });
});
