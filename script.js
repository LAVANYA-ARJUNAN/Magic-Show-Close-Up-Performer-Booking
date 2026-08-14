const performers = [

  {
    id: 1,
    name: "Arjun Blaze",
    city: "Chennai",
    type: "Close-up",
    price: 7500,
    rating: 4.9,
    emoji: "🎩",
    bio: "Interactive table magic and mind-blowing card tricks."
  },

  {
    id: 2,
    name: "Maya Mystique",
    city: "Bengaluru",
    type: "Mentalism",
    price: 12000,
    rating: 4.8,
    emoji: "🔮",
    bio: "Elegant mentalism experiences for premium events."
  },

  {
    id: 3,
    name: "Rohan Illusion",
    city: "Mumbai",
    type: "Stage",
    price: 25000,
    rating: 4.9,
    emoji: "✨",
    bio: "High-energy stage illusions for large audiences."
  },

  {
    id: 4,
    name: "Vikram Wonder",
    city: "Delhi",
    type: "Illusion",
    price: 18000,
    rating: 4.7,
    emoji: "🪄",
    bio: "Family-friendly illusion and comedy magic shows."
  },

  {
    id: 5,
    name: "Nila Cards",
    city: "Hyderabad",
    type: "Close-up",
    price: 6500,
    rating: 4.8,
    emoji: "🃏",
    bio: "Perfect close-up entertainment for intimate gatherings."
  },

  {
    id: 6,
    name: "Sam Magic",
    city: "Kochi",
    type: "Stage",
    price: 14000,
    rating: 4.6,
    emoji: "🎭",
    bio: "Fun stage magic with audience participation."
  }

];


/* THEME */

const themeBtn =
  document.getElementById("themeBtn");

if (themeBtn) {

  themeBtn.addEventListener(
    "click",
    () => {

      document.documentElement.classList.toggle(
        "dark"
      );

      const isDark =
        document.documentElement.classList.contains(
          "dark"
        );

      themeBtn.textContent =
        isDark ? "☀️" : "🌙";

    }
  );

}


/* RTL / LTR */

const dirBtn =
  document.getElementById("dirBtn");

if (dirBtn) {

  dirBtn.addEventListener(
    "click",
    () => {

      const isRTL =
        document.documentElement.dir !== "rtl";

      document.documentElement.dir =
        isRTL ? "rtl" : "ltr";

      dirBtn.textContent =
        isRTL ? "LTR" : "RTL";

    }
  );

}


/* MOBILE MENU */

const menuBtn =
  document.getElementById("menuBtn");

const mobileMenu =
  document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

  menuBtn.addEventListener(
    "click",
    () => {

      mobileMenu.classList.toggle(
        "hidden"
      );

    }
  );

}


/* PERFORMER PAGE */

const performerGrid =
  document.getElementById("performerGrid");

