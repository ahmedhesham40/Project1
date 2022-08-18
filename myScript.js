let tabs = document.querySelectorAll(".tabs li");
let tabsArray = Array.from(tabs);
let divs = document.querySelectorAll(".content > div");
let divsArray = document.querySelectorAll(".content > div");
let currentTab = "tab1";
let i = 0;

function toggleActive() {
  tabsArray.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      tabsArray.forEach((ele) => {
        ele.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      currentTab = ele.dataset.cont;
      loadData(currentTab);
      divsArray.forEach((div) => {
        div.classList.remove("tabs-active");
        div.classList.add("tabs-hidden");
      });
      document
        .querySelector(`.${e.currentTarget.dataset.cont}`)
        .classList.add("tabs-active");
      document
        .querySelector(`.${e.currentTarget.dataset.cont}`)
        .classList.remove("tabs-hidden");
    });
  });
}

toggleActive();

function stars(rating) {
  let ret = [];
  for (let i = 1; i <= 5; ++i) {
    if (rating >= i) ret.push('<i class="fa-solid fa-star"></i>');
    else if (rating + 0.9 >= i)
      ret.push('<i class="fa-solid fa-star-half-stroke"></i>');
    else ret.push('<i class="fa-regular fa-star"></i>');
  }
  return ret.join("\n");
}

const searchInput = document.querySelector("#search-input");
const searchSubmit = document.querySelector("#search-submit");

function loadData(currentTab) {
  i = 0;
  fetch("db.json")
    .then((response) => response.json())
    .then((json) => {
      let groupIndex = 0;
      json.forEach((e, i) => {
        if (e.tag === currentTab) {
          groupIndex = i;
        }
      });
      let ele = json[groupIndex];
      let div = "";
      div = `
      <h2>${ele.header}</h2>
      <br>
      <p style="font-size: 15px;">${ele.description}</p> 
      <br>`;

      document.querySelector(`.${ele.tag}header`).innerHTML = div;

      let filterStr = "";
      document.querySelector("#form").onsubmit = (e) => {
        e.preventDefault();
      };

      searchSubmit.addEventListener("click", () => {
        filterStr = searchInput.value;
        filterResults(currentTab, filterStr);
      });

      function filterResults(currentTab, filterStr = "") {
        groupIndex = 0;
        json.forEach((e, i) => {
          if (e.tag === currentTab) {
            groupIndex = i;
          }
        });

        let div = "";

        json[groupIndex].courses
          .filter((result) =>
            result.title
              .toLowerCase()
              .split(" ")
              .join()
              .includes(filterStr.toLowerCase().split(" ").join())
          )
          .map((c) => {
            div += `
                <div style="height: fit-content; width: 250px">
                  <img
                    src="${c.image}"
                    height="130px"
                  />
                  <p style="font-size: 15px; font-weight: bold">
                    ${c.title}
                  </p>
        
                  <p style="font-size: 12px; color: rgb(111, 110, 110)">${
                    c.instructors[0].name
                  }</p>
                  <div>
                 ${c.rating}
                   ${stars(c.rating)}
                   </div>
                   <br>
                  <p style="font-size: 15px; font-weight: bold">E$${c.price}</p>
                </div>`;
          });
        document.querySelector(`.${json[groupIndex].tag}content`).innerHTML =
          div;

        document
          .querySelector(`.${json[groupIndex].tag}content`)
          .classList.add("tabs-content-active");
        document
          .querySelector(`.${json[groupIndex].tag}content`)
          .classList.remove("tabs-content-hidden");
      }

      filterResults(currentTab);
    });
}
let carousel1 = document.querySelector(".act2");
let carousel2 = document.querySelector(".act1");
let con = document.querySelector(".content");
let maxWidth = 12 * 150;
if (window.innerWidth <= screen.width) {
  maxWidth = screen.width - window.innerWidth + 12 * 150;
}

window.onresize = () => {
  if (window.innerWidth <= screen.width) {
    maxWidth = screen.width - window.innerWidth + 12 * 150;
  }
};

carousel1.addEventListener("click", () => {
  let contentDivs = document.querySelectorAll(".tabs-content-active > div");

  if (i < maxWidth) {
    i += 150;
    console.log(i);
    contentDivs.forEach((div) => {
      div.style.transform = `translateX(${-i}px)`;
    });
  }
});
carousel2.addEventListener("click", () => {
  let contentDivs = document.querySelectorAll(".tabs-content-active > div");

  if (i > 0) {
    i -= 150;
    contentDivs.forEach((div) => {
      div.style.transform = `translateX(${-i}px)`;
    });
  }
});
loadData();
