export function getMonthlyTuitionByLevel(level) {
    if (level === "Level 1") return 175;
    if (level === "Level 2" || level === "Level 3") return 225;
    if (level === "Level 4" || level === "Level 5") return 275;
    return 0;
  }
  