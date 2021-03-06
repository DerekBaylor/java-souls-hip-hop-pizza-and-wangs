import { getSingleOrdeMenuItems } from './orderItemsData';
import { getMenuItemsArray, getSingleMenuItem } from './menuItems';

const viewOrderMenuItems = (orderFirebaseKey) => new Promise(() => {
  getSingleOrdeMenuItems(orderFirebaseKey)
    .then((menuitemarray) => {
      getMenuItemsArray(menuitemarray);
    });
});

const viewOrderTotal = (orderFirebaseKey) => new Promise((resolve, reject) => {
  getSingleOrdeMenuItems(orderFirebaseKey).then((mitems) => {
    const menuItemArray = mitems.map((menuItem) => getSingleMenuItem(menuItem.menuItemID));
    console.warn(menuItemArray);
    Promise.all([...menuItemArray]).then((orderArray) => {
      resolve(orderArray.reduce((a, b) => (a + b.itemPrice), 0));
    });
  }).catch(reject);
});

const viewOrderItems = (orderFirebaseKey) => new Promise((resolve, reject) => {
  getSingleOrdeMenuItems(orderFirebaseKey).then((mitems) => {
    const menuItemArray = mitems.map((menuItem) => getSingleMenuItem(menuItem.menuItemID));
    const orderMenuItemArray = mitems.map((omitems) => omitems);
    Promise.all([...menuItemArray]).then((orderArray) => {
      resolve({ orderArray, orderMenuItemArray });
    });
  }).catch(reject);
});

export { viewOrderMenuItems, viewOrderTotal, viewOrderItems };
