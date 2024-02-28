// @ts-check

/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
*/

/**
* @type {FunctionRunResult}
*/
const NO_CHANGES = {
  operations: [],
};

/**
*/
const PAYMENT_METHOD_TO_HIDE = 'Afterpay';

/**
* Main function to run the operation.
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  const isMetafieldValueOne = input.cart.lines.some(line => {
    if (line.merchandise.__typename === 'ProductVariant') {
      const metafieldValue = line.merchandise.product.metafield?.value;
      return metafieldValue === "1";
    }
    return false; 
  });

  if (isMetafieldValueOne) {
    const paymentMethod = input.paymentMethods.find(method => 
      method.name === PAYMENT_METHOD_TO_HIDE
    );

    if (paymentMethod) {
      return {
        operations: [{
          hide: {
            paymentMethodId: paymentMethod.id
          }
        }]
      };
    }
  }

  return NO_CHANGES;
};
