const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
menuToggle?.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const glow=document.querySelector('.cursor-glow');
window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
document.getElementById('year').textContent=new Date().getFullYear();
// Subtle 3D tilt on desktop project cards
if(window.matchMedia('(pointer:fine)').matches){document.querySelectorAll('.project-card,.stack-item').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${y*-2}deg) rotateY(${x*2}deg) translateY(-4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}


// Project video showcase: supports YouTube, Vimeo and direct MP4 URLs.
const videoModal=document.querySelector('.video-modal');
const videoFrame=videoModal?.querySelector('iframe');
const videoTitle=videoModal?.querySelector('.video-modal-title');
const closeVideo=()=>{ if(videoModal){videoModal.classList.remove('open');videoModal.setAttribute('aria-hidden','true');} if(videoFrame) videoFrame.src=''; document.body.classList.remove('modal-open'); };
const toEmbedUrl=(url)=>{
  if(!url) return '';
  try{
    const u=new URL(url);
    if(u.hostname.includes('youtube.com')){
      const id=u.searchParams.get('v');
      if(id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if(u.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${u.pathname.slice(1)}?autoplay=1&rel=0`;
    if(u.hostname.includes('vimeo.com')) return `https://player.vimeo.com/video/${u.pathname.split('/').filter(Boolean).pop()}?autoplay=1`;
    return url;
  }catch{return url;}
};
document.querySelectorAll('.video-card').forEach(card=>{
  const button=card.querySelector('.video-btn');
  const thumb=card.querySelector('.video-thumb');
  const url=card.dataset.videoUrl?.trim();
  const title=card.querySelector('h3')?.textContent || 'Project video';
  const open=()=>{
    if(!url){
      button?.classList.add('missing');
      const note=card.querySelector('.video-note-inline') || document.createElement('span');
      note.className='video-note-inline'; note.textContent='Add your video URL in data-video-url';
      if(!card.querySelector('.video-note-inline')) card.querySelector('.video-info')?.appendChild(note);
      return;
    }
    if(videoFrame){videoFrame.src=toEmbedUrl(url);}
    if(videoTitle) videoTitle.textContent=title;
    videoModal?.classList.add('open'); videoModal?.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  };
  button?.addEventListener('click',open); thumb?.addEventListener('click',open);
});
videoModal?.querySelector('.video-close')?.addEventListener('click',closeVideo);
videoModal?.querySelector('.video-modal-backdrop')?.addEventListener('click',closeVideo);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeVideo();});

// Netlify form UX: native submission is used when deployed on Netlify.
const contactForm=document.querySelector('.contact-form');
contactForm?.addEventListener('submit',()=>{
  const status=contactForm.querySelector('.form-status');
  if(status) status.textContent='Sending your inquiry…';
});
