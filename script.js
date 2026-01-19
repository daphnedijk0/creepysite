const postsKey = "creepy_posts";

// INIT
if (!localStorage.getItem(postsKey)) {
  localStorage.setItem(postsKey, JSON.stringify([]));
}

// HOME
if (document.getElementById("posts")) {
  const posts = JSON.parse(localStorage.getItem(postsKey));
  const container = document.getElementById("posts");

  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.textContent = "▸ " + post.title;
    div.onclick = () => {
      localStorage.setItem("current_post", index);
      window.location.href = "read.html";
    };
    container.appendChild(div);
  });
}

// SUBMIT
const form = document.getElementById("submitForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const posts = JSON.parse(localStorage.getItem(postsKey));
    posts.unshift({ title, content, date: new Date().toISOString() });
    localStorage.setItem(postsKey, JSON.stringify(posts));

    window.location.href = "index.html";
  });
}

// READ
if (document.getElementById("story")) {
  const index = localStorage.getItem("current_post");
  const posts = JSON.parse(localStorage.getItem(postsKey));
  const post = posts[index];

  const div = document.getElementById("story");
  div.innerHTML = `
    <h1>${post.title}</h1>
    <p>${post.content.replace(/\n/g, "<br>")}</p>
    <p class="warning">Gearchiveerd: ${post.date}</p>
  `;

  // subtiele text glitch
  setTimeout(() => {
    if (Math.random() < 0.3) {
      div.innerHTML += "<p class='warning'>[BESTAND BESCHADIGD]</p>";
    }
  }, 4000);
}
