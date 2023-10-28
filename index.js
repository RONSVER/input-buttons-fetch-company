let input = document.querySelector("input");
let button = document.querySelector("button");
let p = document.createElement("p");
let body = document.body;
let div = document.createElement("div");
let pName = document.createElement("p");
let pInfo = document.createElement("p");
let pBs = document.createElement("p");

body.append(p);

async function sendFetch() {
  let response = await fetch(
    `https://jsonplaceholder.typicode.com/users?company.name=${encodeURIComponent(
      input.value
    )}`
  );

  if (!response.ok) {
    throw new Error("network not a ok");
  }

  let data = response.json();
  return data;
}

button.addEventListener("click", async () => {
  if (!input.value) {
    div.innerHTML = "";
    p.innerHTML = "write text";
  } else {
    try {
      let response = await sendFetch();
      if (response.length > 0) {
        let company = response[0].company;

        pName.innerHTML = `Name: ${company.name}`;
        pInfo.innerHTML = `Info: ${company.catchPhrase}`;
        pBs.innerHTML = `Bs: ${company.bs}`;

        div.append(pName, pInfo, pBs);
        body.append(div);
      }
    } catch (Error) {
      p.innerHTML = `inalization error: ${Error}`;
    }
  }
});
