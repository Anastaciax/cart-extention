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
const TRIGGER_PRODUCT_VARIANT_ID = 'gid://shopify/ProductVariant/40810851532866';

/**
*/
const PAYMENT_METHOD_TO_HIDE = 'Afterpay';

/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {
  const isTriggerProductInCart = input.cart.lines.some(line => 
    line.merchandise.__typename === 'ProductVariant' &&
    line.merchandise.id === TRIGGER_PRODUCT_VARIANT_ID
  );

  if (isTriggerProductInCart) {
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
