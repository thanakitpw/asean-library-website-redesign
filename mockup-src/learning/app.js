/* Learning Space mockup — interaction เล็ก ๆ ที่ใช้ร่วมกันทุกหน้า */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---- mobile menu ---- */
  const hdr = $('#hdr'), burger = $('.burger');
  if (burger) burger.addEventListener('click', () => {
    const open = hdr.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  /* ---- chip + search filter สำหรับรายการ (ข่าว/บทความ/เกร็ด/คลังภาพ) ----
     <div data-chips="x"><button data-f="all">…</button><button data-f="cat">…</button></div>
     <input data-search="x">   <div data-list="x"><a data-cat="cat">…</a></div>
     <p data-note="x"></p> */
  $$('[data-list]').forEach(list => {
    const key = list.dataset.list;
    const chips = $$(`[data-chips="${key}"] [data-f]`);
    const search = $(`[data-search="${key}"]`);
    const note = $(`[data-note="${key}"]`);
    const empty = $('.empty', list);
    const items = $$('[data-cat]', list);
    let cat = 'all';

    const apply = () => {
      const q = (search ? search.value : '').trim().toLowerCase();
      let n = 0;
      items.forEach(it => {
        const ok = (cat === 'all' || it.dataset.cat.split(' ').includes(cat)) &&
                   (!q || it.textContent.toLowerCase().includes(q));
        it.hidden = !ok;
        if (ok) n++;
      });
      if (empty) empty.hidden = n > 0;
      if (note) note.textContent = `แสดง ${n} รายการ`;
    };
    chips.forEach(c => c.addEventListener('click', () => {
      chips.forEach(x => x.classList.toggle('on', x === c));
      cat = c.dataset.f;
      apply();
    }));
    if (search) search.addEventListener('input', apply);

    const pre = new URLSearchParams(location.search).get('c');
    const preChip = pre && chips.find(c => c.dataset.f === pre);
    if (preChip) preChip.click(); else apply();
  });

  /* ---- เครือข่ายห้องสมุด 77 แห่ง ---- */
  const libList = $('#libs');
  if (libList && window.LIBRARIES) {
    const ZONE = { north: 'ภาคเหนือ', northeast: 'ภาคตะวันออกเฉียงเหนือ', central: 'ภาคกลางและตะวันออก', east: 'ภาคกลางและตะวันออก', south: 'ภาคใต้' };
    const zoneOf = l => (l.region === 'east' ? 'central' : l.region);
    const libs = window.LIBRARIES;
    const q = $('#libSearch'), sort = $('#libSort'), note = $('#libNote');
    let zone = 'all';

    $$('.region').forEach(b => {
      const z = b.dataset.zone;
      const have = libs.filter(l => zoneOf(l) === z).length;
      $('b', b).textContent = have;
      $('.bar i', b).style.width = Math.round(have / +b.dataset.total * 100) + '%';
      b.addEventListener('click', () => {
        zone = b.classList.contains('on') ? 'all' : z;
        $$('.region').forEach(x => x.classList.toggle('on', x.dataset.zone === zone));
        $$('.region').forEach(x => x.setAttribute('aria-pressed', x.dataset.zone === zone));
        draw();
      });
    });

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const card = l => {
      const isNew = l.no === 77;
      const no = l.no ? `<div class="no${isNew ? ' new' : ''}">${l.no}</div>` : '<div class="no na">ปี ' + esc(l.year).slice(2) + '</div>';
      const school = l.school ? esc(l.school) : '<span style="color:var(--text-3)">รอข้อมูลโรงเรียนจากกรมอาเซียน</span>';
      const tel = l.tel ? `<span><svg class="icon"><use href="#i-phone"/></svg> ${esc(l.tel)}</span>` : `<span>เปิดเมื่อ พ.ศ. ${esc(l.year)}</span>`;
      return `<article class="lib">
        <div class="top">${no}<div><div class="prov">${esc(l.province)}</div><div class="reg">${ZONE[l.region]} · พ.ศ. ${esc(l.year)}</div></div></div>
        <div class="school"><svg class="icon"><use href="#i-school"/></svg><span>${school}</span></div>
        <div class="row">${tel}<a href="news-detail.html">ข่าวพิธีเปิด <svg class="icon"><use href="#i-chev-r"/></svg></a></div>
      </article>`;
    };
    const draw = () => {
      const t = (q.value || '').trim().toLowerCase();
      let rows = libs.filter(l => (zone === 'all' || zoneOf(l) === zone) &&
        (!t || (l.province + ' ' + l.school).toLowerCase().includes(t)));
      if (sort.value === 'new') rows = [...rows].sort((a, b) => (b.year - a.year) || ((b.no || 0) - (a.no || 0)));
      else if (sort.value === 'old') rows = [...rows].sort((a, b) => (a.year - b.year) || ((a.no || 999) - (b.no || 999)));
      else rows = [...rows].sort((a, b) => a.province.localeCompare(b.province, 'th'));
      libList.innerHTML = rows.length ? rows.map(card).join('') :
        '<div class="empty"><svg class="icon"><use href="#i-search"/></svg>ไม่พบห้องสมุดที่ตรงกับคำค้น ลองพิมพ์ชื่อจังหวัดหรือโรงเรียนอีกครั้ง</div>';
      note.textContent = `พบ ${rows.length} แห่ง` + (zone !== 'all' ? ` ใน${ZONE[zone]}` : '');
    };
    q.addEventListener('input', draw);
    sort.addEventListener('change', draw);
    const pre = new URLSearchParams(location.search).get('q');
    if (pre) q.value = pre;
    draw();
  }

  /* ---- lightbox ---- */
  const shots = $$('[data-lightbox]');
  if (shots.length) {
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<img alt=""><div class="cap"></div>' +
      '<button class="x" aria-label="ปิด"><svg class="icon"><use href="#i-x"/></svg></button>' +
      '<button class="prev" aria-label="ภาพก่อนหน้า"><svg class="icon"><use href="#i-chev-r"/></svg></button>' +
      '<button class="next" aria-label="ภาพถัดไป"><svg class="icon"><use href="#i-chev-r"/></svg></button>';
    document.body.appendChild(box);
    let i = 0, last = null;
    const show = n => {
      i = (n + shots.length) % shots.length;
      const a = shots[i];
      $('img', box).src = a.getAttribute('href');
      $('img', box).alt = a.dataset.caption || '';
      $('.cap', box).textContent = `${a.dataset.caption || ''}  (${i + 1}/${shots.length})`;
    };
    const close = () => { box.classList.remove('open'); if (last) last.focus(); };
    shots.forEach((a, n) => a.addEventListener('click', e => {
      e.preventDefault(); last = a; show(n); box.classList.add('open'); $('.x', box).focus();
    }));
    $('.x', box).onclick = close;
    $('.prev', box).onclick = () => show(i - 1);
    $('.next', box).onclick = () => show(i + 1);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
  }

  /* ---- ฟอร์มติดต่อ (mockup: ไม่ส่งจริง) ---- */
  const form = $('#contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    $('.sent', form).classList.add('show');
    form.reset();
  });

  /* ---- สุ่มคำศัพท์ (หน้าเกร็ดน่ารู้) ---- */
  const shuffle = $('[data-shuffle]');
  if (shuffle) {
    const terms = $$('.gl').map(g => ({ k: $('.k', g).textContent, b: $('b', g).textContent, em: $('em', g).textContent, p: $('p', g).textContent }));
    let n = 0;
    shuffle.addEventListener('click', () => {
      n = (n + 1 + Math.floor(Math.random() * (terms.length - 1))) % terms.length;
      const t = terms[n];
      $('.wotd .term').textContent = t.b;
      $('.wotd .full').textContent = t.em;
      $('.wotd .def').textContent = t.p;
    });
  }
})();
