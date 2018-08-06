export const calculateDamage = (damage, defense) => {
  let realDamage = damage - defense;

  return realDamage;
};