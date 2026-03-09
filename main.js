const navToggle = document.getElementById("nav-toggle");
const mobileNav = document.getElementById("mobile-nav");
const desktopNav = document.getElementById("desktop-nav");
const header = document.querySelector("header");

const btnExpandFaq = document.querySelectorAll(".btn-expand");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const displayRestaurant = document.getElementById("display-restaurant");
const searchResultBox = document.getElementById("search-result-box");

const url = "./DATABASE_RUMAH_MAKAN.json";

function contactFormat(no) {
  return no.split("-").join("").replace("0", "62");
}

function renderCountRestaurant(count) {
  const searchCount = document.createElement("h5");
  searchCount.classList.add("text-center", "h5");
  searchCount.innerText = `Hasil pencarian: ${count}`;
  searchResultBox.appendChild(searchCount);
}

function notFoundDisplay() {
  const container = document.createElement("div");
  container.classList.add(
    "container-fluid",
    "d-flex",
    "flex-column",
    "min-vw-100",
    "justify-content-center",
    "align-items-center",
  );

  const img = document.createElement("img");
  img.setAttribute(
    "src",
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDI0IDI0Ij4KCTxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik0xMi43MTMgMTYuNzEzUTEzIDE2LjQyNSAxMyAxNnQtLjI4OC0uNzEyVDEyIDE1dC0uNzEyLjI4OFQxMSAxNnQuMjg4LjcxM1QxMiAxN3QuNzEzLS4yODhNMTEgMTNoMlY3aC0yem0xIDlxLTIuMDc1IDAtMy45LS43ODh0LTMuMTc1LTIuMTM3VDIuNzg4IDE1LjlUMiAxMnQuNzg4LTMuOXQyLjEzNy0zLjE3NVQ4LjEgMi43ODhUMTIgMnQzLjkuNzg4dDMuMTc1IDIuMTM3VDIxLjIxMyA4LjFUMjIgMTJ0LS43ODggMy45dC0yLjEzNyAzLjE3NXQtMy4xNzUgMi4xMzhUMTIgMjJtMC0ycTMuMzUgMCA1LjY3NS0yLjMyNVQyMCAxMnQtMi4zMjUtNS42NzVUMTIgNFQ2LjMyNSA2LjMyNVQ0IDEydDIuMzI1IDUuNjc1VDEyIDIwbTAtOCIgLz4KPC9zdmc+",
  );

  const message = document.createElement("h3");
  message.classList.add("h5");

  message.innerHTML = "Maaf, lokasi yang anda cari tidak ada";

  container.append(img, message);
  displayRestaurant.appendChild(container);
}

function getAndDisplayRestaurant(file) {
  fetch("./DATABASE_RUMAH_MAKAN.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch");
      }
      return response.json();
    })
    .then((data) =>
      //  console.log(data)
      renderData(data),
    )
    .catch((error) => {
      console.error(`Failed to fetch data: ${error}`);
    });
}

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  mobileNav.classList.toggle("d-none");
  document.body.classList.toggle("active");
});

window.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  if (window.scrollY > 200) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

searchBtn.addEventListener("click", () => {
  if (!searchInput.value) {
    displayRestaurant.innerHTML = "";
    searchResultBox.innerHTML = "";
    notFoundDisplay();
  } else {
    displayRestaurant.innerHTML = "";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const restaurants = data.filter((d) => {
          if (d.Name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            return d;
          } else {
            return null;
          }
        });

        if (restaurants.length == 0) {
          searchResultBox.innerHTML = "";
          renderCountRestaurant(restaurants.length);
          return notFoundDisplay();
        } else {
          searchResultBox.innerHTML = "";
          renderCountRestaurant(restaurants.length);
          return renderData(restaurants);
        }
      });
  }
});

function renderData(data) {
  data.forEach((d) => {
    let col = document.createElement("div");
    let a = document.createElement("a");

    col.classList.add("col");
    a.setAttribute("href", `https://wa.me/${contactFormat(d.Phone).trim()}`);
    a.setAttribute("target", "_blank");

    let card = document.createElement("div");
    let cardBody = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("h6");
    let address = document.createElement("p");

    let ratingInfo = document.createElement("div");

    let star = document.createElement("img");
    let rating = document.createElement("p");

    card.setAttribute("id", d.ID);
    card.classList.add("shadow-sm", "h-100", "card");
    cardBody.classList.add("card-body", "d-flex", "flex-column");
    img.setAttribute("src", d.Featured_image);
    star.setAttribute(
      "src",
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDI0IDI0Ij4KCTxwYXRoIGZpbGw9IiMwMDAiIGQ9Im0xMiAxNy4yNzVsLTQuMTUgMi41cS0uMjc1LjE3NS0uNTc1LjE1dC0uNTI1LS4ydC0uMzUtLjQzN3QtLjA1LS41ODhsMS4xLTQuNzI1TDMuNzc1IDEwLjhxLS4yNS0uMjI1LS4zMTItLjUxM3QuMDM3LS41NjJ0LjMtLjQ1dC41NS0uMjI1bDQuODUtLjQyNWwxLjg3NS00LjQ1cS4xMjUtLjMuMzg4LS40NXQuNTM3LS4xNXQuNTM3LjE1dC4zODguNDVsMS44NzUgNC40NWw0Ljg1LjQyNXEuMzUuMDUuNTUuMjI1dC4zLjQ1dC4wMzguNTYzdC0uMzEzLjUxMmwtMy42NzUgMy4xNzVsMS4xIDQuNzI1cS4wNzUuMzI1LS4wNS41ODh0LS4zNS40Mzd0LS41MjUuMnQtLjU3NS0uMTV6IiAvPgo8L3N2Zz4=",
    );
    star.setAttribute("id", "star");
    img.classList.add("card-img-top");
    name.classList.add("card-title");
    address.classList.add("text-muted", "card-text", "small", "flex-grow-1");
    ratingInfo.classList.add("d-flex", "align-items-baseline", "fw-semibold");
    rating.classList.add("small");

    name.innerHTML = d.Name;
    address.innerHTML = d.Address;
    rating.innerHTML = d.Rating;
    ratingInfo.append(star, rating);

    cardBody.append(name, address, ratingInfo);
    card.append(img, cardBody);
    a.appendChild(card);

    col.appendChild(a);

    displayRestaurant.appendChild(col);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  getAndDisplayRestaurant("./DATABASE_RUMAH_MAKAN.json");
});

btnExpandFaq.forEach((btn) => {
  btn.addEventListener("click", () => {
    let currentBtn = btnExpandFaq[parseInt(event.currentTarget.id)];
    const itemExpand = currentBtn.lastElementChild;
    currentBtn.classList.toggle("active")
    itemExpand.classList.toggle("d-none");
  });
});
