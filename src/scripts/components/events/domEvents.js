import showOrders from '../orders';
import {
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder,
  getSingleOrder,
  editOrder,
} from '../../helpers/data/ordersData';
import { viewOrderTotal, viewOrderItems } from '../../helpers/data/mergedData';
import {
  createOrderitem,
  updateMenuItem,
  deleteOrderMenuItem
} from '../../helpers/data/orderItemsData';
import paymentForm from '../forms/paymentForm';
import addOrderForm from '../forms/orderForm';
import viewRevenuePage from '../revenue';
import showOrderItems from '../showOrderItems';
import addUpdateForm from '../forms/updateForm';
import { getSingleMenuItem } from '../../helpers/data/menuItems';
import addUpdateMenuItemForm from '../forms/updateMenuItemForm';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('viewOrders')) {
      getOrders().then((orderCards) => showOrders(orderCards));
    }
    if (e.target.id.includes('createOrder')) {
      addOrderForm();
    }
    if (e.target.id.includes('revenue')) {
      viewRevenuePage();
    }
    if (e.target.id.includes('submit-order')) {
      e.preventDefault();
      const orderObject = {
        customerEmail: document.querySelector('#custemail').value,
        customerName: document.querySelector('#orderName').value,
        customerPhoneNumber: document.querySelector('#phone').value,
        orderStatus: true,
        orderTotal: 0,
        orderType: document.querySelector('#orderType').value,
        paymentMethod: '',
        timeStamp: new Date(),
        tipTotal: 0
      };
      createOrder(orderObject);
    }

    if (e.target.id.includes('update-menuItem')) {
      e.preventDefault();
      const [order, menuItem] = document.querySelector('#OrderItem_id').value.split('--');

      const orderObject = {
        orderID: order,
        menuItemID: menuItem
      };
      createOrderitem(orderObject);
    }

    if (e.target.id.includes('payment')) {
      e.preventDefault();
      const ordernum = document.querySelector('#payment').value;
      paymentForm(ordernum);
    }

    if (e.target.id.includes('finish')) {
      e.preventDefault();
      const [ordernumber, paymentMethod] = document.querySelector('#transmethod').value.split('--');
      console.warn('finish', ordernumber, paymentMethod);
      viewOrderTotal(ordernumber).then((orderTotal) => {
        const orderObject = {
          ordernumber,
          tipTotal: document.querySelector('#tipvalue').value,
          paymentMethod,
          orderTotal
        };
        updateOrder(orderObject).then(() => getOrders().then((orderCards) => showOrders(orderCards)));
      });
    }

    // Delete Orders
    if (e.target.id.includes('delete-order')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, id] = e.target.id.split('--');
        console.warn(id);
        deleteOrder(id).then(showOrders);
      }
    }
    // VIEW ORDERS
    if (e.target.id.includes('details-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      viewOrderItems(firebaseKey).then(showOrderItems);
    }
    // DELETE MENU ITEMS
    if (e.target.id.includes('delete-menuItem')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete this item?')) {
        const [, firebaseKey] = e.target.id.split('--');
        const [, orderId] = e.target.id.split('---');
        console.warn(orderId);
        deleteOrderMenuItem(firebaseKey, orderId).then(showOrderItems);
        // deleteMenuItem(firebaseKey);
      }
    }
    // EDIT ORDER
    if (e.target.id.includes('edit-btn')) {
      const [, id] = e.target.id.split('--');
      getSingleOrder(id).then((orderObj) => addUpdateForm(orderObj));
    }
    // SUBMIT EDIT ORDER
    if (e.target.id.includes('submitEdit-order')) {
      e.preventDefault();
      const [, firebaseKey] = e.target.id.split('--');
      const orderObject = {
        customerEmail: document.querySelector('#custemail').value,
        customerName: document.querySelector('#orderName').value,
        customerPhoneNumber: document.querySelector('#phone').value,
        orderType: document.querySelector('#orderType').value,
        firebaseKey
      };
      editOrder(orderObject).then(showOrders);
    }
    // EVENT FOR EDIT MENU ITEM
    if (e.target.id.includes('edit-MenuItem')) {
      e.preventDefault();
      const [, firebasekey] = e.target.id.split('--');
      getSingleMenuItem(firebasekey).then((itemObject) => addUpdateMenuItemForm(itemObject));
    }
    // SUBMIT EDIT MENU ITEM
    if (e.target.id.includes('update-MenuItemSubmit')) {
      e.preventDefault();
      const [, firebaseKey] = e.target.id.split('--');
      const menuItemObject = {
        menuItem: document.querySelector('#itemName').value,
        itemPrice: document.querySelector('#itemPrice').value,
        firebaseKey,
      };
      updateMenuItem(menuItemObject).then(showOrders);
    }
    // CLOSE ORDER
    if (e.target.id.includes('close-order')) {
      e.preventDefault();
      const [, firebaseKey] = e.target.id.split('--');
      const orderObject = {
        firebaseKey,
        orderStatus: false,
      };
      editOrder(orderObject).then(showOrders);
    }
  });
};

export default domEvents;
