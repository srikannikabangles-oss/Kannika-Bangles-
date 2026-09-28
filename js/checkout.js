/* =====================================================
   KANNIKA BANGLES — Checkout Page Logic
   Streamlined checkout flow with auto-fill & live status
   ===================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  if (typeof fetchLiveProducts === 'function') {
    await fetchLiveProducts().catch(() => {});
  }
  await renderCheckout();
  initCheckoutForm();
});

async function renderCheckout() {
  const summaryEl = document.getElementById('checkoutSummary');
  const orderItemsEl = document.getElementById('checkoutOrderItems');
  const emptyEl = document.getElementById('checkoutEmpty');
  const filledEl = document.getElementById('checkoutFilled');
  const authNoticeEl = document.getElementById('checkoutAuthNotice');

  // 1. Populate Customer Profile if logged in
  const customer = typeof getCurrentCustomer === 'function' ? getCurrentCustomer() : null;
  if (customer) {
    const nameInput = document.getElementById('shippingName');
    const phoneInput = document.getElementById('shippingPhone');
    const addressInput = document.getElementById('shippingAddress');
    const cityInput = document.getElementById('shippingCity');
    const stateInput = document.getElementById('shippingState');
    const pinInput = document.getElementById('shippingPin');

    if (nameInput && !nameInput.value) nameInput.value = customer.name || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = customer.phone || '';
    if (addressInput && !addressInput.value) addressInput.value = customer.address?.street || '';
    if (cityInput && (!cityInput.value || cityInput.value === 'Bengaluru')) cityInput.value = customer.address?.city || 'Bengaluru';
    if (stateInput && (!stateInput.value || stateInput.value === 'Karnataka')) stateInput.value = customer.address?.state || 'Karnataka';
    if (pinInput && !pinInput.value) pinInput.value = customer.address?.pincode || '';

    if (authNoticeEl) {
      authNoticeEl.innerHTML = `
        <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid var(--border-gold); border-radius: var(--radius-sm); padding: 10px 14px; font-size: 0.88rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <span style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="check-circle" style="width: 16px; height: 16px; color: #10B981;"></i>
            <span>Signed in as <strong>${customer.name}</strong>. Delivery address auto-filled.</span>
          </span>
          <a href="/login.html" style="font-size: 0.8rem; color: var(--gold-dark); text-decoration: none; font-weight: 600;">Change Account</a>
        </div>
      `;
    }
  } else if (authNoticeEl) {
    authNoticeEl.innerHTML = `
      <div style="background: rgba(212, 175, 55, 0.05); border: 1px dashed var(--border-gold); border-radius: var(--radius-sm); padding: 10px 14px; font-size: 0.85rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <span>Ordering as Guest. Want to save address &amp; track bookings?</span>
        <a href="/login.html" style="color: var(--gold-dark); font-weight: 600; text-decoration: none;">Sign In / Create Account &rarr;</a>
      </div>
    `;
  }

  // 2. Fetch and render Cart
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

  const shipping = (subtotal >= 5000 || subtotal === 0) ? 0 : 49;
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
        <span>Bangalore Express Delivery (24–48 hrs)</span>
        <span>${shipping === 0 ? '<strong style="color: #10B981;">FREE</strong>' : formatPrice(shipping)}</span>
      </div>
      <p class="cart-summary__note">${shipping === 0 ? 'Free express doorstep delivery unlocked!' : 'Insured local Bangalore dispatch within 24–48 hours'}</p>
      <div class="cart-summary__divider"></div>
      <div class="cart-summary__row cart-summary__total">
        <span>Total Value</span>
        <span>${formatPrice(total)}</span>
      </div>
      <div class="cart-summary__row" style="background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.35); padding: 8px 12px; border-radius: 6px; margin-top: 10px; font-weight: 700;">
        <span style="color: #0A6C38; display: flex; align-items: center; gap: 6px;"><i data-lucide="shield-check" style="width: 16px; height: 16px;"></i> Due Today:</span>
        <span style="color: #0A6C38; font-size: 1.05rem;">₹0 (Pay After Video Approval)</span>
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
    btn.innerHTML = `<span class="loader__ring" style="width: 16px; height: 16px; border-width: 2px; margin: 0; display: inline-block;"></span> Processing Booking...`;

    try {
      const shippingDetails = {
        name: document.getElementById('shippingName').value.trim(),
        phone: document.getElementById('shippingPhone').value.trim(),
        address: document.getElementById('shippingAddress').value.trim(),
        city: (document.getElementById('shippingCity').value || 'Bengaluru').trim(),
        state: (document.getElementById('shippingState').value || 'Karnataka').trim(),
        pincode: document.getElementById('shippingPin').value.trim()
      };

      // Validate Bangalore exclusive pincode (560xxx)
      const bangalorePinRegex = /^560\d{3}$/;
      if (!bangalorePinRegex.test(shippingDetails.pincode)) {
        showToast('We currently deliver exclusively within Bangalore (pincodes 560xxx). For outstation queries, please contact us on WhatsApp.', '!');
        btn.disabled = false;
        btn.innerHTML = originalText;
        return;
      }

      const { items, subtotal, savings, shipping, total } = await getCartOrderDetails();
      if (items.length === 0) {
        showToast('Your cart is empty', '✗');
        btn.disabled = false;
        btn.innerHTML = originalText;
        return;
      }

      const userId = typeof getLoggedInUserId === 'function' ? getLoggedInUserId() : null;
      const token = typeof getCustomerToken === 'function' ? getCustomerToken() : null;

      let orderId = null;

      // 1. Log Order to Database
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            userId: userId || 'guest',
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

      // 2. Also send order copy to FormSubmit email for showroom records
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
            order_id: orderId || 'N/A',
            _subject: `New Online Order: ${shippingDetails.name} (Rs. ${total})`,
            _captcha: 'false',
            _template: 'table'
          })
        }).catch(() => {});
      } catch (emailErr) {}

      // 3. Generate WhatsApp Link
      const orderUrl = await getWhatsAppOrderUrl(shippingDetails, orderId);

      // 4. Save Cart Backup and Clear Cart
      const currentCart = await getCart();
      localStorage.setItem('kannika_cart_backup', JSON.stringify(currentCart));
      await clearCart();

      // 5. Display Order Success Modal with reference
      const shortId = orderId ? `#KB-${orderId.slice(-6).toUpperCase()}` : '#KB-CONFIRMED';
      const successModal = document.getElementById('orderSuccessModal');
      const orderIdEl = document.getElementById('successOrderId');
      const waBtn = document.getElementById('btnSuccessWhatsApp');

      if (orderIdEl) orderIdEl.textContent = shortId;
      if (waBtn) waBtn.href = orderUrl;

      if (successModal) {
        successModal.style.display = 'flex';
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }

      showToast('Order confirmed! Opening WhatsApp booking...', '🛍️');

      // Direct to WhatsApp after short pause
      setTimeout(() => {
        window.location.href = orderUrl;
      }, 1200);

    } catch (err) {
      console.error('Checkout error:', err);
      showToast('Checkout failed. Please try again.', '✗');
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  });
}
