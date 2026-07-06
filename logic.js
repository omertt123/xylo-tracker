/* ===============================
   SAVE CLIENT (SAVE PAGE)
================================ */

function saveClient() {
  const cid = document.getElementById("cid").value.trim();
  const account = document.getElementById("account").value;
  const deposit = parseFloat(document.getElementById("deposit").value);
  const lots = parseFloat(document.getElementById("lots").value || 0);

  if (!cid || !account || !deposit) {
    alert("Please fill all required fields");
    return;
  }

  const clientData = {
    cid: cid,
    account: account,
    deposit: deposit,
    lots: lots,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("xylo_" + cid, JSON.stringify(clientData));
  alert("Client saved successfully");
}

/* ===============================
   LOAD CLIENT (CLIENT PAGE)
================================ */

function loadClient() {
  const cid = document.getElementById("cid").value.trim();

  if (!cid) {
    document.getElementById("result").innerHTML = "❌ Please enter CID";
    return;
  }

  const data = localStorage.getItem("xylo_" + cid);

  if (!data) {
    document.getElementById("result").innerHTML = "❌ Client not found";
    return;
  }

  const c = JSON.parse(data);
  const target = getTarget(c.account, c.deposit);

  if (!target) {
    document.getElementById("result").innerHTML = "❌ No target found for this deposit";
    return;
  }

  document.getElementById("result").innerHTML = `
    <h3>Client ID: ${c.cid}</h3>
    <p><b>Account Type:</b> ${c.account}</p>
    <p><b>Deposit:</b> $${c.deposit}</p>
    <p><b>Lots Completed:</b> ${c.lots}</p>
    <hr>
    <p><b>Target Amount:</b> $${target.target}</p>
    <p><b>Lots Required:</b> ${target.lots}</p>
    <p><b>Reward:</b> ${target.reward}</p>
  `;
}

/* ===============================
   TARGET LOGIC
================================ */

function getTarget(acc, dep) {

  /* STANDARD ACCOUNT */
  if (acc === "STANDARD") {
    if (dep >= 20000) return { target: 20000, lots: 50, reward: "$1200" };
    if (dep >= 15000) return { target: 15000, lots: 40, reward: "$1000" };
    if (dep >= 10000) return { target: 10000, lots: 25, reward: "$700" };
    if (dep >= 5000)  return { target: 5000,  lots: 15, reward: "$300" };
    if (dep >= 2000)  return { target: 2000,  lots: 5,  reward: "$100" };
  }

  /* RAW ACCOUNT */
  if (acc === "RAW") {
    if (dep >= 1750) return { target: 1750, lots: 300, reward: "$18 / Lot" };
    if (dep >= 1000) return { target: 1000, lots: 200, reward: "$18 / Lot" };
    if (dep >= 500)  return { target: 500,  lots: 100, reward: "$18 / Lot" };
  }

  return null;
}

/* ===============================
   DELETE CLIENT (OPTIONAL)
================================ */

function deleteClient() {
  const cid = document.getElementById("cid").value.trim();

  if (!cid) {
    alert("Enter CID first");
    return;
  }

  localStorage.removeItem("xylo_" + cid);
  document.getElementById("result").innerHTML = "🗑 Client deleted";
}
