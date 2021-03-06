import clearDom from '../../helpers/data/auth/clearDom';

const addUpdateMenuItemForm = (obj = {}) => {
  clearDom();
  document.querySelector('#form-container').innerHTML = `
  <div class="card outside-card">
    <div class="card middle-card">
      <div class="card order-card">
        <form id="submit-author-form" class="mb-4">
          <div class="form-group">
            <label for="itemName">Item Name</label>
            <input type="text" class="form-control" id="itemName" placeholder="${obj.menuItem}" value= "${obj.menuItem || ''}"required>
          </div>
          <div class="form-group">
            <label for="itemPrice">Item Price</label>
            <input type="number" class="form-control" id="itemPrice" aria-describedby="itemPrice" placeholder="${obj.itemPrice}" value="${obj.itemPrice || ''}" required>
          </div>
          <button type="submit" 
          id="update-MenuItemSubmit--${obj.firebaseKey}" class="btn btn-outline-success">Update Item</button>
        </form>
      </div>
    </div>
  </div>
    `;
};
export default addUpdateMenuItemForm;
