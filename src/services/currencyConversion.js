export const getConversionrates = (api_key, baseCurrency) => {
  return fetch(
    `https://v6.exchangerate-api.com/v6/${api_key}/latest/${baseCurrency}`
  ).then((res) => res.json());
};
