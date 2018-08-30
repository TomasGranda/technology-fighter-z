export const calculateDamage = (damage, defense) => {
  let defenseCalculated = 0;
  let points = 10;

  for (let i = 0; i < defense; i++) {
    defenseCalculated += points;
    points *= 0.875
  }

  let realDamage = damage - damage * (defenseCalculated / 100);

  if (realDamage < 1 && realDamage !== 0) {
    realDamage = 1;
  } else if (realDamage === 0) {
    realDamage = 1;
  }

  return realDamage;
};