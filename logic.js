let db = JSON.parse(localStorage.getItem("xyloDB")) || {};

function saveClient() {
  const id = cid.value;
  db[id] = {
    account: acc.value,
    deposit: +dep.value,
    lots: +lots.value
  };
  localStorage.setItem("xyloDB", JSON.stringify(db));
  alert("Client Updated Successfully");
}

function loadClient() {
  const id = clientId.value;
  const c = db[id];
  if (!c) return result.innerHTML = "❌ Client Not Found";

  let targetLots = 0, reward = "";

  if (c.account === "STANDARD") {
    if (c.deposit >= 20000) targetLots = 50, reward = "$1200 Cash";
    else if (c.deposit >= 15000) targetLots = 40, reward = "$1000 Cash";
    else if (c.deposit >= 10000) targetLots = 25, reward = "$700 Cash";
    else if (c.deposit >= 5000) targetLots = 15, reward = "$300 Cash";
    else targetLots = 5, reward = "$100 Cash";
  }

  if (c.account === "RAW") {
    if (c.lots >= 300) targetLots = 300, reward = "$1750 Office Setup";
    else if (c.lots >= 200) targetLots = 200, reward = "$1000 Marketing";
    else targetLots = 100, reward = "$500 Office Expense";
  }

  let progress = Math.min((c.lots / targetLots) * 100, 100);

  result.innerHTML = `
  <div class="card">
    <h2>${c.account} ACCOUNT</h2>
    <p><b>Deposit:</b> $${c.deposit}</p>
    <p><b>Lots Completed:</b> ${c.lots} / ${targetLots}</p>

    <div class="progress-box">
      <div class="progress">
        <div class="progress-bar" style="width:${progress}%"></div>
      </div>
    </div>

    <p><b>Reward:</b> ${reward}</p>
    <span class="badge">${progress >= 100 ? "REWARD UNLOCKED" : "IN PROGRESS"}</span>
  </div>
  `;
}