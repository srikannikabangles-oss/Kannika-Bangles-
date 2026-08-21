/* =====================================================
   KANNIKA BANGLES — Checkout Page Logic
   Separate checkout form + order summary
   ===================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  await renderCheckout();
  initCheckoutForm();
});

async function renderCheckout() {

  const summaryEl = document.getElementById('checkoutSummary');
  const orderItemsEl = document.getElementById('checkoutOrderItems');
  const emptyEl = document.getElementById('checkoutEmpty');
  const filledEl = document.getElementById('checkoutFilled');



  const cart = await getCart();


  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = 'flex';
    if (filledEl) filledEl.style.display = 'none';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';
  if (filledEl) filledEl.style.display = 'grid';

  let itemsHTML = '';
  let subtotal = 0;
  let totalSavings = 0;

  for (const item of cart) {
    const product = getProductById(item.id);
    if (!product) continue;

    const itemTotal = product.price * item.quantity;
    const itemSavings = (product.originalPrice - product.price) * item.quantity;
    subtotal += itemTotal;
    totalSavings += itemSavings;

    itemsHTML += `
      <div class="checkout-order-item">
        <div class="checkout-order-item__image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="checkout-order-item__info">
          <div class="checkout-order-item__name">${product.name}</div>
          <div class="checkout-order-item__meta">Size: ${item.size} × Qty: ${item.quantity}</div>
        </div>
        <div class="checkout-order-item__price">${formatPrice(itemTotal)}</div>
      </div>
    `;
  }

  if (orderItemsEl) orderItemsEl.innerHTML = itemsHTML;

  const shipping = 49;
  const total = subtotal + shipping;

  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="cart-summary__row">
        <span>Subtotal (${cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      ${totalSavings > 0 ? `
      <div class="cart-summary__row cart-summary__savings">
        <span>You Save</span>
        <span>-${formatPrice(totalSavings)}</span>
      </div>` : ''}
      <div class="cart-summary__row">
        <span>Shipping Fee</span>
        <span>${formatPrice(shipping)}</span>
      </div>
      <p class="cart-summary__note">Standard shipping charge of ₹49</p>
      <div class="cart-summary__divider"></div>
      <div class="cart-summary__row cart-summary__total">
        <span>Total</span>
        <span>${formatPrice(total)}</span>
      </div>
    `;
  }

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function initCheckoutForm() {
  const form = document.getElementById('shippingDetailsForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="loader__ring" style="width: 16px; height: 16px; border-width: 2px; margin: 0; display: inline-block;"></span> Processing Order...`;

    try {
      const shippingDetails = {
        name: document.getElementById('shippingName').value.trim(),
        phone: document.getElementById('shippingPhone').value.trim(),
        address: document.getElementById('shippingAddress').value.trim(),
        city: document.getElementById('shippingCity').value.trim(),
        state: document.getElementById('shippingState').value.trim(),
        pincode: document.getElementById('shippingPin').value.trim()
      };

      const { items, subtotal, savings, shipping, total } = await getCartOrderDetails();
      if (items.length === 0) {
        showToast('Your cart is empty', '✗');
        btn.disabled = false;
        btn.innerHTML = originalText;
        return;
      }

      let orderId = null;

      // 1. Log Order to Database (Admin Panel visibility)
      try {
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: 'guest',
            items: items.map(i => ({
              productId: i.product.id,
              name: i.product.name,
              size: i.cartItem.size,
              quantity: i.cartItem.quantity,
              price: i.product.price
            })),
            subtotal,
            shippingFee: shipping,
            total,
            shippingDetails
          })
        });
        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          orderId = orderData.orderId;
        }
      } catch (dbErr) {
        console.warn('MongoDB order logging error:', dbErr);
      }

      // 2. Also send order copy to FormSubmit email for store records
      try {
        const itemsSummary = items.map(i => `${i.product.name} (Qty: ${i.cartItem.quantity}, Size: ${i.cartItem.size}, Price: Rs. ${i.product.price})`).join(' | ');
        fetch('https://formsubmit.co/ajax/Srikannikabangles@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: shippingDetails.name,
            phone: shippingDetails.phone,
            address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pincode}`,
            order_items: itemsSummary,
            total_amount: `Rs. ${total}`,
            _subject: `New Online Order from ${shippingDetails.name} (Rs. ${total})`,
            _captcha: 'false',
            _template: 'table'
          })
        }).catch(() => {});
      } catch (emailErr) {}

      const orderUrl = await getWhatsAppOrderUrl(shippingDetails, orderId);

      const currentCart = await getCart();
      localStorage.setItem('kannika_cart_backup', JSON.stringify(currentCart));

      await clearCart();

      showToast('Order confirmed! Opening WhatsApp to complete booking...', '🛍️');

      setTimeout(() => {
        window.location.href = orderUrl;
      }, 1000);

    } catch (err) {
      console.error('Checkout error:', err);
      showToast('Checkout failed. Please try again.', '✗');
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  });
}
