
// Language & menu & WhatsApp & lightbox + smooth scroll
const qs = new URLSearchParams(location.search);
let current = (qs.get('lang') || 'en').toLowerCase();
if (!['en','ru'].includes(current)) current = 'en';
document.documentElement.lang = current;
document.body.setAttribute('data-lang', current);

function setLang(lang){
  const url = new URL(location.href);
  url.searchParams.set('lang', lang);
  location.href = url.toString();
}

window.addEventListener('DOMContentLoaded', ()=>{
  // Localize form placeholders
  const nameI = document.querySelector('input[name="name"]');
  const phoneI = document.querySelector('input[name="phone"]');
  const sel = document.querySelector('select[name="service"]');
  const msgI = document.querySelector('textarea[name="msg"]');
  if(nameI && phoneI && sel && msgI){
    if(current==='ru'){
      nameI.placeholder = 'Имя';
      phoneI.placeholder = 'Телефон или WhatsApp';
      msgI.placeholder = 'Сообщение';
      // Option texts RU
      sel.options[0].text = 'Продажа и аренда';
      sel.options[1].text = 'Бассейн и сад';
      sel.options[2].text = 'Ремонт и отделка';
      sel.options[3].text = 'Клининг и инспекция';
      sel.options[4].text = 'Другое';
    }else{
      nameI.placeholder = 'Name';
      phoneI.placeholder = 'Phone or WhatsApp';
      msgI.placeholder = 'Brief message';
      sel.options[0].text = 'Property Sales & Rentals';
      sel.options[1].text = 'Pool & Garden Maintenance';
      sel.options[2].text = 'Renovation & Repair';
      sel.options[3].text = 'Cleaning & Inspection';
      sel.options[4].text = 'Other';
    }
  }

  // Lang
  const en = document.getElementById('btn-en');
  const ru = document.getElementById('btn-ru');
  if(en && ru){ en.classList.remove('active'); ru.classList.remove('active');
    en.classList.toggle('active', current==='en');
    ru.classList.toggle('active', current==='ru');
    en.addEventListener('click', ()=>setLang('en'));
    ru.addEventListener('click', ()=>setLang('ru'));
  }

  // Mobile drawer menu
  const drawer = document.getElementById('drawer');
  const openBtn = document.getElementById('menu-open');
  const closeBtn = document.getElementById('menu-close');
  function open(){drawer.classList.add('open');}
  function close(){drawer.classList.remove('open');}
  if(openBtn){ openBtn.addEventListener('click', open); }
  if(closeBtn){ closeBtn.addEventListener('click', close); }
  if(drawer){ drawer.addEventListener('click', e=>{ if(e.target===drawer) close(); }); }
  document.querySelectorAll('#drawer a').forEach(a=>a.addEventListener('click', close));

  // Anchor smooth scroll (already via CSS but ensure offset fix)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({top:y, behavior:'smooth'});
      }
    });
  });

  // Open service cards in new tab
  document.querySelectorAll('a.card[href*="services/"]').forEach(a=>{
    a.setAttribute('target','_blank'); a.setAttribute('rel','noopener');
  });

  // WhatsApp
  const WA_NUMBER = '905366928934';
  const wa = document.getElementById('wa-main');
  function waLink(text){ return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`; }
  if(wa){ wa.href = waLink('Hello! I would like info about property management in Alanya.'); }
  const form = document.getElementById('quote');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const d = new FormData(form);
      const t = `New inquiry:%0AName: ${d.get('name')}%0APhone: ${d.get('phone')}%0AService: ${d.get('service')}%0AMessage: ${d.get('msg')}`;
      location.href = waLink(t);
    });
  }

  // Lightbox
  const backdrop = document.createElement('div');
  backdrop.className='lightbox-backdrop';
  backdrop.innerHTML = '<button class="lightbox-close" id="lb-close" aria-label="Close">✕</button><img class="lightbox-image" id="lb-img" alt="">';
  document.body.appendChild(backdrop);
  const imgTag = document.getElementById('lb-img');
  const closeLb = document.getElementById('lb-close');
  function lbClose(){ backdrop.classList.remove('active'); imgTag.src=''; }
  closeLb.addEventListener('click', lbClose);
  backdrop.addEventListener('click', (e)=>{ if(e.target===backdrop) lbClose(); });
  document.querySelectorAll('[data-lightbox]').forEach(a=>{
    a.addEventListener('click', e=>{ e.preventDefault(); imgTag.src=a.getAttribute('href'); backdrop.classList.add('active'); });
  });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') lbClose(); });
});
