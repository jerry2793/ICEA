const likeBtns = document.querySelectorAll("#achievementsLikeBtn");
const totalLikeOutput = document.getElementById("emoji-total");

let totalLikes = 0;

const updateScreen = () => {
  totalLikeOutput.innerHTML = totalLikes;
};

likeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.innerText === "Like") {
      totalLikes++;
      totalLikeOutput.innerHTML = totalLikes;
      btn.innerText = "Unlike";
      btn.style.backgroundColor = "red";
      updateScreen();
    } else {
      totalLikes--;
      totalLikeOutput.innerHTML = totalLikes;
      btn.innerText = "Like";
      btn.style.backgroundColor = "#467fd0";
      updateScreen();
    }
  });
});
