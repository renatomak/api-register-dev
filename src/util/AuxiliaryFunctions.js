export const initTotalPrice = () => {
  const getItem = localStorage.getItem('totalPriceSales');
  console.log(getItem);
  if (getItem) return JSON.parse(getItem);
  return 0;
};

export const exp = '';
