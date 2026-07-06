// ===== XYLO TRADE TRACKER =====

// SAVE DATA (ADMIN)
function saveData() {
  const data = {
    accountType: document.getElementById("accountType").value,
    targetName: document.getElementById("targetName").value,
    targetAmount: document.getElementById("targetAmount").value,
    lotsCompleted: document.getElementById("lotsCompleted").value,
    totalLots: document.getElementById("totalLots").value,
    reward: document.getElementById("reward").value,
    updated: new Date().toLocaleString()
  };

  localStorage.setItem("xyloData", JSON.stringify(data));
  alert("Data Saved Successfully ✅");
}

// LOAD DATA (CLIENT)
function loadData() {
  const data = JSON.parse(localStorage.getItem("xyloData"));
  if (!data) return;

  document.getElementById("c_account").innerText = data.accountType;
  document.getElementById("c_target").innerText = data.targetName + " ($" + data.targetAmount + ")";
  document.getElementById("c_lots").innerText = data.lotsCompleted + " / " + data.totalLots;

  const progress = (data.lotsCompleted / data.totalLots) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressText").innerText = progress.toFixed(1) + "% Completed";

  document.getElementById("c_reward").innerText = "$" + data.reward;
  document.getElementById("c_update").innerText = data.updated;
}

document.addEventListener("DOMContentLoaded", loadData);
