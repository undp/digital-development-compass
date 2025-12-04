function getStage(score) {
  return Math.min(Math.floor(score), 4);
}

function roundNumber(num, decimals = 2) {
  if (!num) return null;
  return Math.round(num * 10 ** decimals) / 10 ** decimals;
}

const stageNames = [
  "Basic",
  "Opportunistic",
  "Systematic",
  "Differentiating",
  "Transformational",
];

module.exports = {
  getStage,
  roundNumber,
  stageNames,
};