if (performerGrid) {

  const cityFilter =
    document.getElementById("cityFilter");

  const typeFilter =
    document.getElementById("typeFilter");

  const priceFilter =
    document.getElementById("priceFilter");

  const search =
    document.getElementById("search");

  const noResults =
    document.getElementById("noResults");

  const resetFilters =
    document.getElementById("resetFilters");


  /* CITY OPTIONS */

  const cities = [
    ...new Set(
      performers.map(
        performer => performer.city
      )
    )
  ];


  cities.sort();


  cities.forEach(
    city => {

      cityFilter.innerHTML += `
        <option value="${city}">
          ${city}
        </option>
      `;

    }
  );


  /* DISPLAY */

  function displayPerformers() {

    const searchValue =
      search.value
        .toLowerCase()
        .trim();

    const city =
      cityFilter.value;

    const type =
      typeFilter.value;

    const maxPrice =
      Number(priceFilter.value);


    const filtered =
      performers.filter(
        performer => {

          const matchesSearch =
            !searchValue ||
            `
              ${performer.name}
              ${performer.city}
              ${performer.type}
            `
              .toLowerCase()
              .includes(searchValue);


          const matchesCity =
            !city ||
            performer.city === city;


          const matchesType =
            !type ||
            performer.type === type;


          const matchesPrice =
            !maxPrice ||
            performer.price <= maxPrice;


          return (
            matchesSearch &&
            matchesCity &&
            matchesType &&
            matchesPrice
          );

        }
      );


    performerGrid.innerHTML = "";


    filtered.forEach(
      performer => {

        performerGrid.innerHTML += `

          <article class="performer-card">

            <div class="avatar">
              ${performer.emoji}
            </div>

            <div class="performer-body">

              <div class="performer-title">

                <h3>
                  ${performer.name}
                </h3>

                <span>
                  ⭐ ${performer.rating}
                </span>

              </div>

              <p class="performer-info">
                ${performer.city}
                ·
                ${performer.type}
              </p>

              <span class="pill">
                ${performer.type}
              </span>

              <p class="performer-bio">
                ${performer.bio}
              </p>

              <div class="performer-bottom">

                <strong>
                  From ₹${performer.price.toLocaleString("en-IN")}
                </strong>

                <a
                  href="booking.html?performer=${performer.id}"
                  class="book-link"
                >
                  Book →
                </a>

              </div>

            </div>

          </article>

        `;

      }
    );


    noResults.classList.toggle(
      "hidden",
      filtered.length !== 0
    );

  }


  /* EVENTS */

  search.addEventListener(
    "input",
    displayPerformers
  );

  cityFilter.addEventListener(
    "change",
    displayPerformers
  );

  typeFilter.addEventListener(
    "change",
    displayPerformers
  );

  priceFilter.addEventListener(
    "change",
    displayPerformers
  );


  resetFilters.addEventListener(
    "click",
    () => {

      search.value = "";

      cityFilter.value = "";

      typeFilter.value = "";

      priceFilter.value = "";

      displayPerformers();

    }
  );


  displayPerformers();

}


/* BOOKING PAGE */

const bookingForm =
  document.getElementById("bookingForm");


if (bookingForm) {

  const performerSelect =
    document.getElementById(
      "performerSelect"
    );


  /* PERFORMER OPTIONS */

  performers.forEach(
    performer => {

      performerSelect.innerHTML += `

        <option value="${performer.id}">
          ${performer.name} - ${performer.city}
        </option>

      `;

    }
  );


  /* URL PERFORMER */

  const params =
    new URLSearchParams(
      window.location.search
    );


  const performerId =
    params.get("performer");


  if (performerId) {

    performerSelect.value =
      performerId;

  }


  /* URL PACKAGE */

  const packageName =
    params.get("package");

  const packageSelect =
    document.getElementById(
      "packageSelect"
    );


  if (packageName && packageSelect) {

    packageSelect.value =
      packageName;

  }


  /* DATE */

  const dateInput =
    document.getElementById("date");


  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  dateInput.min = today;


  /* FORM VALIDATION */

  bookingForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const fields = [

        [
          "name",
          "Please enter your name."
        ],

        [
          "email",
          "Please enter a valid email."
        ],

        [
          "phone",
          "Please enter your phone number."
        ],

        [
          "bookingCity",
          "Please enter your city."
        ],

        [
          "date",
          "Please select event date."
        ],

        [
          "time",
          "Please select event time."
        ]

      ];


      let valid = true;


      document
        .querySelectorAll(".error")
        .forEach(
          error => {

            error.textContent = "";

          }
        );


      fields.forEach(
        ([id, message]) => {

          const field =
            document.getElementById(id);

          const error =
            field
              .parentElement
              .querySelector(".error");


          if (
            !field.value.trim()
          ) {

            error.textContent =
              message;

            valid = false;

          }


          if (
            id === "email" &&
            field.value &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
              .test(field.value)
          ) {

            error.textContent =
              message;

            valid = false;

          }

        }
      );


      if (
        dateInput.value &&
        dateInput.value < today
      ) {

        dateInput
          .parentElement
          .querySelector(".error")
          .textContent =
          "Please select a future date.";

        valid = false;

      }


      const messageBox =
        document.getElementById(
          "formMessage"
        );


      if (valid) {

        messageBox.className =
          "form-message";

        messageBox.textContent =
          "🎉 Booking request received! We will contact you shortly.";

        bookingForm.reset();

        dateInput.min = today;

      } else {

        messageBox.className =
          "form-message hidden";

      }

    }
  );

}