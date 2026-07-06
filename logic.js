/************************************
 XYLO TRADE – TARGET TRACKER
 Admin + Client Logic (localStorage)
************************************/

/* ================================
   ACCOUNT TARGET CONFIG
================================ */
const ACCOUNT_TARGETS = {
  raw_office_500: {
    title: "Office Expense Target ($500)",
    targetAmount: 500,
    rebate: 18,
    lotsRequired: 100
  },
  raw_office_1750: {
    title: "Office Setup Target ($1750)",
    targetAmount: 1750,
    rebate: 18,
    lotsRequired: 300
  },
  raw_marketing_1000: {
    title: "Marketing Expense Target ($1000)",
    targetAmount: 1000,
    rebate: 18,
    lotsRequired: 200
  }
};

/* ================================
   SAVE CLIENT (ADMIN)
================================ */
function saveClient() {
  const cid = document.getElementById("cid")?.value.trim();
  const account = document.getElementById("account")?.value;
  const deposit = document.getElementById("deposit")?.value;
  const lots = document.getElementById("lots")?.value;

  if (!cid || !account || !deposit || !lots) {
    alert("❌ Please fill all fields");
    return;
  }

  const clientData = {
    account: account,
    deposit: Number(deposit),
    lots: Number(lots)
  };

  localStorage.setItem("xylo_" + cid, JSON.stringify(clientData));
  alert("✅ Client saved successfully");
}

/* ================================
   LOAD CLIENT (CLIENT PAGE)
================================ */
function loadClient() {
  const cid = document.getElementById("cid")?.value.trim();
  const resultBox = document.getElementById("result");

  if (!cid) {
    alert("❌ Enter Client ID");
    return;
  }

  const data = localStorage.getItem("xylo_" + cid);

  if (!data) {
    resultBox.innerHTML = "<p style='color:red;'>❌ Client not found</p>";
    return;
  }

  const client = JSON.parse(data);
  const target = ACCOUNT_TARGETS[client.account];

  if (!target) {
    resultBox.innerHTML = "<p style='color:red;'>❌ Invalid account type</p>";
    return;
  }

  const completedLots = client.lots;
  const remainingLots = Math.max(0, target.lotsRequired - completedLots);
  const reward = Math.min(completedLots, target.lotsRequired) * target.rebate;
  const progress = Math.min(
    (completedLots / target.lotsRequired) * 100,
    100
  ).toFixed(1);

  resultBox.innerHTML = `
    <h3>${target.title}</h3>
    <p><strong>Target Amount:</strong> $${target.targetAmount}</p>
    <p><strong>Lots Required:</strong> ${target.lotsRequired}</p>
    <p><strong>Lots Completed:</strong> ${completedLots}</p>
    <p><strong>Remaining Lots:</strong> ${remainingLots}</p>
    <p><strong>Rebate per Lot:</strong> $${target.rebate}</p>
    <h4>🎁 Reward Earned: $${reward}</h4>
    <div style="background:#ddd;border-radius:20px;overflow:hidden;">
      <div style="width:${progress}%;background:#0f9d58;color:#fff;padding:5px;text-align:center;">
        ${progress}%
      </div>
    </div>
  `;
}

/* ================================
   DELETE CLIENT (ADMIN)
================================ */
function deleteClient() {
  const cid = document.getElementById("cid")?.value.trim();

  if (!cid) {
    alert("❌ Enter Client ID");
    return;
  }

  if (confirm("⚠️ Are you sure you want to delete this client?")) {
    localStorage.removeItem("xylo_" + cid);
    alert("🗑 Client deleted successfully");
  }
}
