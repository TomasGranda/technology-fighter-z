export const calculateDamage = (damage, defense) => {
  let realDamage = damage - (damage * (defense / 100));

  if (realDamage === 0) {
    realDamage = 1;
  }
  
  return realDamage;
};