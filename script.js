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


const $ = id =>
  document.getElementById(id);


const grid =
  $("performerGrid");

const cityFilter =
  $("cityFilter");

const typeFilter =
  $("typeFilter");

const priceFilter =
  $("priceFilter");

const search =
  $("search");

const performerSelect =
  $("performerSelect");



const cities = [
  ...new Set(
    performers.map(
      performer => performer.city
    )
  )
];


cities.sort();


cities.forEach(city => {

  cityFilter.innerHTML += `
    <option value="${city}">
      ${city}
    </option>
  `;

});



performers.forEach(
  performer => {

    performerSelect.innerHTML += `
      <option value="${performer.id}">
        ${performer.name} -
        ${performer.city}
      </option>
    `;

  }
);



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


  grid.innerHTML = "";


  filtered.forEach(
    performer => {

      grid.innerHTML += `

        <article
          class="performer-card"
        >

          <div class="avatar">
            ${performer.emoji}
          </div>

          <div
            class="performer-body"
          >

            <div
              class="performer-title"
            >

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


            <p
              class="performer-bio"
            >
              ${performer.bio}
            </p>


            <div
              class="performer-bottom"
            >

              <strong>
                From ₹${performer.price.toLocaleString("en-IN")}
              </strong>

              <button
                class="book-link"
                onclick="choosePerformer(${performer.id})"
              >
                Book →
              </button>

            </div>

          </div>

        </article>

      `;

    }
  );


  $("noResults")
    .classList
    .toggle(
      "hidden",
      filtered.length !== 0
    );

}



function choosePerformer(id) {

  performerSelect.value =
    id;


  $("booking")
    .scrollIntoView({
      behavior: "smooth"
    });

}


window.choosePerformer =
  choosePerformer;



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



$("resetFilters")
  .addEventListener(
    "click",
    () => {

      search.value = "";

      cityFilter.value = "";

      typeFilter.value = "";

      priceFilter.value = "";

      displayPerformers();

    }
  );



$("themeBtn")
  .addEventListener(
    "click",
    () => {

      document.documentElement
        .classList
        .toggle("dark");


      if (
        document.documentElement
          .classList
          .contains("dark")
      ) {

        $("themeBtn")
          .textContent = "☀️";

      } else {

        $("themeBtn")
          .textContent = "🌙";

      }

    }
  );



$("dirBtn")
  .addEventListener(
    "click",
    () => {

      const rtl =
        document.documentElement.dir !==
        "rtl";


      document.documentElement.dir =
        rtl
          ? "rtl"
          : "ltr";


      $("dirBtn")
        .textContent =
        rtl
          ? "LTR"
          : "RTL";

    }
  );



$("menuBtn")
  .addEventListener(
    "click",
    () => {

      $("mobileMenu")
        .classList
        .toggle("hidden");

    }
  );


document
  .querySelectorAll(
    "#mobileMenu a"
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        $("mobileMenu")
          .classList
          .add("hidden");

      }
    );

  });



const today =
  new Date()
    .toISOString()
    .split("T")[0];


$("date").min =
  today;



$("bookingForm")
  .addEventListener(
    "submit",
    function (event) {

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
        .forEach(error => {

          error.textContent = "";

        });


      fields.forEach(
        ([id, message]) => {

          const field =
            $(id);


          const error =
            field
              .parentElement
              .querySelector(
                ".error"
              );


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
        $("date").value &&
        $("date").value < today
      ) {

        $("date")
          .parentElement
          .querySelector(
            ".error"
          )
          .textContent =
          "Please select a future date.";

        valid = false;

      }


      const messageBox =
        $("formMessage");


      if (valid) {

        messageBox
          .className =
          "form-message";


        messageBox.textContent =
          "🎉 Booking request received! We will contact you shortly.";


        $("bookingForm")
          .reset();


        $("date").min =
          today;

      } else {

        messageBox
          .className =
          "form-message hidden";

      }

    }
  );



displayPerformers();