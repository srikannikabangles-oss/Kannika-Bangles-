/* =====================================================
   KANNIKA BANGLES — Cart Page Logic
   Asynchronous Database Cart & Order Form Controllers
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

window.triggerCartRestore = async function() {
  const success = await restoreCartFromBackup();
  if (success) {
    const banner = document.getElementById('cartRecoveryBanner');
    if (banner) banner.remove();
    renderCart();
  }
};

async function renderCart() {
  try {

    const container = document.getElementById('cartItems');
    const summaryEl = document.getElementById('cartSummary');
    const emptyEl = document.getElementById('cartEmpty');
    const filledEl = document.getElementById('cartFilled');


    if (!container) return;

    const cart = await getCart();


  if (cart.length === 0) {
    if (emptyEl) {
      emptyEl.style.display = 'flex';
      
      // Inject recovery backup banner if cart is empty but recovery details exist
      const backup = localStorage.getItem('kannika_cart_backup');
      if (backup && JSON.parse(backup).length > 0) {
        let banner = document.getElementById('cartRecoveryBanner');
        if (!banner) {
          banner = document.createElement('div');
          banner.id = 'cartRecoveryBanner';
          banner.className = 'cart-recovery-banner reveal visible';
          banner.style.cssText = 'background: rgba(212, 175, 55, 0.08); border: 1.5px dashed var(--gold-primary); padding: 16px 24px; border-radius: var(--radius-md); max-width: 600px; margin: 24px auto 0; text-align: center; font-family: "Inter", sans-serif; display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;';
          banner.innerHTML = `
            <span style="font-size: 0.95rem; color: var(--text-primary); font-weight: 500;">🛍️ Did your WhatsApp checkout get interrupted?</span>
            <button class="btn btn--outline btn--sm" onclick="event.preventDefault(); triggerCartRestore();" style="padding: 6px 12px; font-size: 0.85rem; border-color: var(--gold-primary); color: var(--gold-dark); cursor: pointer; transition: all var(--transition-fast);">Restore Cart Items</button>
          `;
          const containerEmpty = emptyEl.querySelector('.container');
          if (containerEmpty) {
            containerEmpty.appendChild(banner);
          }
        }
      }
    }
    if (filledEl) filledEl.style.display = 'none';
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
      <div class="cart-item" data-id="${product.id}" data-size="${item.size}">
        <div class="cart-item__image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="cart-item__details">
          <span class="cart-item__category">${getCategoryName(product.category)}</span>
          <h3 class="cart-item__name">${product.name}</h3>
          <div class="cart-item__meta">
            <span class="cart-item__size">Size: ${item.size}</span>
            <span class="cart-item__finish">${product.finish}</span>
          </div>
          <div class="cart-item__price-row">
            <span class="cart-item__price">${formatPrice(product.price)}</span>
            ${product.originalPrice > product.price ? `<span class="cart-item__original">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
        </div>
        <div class="cart-item__actions">
          <div class="cart-item__qty">
            <button class="cart-item__qty-btn" onclick="changeQty(${product.id}, '${item.size}', -1)" aria-label="Decrease quantity">
              <i data-lucide="minus" style="width:16px;height:16px;"></i>
            </button>
            <span class="cart-item__qty-val">${item.quantity}</span>
            <button class="cart-item__qty-btn" onclick="changeQty(${product.id}, '${item.size}', 1)" aria-label="Increase quantity">
              <i data-lucide="plus" style="width:16px;height:16px;"></i>
            </button>
          </div>
          <span class="cart-item__total">${formatPrice(itemTotal)}</span>
          <button class="cart-item__remove" onclick="removeItem(${product.id}, '${item.size}')" aria-label="Remove item">
            <i data-lucide="trash-2" style="width:18px;height:18px;"></i>
          </button>
        </div>
      </div>
    `;
  }

  container.innerHTML = itemsHTML;

  // Update summary
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
  } catch (e) {
    console.error('Cart render error:', e);
  }
}

async function changeQty(productId, size, delta) {
  const cart = await getCart();
  const item = cart.find(i => i.id === productId && i.size === size);
  if (item) {
    const newQty = item.quantity + delta;
    if (newQty >= 1) {
      await updateCartQuantity(productId, size, newQty);
      await renderCart();
    }
  }
}

async function removeItem(productId, size) {
  const itemEl = document.querySelector(`[data-id="${productId}"][data-size="${size}"]`);
  if (itemEl) {
    itemEl.style.transform = 'translateX(100px)';
    itemEl.style.opacity = '0';
    setTimeout(async () => {
      await removeFromCart(productId, size);
      await renderCart();
    }, 300);
  } else {
    await removeFromCart(productId, size);
    await renderCart();
  }
}

async function clearAllCart() {
  await clearCart();
  await renderCart();
  showToast('Cart cleared');
}

function getCategoryName(categoryId) {
  const cat = CATEGORIES.find(c => c.id === categoryId);
  return cat ? cat.name : categoryId;
}
