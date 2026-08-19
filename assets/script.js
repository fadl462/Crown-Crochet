
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>[...r.querySelectorAll(s)];

const nav = $('.nav');
const menu = $('.menu');
if(menu) menu.addEventListener('click',()=>nav.classList.toggle('mobile-open'));

$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const path = location.pathname.split('/').pop() || 'index.html';
$$('.links a').forEach(a=>{
  const href = a.getAttribute('href');
  if(href===path || (path==='' && href==='index.html')) a.classList.add('active');
});

const toast = $('.toast');
function showToast(msg){
  if(!toast) return;
  toast.textContent=msg; toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),4200);
}

$$('[data-gallery]').forEach(img=>{
  img.addEventListener('click',()=>{
    const modal=$('.modal'), target=$('.modal img');
    if(modal && target){target.src=img.src; target.alt=img.alt; modal.classList.add('open')}
  });
});
$('.modal-close')?.addEventListener('click',()=>$('.modal')?.classList.remove('open'));
$('.modal')?.addEventListener('click',e=>{if(e.target.classList.contains('modal'))e.currentTarget.classList.remove('open')});

const bookingForm = $('#bookingForm');
bookingForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(bookingForm).entries());
  const booking={...data,createdAt:new Date().toISOString()};
  const list=JSON.parse(localStorage.getItem('locsBookings')||'[]');
  list.push(booking); localStorage.setItem('locsBookings',JSON.stringify(list));
  showToast('Your appointment request has been saved. We will confirm your slot shortly.');
  bookingForm.reset();
});

const contactForm = $('#contactForm');
contactForm?.addEventListener('submit',e=>{
  e.preventDefault();
  showToast('Thank you — your message is ready to be reviewed by the salon.');
  contactForm.reset();
});

const reviewForm = $('#reviewForm');
reviewForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(reviewForm).entries());
  const list=JSON.parse(localStorage.getItem('locsTestimonials')||'[]');
  list.unshift({...data,createdAt:new Date().toISOString()});
  localStorage.setItem('locsTestimonials',JSON.stringify(list));
  showToast('Thank you for sharing your experience.');
  reviewForm.reset();
});

$$('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>$(btn.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));
