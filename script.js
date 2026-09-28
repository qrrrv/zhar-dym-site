const state = { cart: [], filter: 'all' };
const menu = document.querySelector('.menu-grid');
const drawer = document.querySelector('.cart-drawer');
const scrim = document.querySelector('.scrim');
const toast = document.querySelector('.toast');
const count = document.querySelector('.cart-count');
const total = document.querySelector('.cart-total');
const items = document.querySelector('.cart-drawer__items');
const prices = { 'Шашлык из свиной шеи': 690, 'Куриное бедро': 490, 'Люля-кебаб': 590, 'Овощи на углях': 390, 'Лепёшка из тандыра': 180, 'Большой сет Дым': 1990 };
function openCart(){ drawer.classList.add('is-open'); scrim.classList.add('is-open'); drawer.querySelector('[data-cart-close]').focus(); }
function closeCart(){ drawer.classList.remove('is-open'); scrim.classList.remove('is-open'); }
function showToast(message){ toast.textContent = message; toast.classList.add('is-visible'); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2300); }
function renderCart(){
  count.textContent = state.cart.length;
  const sum = state.cart.reduce((acc, name) => acc + prices[name], 0);
  total.textContent = `${sum.toLocaleString('ru-RU')} ₽`;
  if (!state.cart.length) { items.innerHTML = '<p class="cart-empty">Пока пусто. Выбери что-нибудь с огня.</p>'; return; }
  const grouped = state.cart.reduce((acc, name) => { acc[name] = (acc[name] || 0) + 1; return acc; }, {});
  items.innerHTML = Object.entries(grouped).map(([name, qty]) => `<div class="cart-item"><span>${name} <b>×${qty}</b></span><button data-remove="${name}" aria-label="Удалить ${name}">×</button></div>`).join('');
  items.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => { state.cart.splice(state.cart.indexOf(btn.dataset.remove), 1); renderCart(); }));
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter.is-active').classList.remove('is-active'); button.classList.add('is-active'); const filter = button.dataset.filter; document.querySelectorAll('.dish-card').forEach(card => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter)); }));
document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => { state.cart.push(button.dataset.add); renderCart(); showToast(`${button.dataset.add} добавлен в заказ`); }));
document.querySelector('[data-cart-toggle]').addEventListener('click', openCart);
document.querySelector('[data-cart-close]').addEventListener('click', closeCart);
scrim.addEventListener('click', closeCart);
document.querySelector('.menu-toggle').addEventListener('click', () => { document.querySelector('.main-nav').classList.toggle('is-mobile'); });
document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.main-nav').classList.remove('is-mobile')));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCart(); });
document.getElementById('year').textContent = new Date().getFullYear();
renderCart();
