export function hideTooltip(tooltip) {
  tooltip.style.display = "none";
  tooltip.children[0].textContent = "";
  tooltip.children[1].textContent = "";
  tooltip.children[2].textContent = "";
}

export function showTooltip(tooltip, data) {
  tooltip.children[0].textContent = data.name;
  tooltip.children[1].textContent = data.message;
  tooltip.children[2].textContent = data.weight.description;
  tooltip.style.display = "block";
}

export function showHoverTitle(event) {
  const barName = event.target.id;
  const hovertip = event.target.closest(".chart-container").children[2];

  hovertip.textContent = barName;

  hovertip.style.display = "block";
}

export function hideHoverTitle(event) {
  const hovertip = event.target.closest(".chart-container").children[2];
  hovertip.style.display = "none";
  hovertip.textContent = "";
}

export function setChartDimensions() {
  const margin = { top: 10, right: 5, bottom: 20, left: 20 };
  const width = 350 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;

  return { margin, width, height };
}

export function getEntryDate(entry) {
  return new Date(
    Date.now() - entry.daysAgo * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric"
  });
}

export function getFlagColor(num) {
  if (num < 4) return "var(--flag-red)";
  else if (num < 7) return "var(--flag-yellow)";
  else return "var(--flag-green)";
}

// Create our number formatter.
export const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});
