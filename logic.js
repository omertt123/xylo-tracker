/* ==============================
   XYLO TRADE – CLIENT TRACKER
   ============================== */

/* ---------- SAVE CLIENT (ADMIN) ---------- */
function saveClient() {
  const cid = document.getElementById("cid").value.trim();
  const acc = document.getElementById("acc").value;
  const dep = Number(document.getElementById("dep").value);
  const lots = Number(document.getElementById("lots").value);

  if (!cid || !dep || !lots) {
    alert("Please fill all fields");
    return;
  }

  const target = getTarget(acc, dep);

  const clientData = {
    cid: cid,
    account: acc,
    deposit: dep,
    lots: lots,
    target: target
  };

  localStorage.setItem("xylo_" + cid, JSON.stringify(clientData));
  alert("Client saved successfully ✅");
}

/* ---------- LOAD CLIENT (CLIENT PAGE) ---------- */
function loadClient() {
  const cid = document.getElementById("cid").value.trim();
  const data = localStorage.getItem("xylo_" + cid);

  if (!data) {
    document.getElementById("result").innerHTML =
      "❌ Client not found";
    return;
  }

  const c = JSON.parse(data);

  let html = `
    <h3>Account Type: ${c.account}</h3>
    <p><b>Deposit:</b> $${c.deposit}</p>
    <p><b>Lots Completed:</b> ${c.lots}</p>
  `;

  if (c.target) {
    html += `
      <hr>
      <p><b>Target Amount:</b> $${c.target.target}</p>
      <p><b>Required Lots:</b> ${c.target.lots}</p>
      <p><b>Reward:</b> ${c.target.reward}</p>
    `;
  } else {
    html += `<p>No target achieved yet</p>`;
  }

  html += `<br><button onclick="deleteClient('${cid}')">❌ Delete Client</button>`;

  document.getElementById("result").innerHTML = html;
}

/* ---------- DELETE CLIENT ---------- */
function deleteClient(cid) {
  localStorage.removeItem("xylo_" + cid);
  document.getElementById("result").innerHTML =
    "Client deleted ✅";
}

/* ---------- TARGET LOGIC ---------- */
function getTarget(acc, dep) {

  /* STANDARD ACCOUNT */
  if (acc === "STANDARD") {
    if (dep >= 20000) return { target: 20000, lots: 50, reward: "$1200 + $400 (Approval)" };
    if (dep >= 15000) return { target: 15000, lots: 40, reward: "$1000 + $300 (Approval)" };
    if (dep >= 10000) return { target: 10000, lots: 25, reward: "$700 + $150 (Approval)" };
    if (dep >= 5000)  return { target: 5000,  lots: 15, reward: "$300 + $100 (Approval)" };
    if (dep >= 2000)  return { target: 2000,  lots: 5,  reward: "$100 + $50 (Approval)" };
  }

  /* RAW ACCOUNT */
  if (acc === "RAW") {
    if (dep >= 1750) return { target: 1750, lots: 300, reward: "$18 per lot" };
    if (dep >= 1000) return { target: 1000, lots: 200, reward: "$18 per lot" };
    if (dep >= 500)  return { target: 500,  lots: 100, reward: "$18 per lot" };
  }

  return null;
}
