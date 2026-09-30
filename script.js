/* Rana Jaber — portfolio script
   - Bilingual content (EN / AR) with RTL switching
   - Live bubble background on <canvas>
   - Nav glider + scroll-spy, typing roles
   - Certificates carousel, experience cards, skill bubbles, copy email */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ */
  /* Content                                                             */
  /* ------------------------------------------------------------------ */
  const I18N = {
    en: {
      skip: 'Skip to content',
      navLabel: 'Main navigation',
      navAbout: 'About Me', navExp: 'My Experiences', navSkills: 'My Skills', navContact: 'Contact Me',
      navAboutS: 'About', navExpS: 'Experience', navSkillsS: 'Skills', navContactS: 'Contact',
      hello: 'Welcome, I’m', name: 'Rana Jaber',
      explore: 'Scroll to explore',
      aboutTitle: 'About Me',
      aboutText: 'IT support specialist and web developer from Jeddah. I hold a Programming & Computer Science diploma from the University of Jeddah (GPA 4.73/5) and a Technical Support diploma, and I trained at Saudi Aramco, King Abdulaziz University Hospital and the Apple Developer Academy. I like building web tools that make everyday work simpler.',
      prev: 'Previous certificate', next: 'Next certificate', certN: 'Certificate',
      pauseAuto: 'Pause slideshow', playAuto: 'Play slideshow',
      viewCert: 'View full certificate', close: 'Close',
      expTitle: 'My Experiences', expHint: 'Hover to preview, click to pin', pinned: 'Pinned',
      tabsLabel: 'Show', tabProjects: 'Projects', tabWork: 'Work & training',
      live: 'Visit site', code: 'Code on GitHub',
      skillsTitle: 'My Skills', skillsHint: 'Tap a bubble to see where I used it.',
      filterLabel: 'Filter skills', all: 'All', fe: 'Front-end', be: 'Back-end & data', it: 'IT & networks', pl: 'Programming',
      usedIn: 'Used in', pickSkill: 'Pick a skill bubble to see the projects behind it.',
      contactTitle: 'Let’s work together',
      contactText: 'I’m open to front-end and IT roles in Jeddah, Riyadh or the Eastern Province. Send me an email or connect with me on LinkedIn.',
      email: 'Email', copy: 'Copy', copied: 'Email copied', copyFail: 'Select the address to copy it',
      cv: 'Download my CV',
      footer: '© 2026 Rana Jaber Fadel',
      roles: ['Front-end developer', 'IT support specialist', 'Web & data']
    },
    ar: {
      skip: 'انتقل للمحتوى',
      navLabel: 'التنقل الرئيسي',
      navAbout: 'نبذة عني', navExp: 'خبراتي', navSkills: 'مهاراتي', navContact: 'تواصل معي',
      navAboutS: 'عني', navExpS: 'خبراتي', navSkillsS: 'مهاراتي', navContactS: 'تواصل',
      hello: 'أهلًا، أنا', name: 'رنا جابر',
      explore: 'اكتشف المزيد',
      aboutTitle: 'نبذة عني',
      aboutText: 'أخصائية دعم تقني ومطوّرة ويب من جدة. حاصلة على دبلوم البرمجة وعلوم الحاسب من جامعة جدة (معدل ٤٫٧٣ من ٥) ودبلوم الدعم الفني، وتدرّبت في أرامكو السعودية ومستشفى جامعة الملك عبدالعزيز وأكاديمية أبل للمطورين. أحب أبني أدوات ويب تسهّل الشغل اليومي.',
      prev: 'الشهادة السابقة', next: 'الشهادة التالية', certN: 'الشهادة',
      pauseAuto: 'إيقاف التقليب التلقائي', playAuto: 'تشغيل التقليب التلقائي',
      viewCert: 'عرض الشهادة كاملة', close: 'إغلاق',
      expTitle: 'خبراتي', expHint: 'مرّر للمعاينة، واضغط للتثبيت', pinned: 'مثبّتة',
      tabsLabel: 'عرض', tabProjects: 'المشاريع', tabWork: 'العمل والتدريب',
      live: 'زيارة الموقع', code: 'الكود على GitHub',
      skillsTitle: 'مهاراتي', skillsHint: 'اضغط على أي فقاعة وشوف وين استخدمتها.',
      filterLabel: 'تصفية المهارات', all: 'الكل', fe: 'الواجهات', be: 'الخلفية والبيانات', it: 'الدعم والشبكات', pl: 'لغات البرمجة',
      usedIn: 'استخدمتها في', pickSkill: 'اختر فقاعة مهارة وتظهر لك المشاريع اللي وراها.',
      contactTitle: 'خلّينا نشتغل سوا',
      contactText: 'متاحة لوظائف تطوير الواجهات والدعم التقني في جدة أو الرياض أو المنطقة الشرقية. راسلني على البريد أو تواصل معي على LinkedIn.',
      email: 'البريد الإلكتروني', copy: 'نسخ', copied: 'تم نسخ البريد', copyFail: 'حدّد العنوان وانسخه',
      cv: 'حمّل سيرتي الذاتية',
      footer: '© 2026 رنا جابر فاضل',
      roles: ['مطوّرة واجهات أمامية', 'أخصائية دعم تقني', 'ويب وبيانات']
    }
  };

  /* Certificates: images live in images/certs/ (national ID numbers covered). */
  const CERTS = [
    { img: 'aramco-completion',
      name: { en: 'Saudi Aramco — Internship Completion', ar: 'أرامكو السعودية — إتمام التدريب' },
      text: { en: 'Vocational Colleges Internship Program', ar: 'برنامج تدريب طلاب الكليات التقنية' },
      date: { en: 'Jun 15 – Sep 10, 2026', ar: '١٥ يونيو – ١٠ سبتمبر ٢٠٢٦' } },
    { img: 'aramco-recommendation',
      name: { en: 'Letter of Recommendation', ar: 'خطاب توصية' },
      text: { en: 'Security Technology Solutions Division, Saudi Aramco', ar: 'قسم حلول تقنيات الأمن، أرامكو السعودية' },
      date: { en: 'Sep 10, 2026', ar: '١٠ سبتمبر ٢٠٢٦' } },
    { img: 'power-bi',
      name: { en: 'Data Analysis Using Power BI', ar: 'تحليل البيانات باستخدام Power BI' },
      text: { en: 'Exclusive Technology Training Center · 15 hours', ar: 'مركز التقنية الحصرية للتدريب · ١٥ ساعة' },
      date: { en: 'Apr 2026', ar: 'أبريل ٢٠٢٦' } },
    { img: 'kauh-training',
      name: { en: 'Technical Support & Network Units', ar: 'وحدة الدعم الفني ووحدة الشبكات' },
      text: { en: 'King Abdulaziz University Hospital, IT Department', ar: 'مستشفى جامعة الملك عبدالعزيز، إدارة تقنية المعلومات' },
      date: { en: 'Jan 18, 2025 – Mar 12, 2026', ar: '١٨ يناير ٢٠٢٥ – ١٢ مارس ٢٠٢٦' } },
    { img: 'english-b1',
      name: { en: 'English CEFR B1 — 89%', ar: 'اللغة الإنجليزية مستوى B1 — ٨٩٪' },
      text: { en: 'TVTC Intensive English Program · 600 hours', ar: 'برنامج اللغة الإنجليزية المكثف · ٦٠٠ ساعة' },
      date: { en: 'Mar – Aug 2024', ar: 'مارس – أغسطس ٢٠٢٤' } },
    { img: 'apple-academy',
      name: { en: 'Apple Foundation Program', ar: 'برنامج أبل التأسيسي' },
      text: { en: 'Apple Developer Academy', ar: 'أكاديمية أبل للمطورين' },
      date: { en: 'Dec 10, 2023 – Jan 4, 2024', ar: '١٠ ديسمبر ٢٠٢٣ – ٤ يناير ٢٠٢٤' } },
    { img: 'dtc-graduation',
      name: { en: 'Associate Degree — Computer Technical Support', ar: 'الدبلوم — تقنية الدعم الفني للحاسب' },
      text: { en: 'Digital Technical College · GPA 4.49/5 · second honors', ar: 'الكلية التقنية الرقمية · معدل ٤٫٤٩ من ٥ · مرتبة الشرف الثانية' },
      date: { en: 'Nov 16, 2023', ar: '١٦ نوفمبر ٢٠٢٣' } },
    { img: 'dtc-coop',
      name: { en: 'Cooperative Training Completion', ar: 'إتمام برنامج التدريب التعاوني' },
      text: { en: 'Digital Technical College for Girls, Jeddah', ar: 'الكلية التقنية الرقمية للبنات بجدة' },
      date: { en: '2023 (1445 AH)', ar: '١٤٤٥هـ' } },
    { img: 'ccna-srwe',
      name: { en: 'CCNA v7: Switching, Routing & Wireless', ar: 'CCNA v7: التبديل والتوجيه والشبكات اللاسلكية' },
      text: { en: 'Cisco Networking Academy', ar: 'أكاديمية سيسكو للشبكات' },
      date: { en: 'Feb 20, 2023', ar: '٢٠ فبراير ٢٠٢٣' } },
    { img: 'mobile-apps',
      name: { en: 'Smartphone App Programming', ar: 'برمجة تطبيقات الهواتف الذكية' },
      text: { en: 'Digital Technical College · 20 hours, remote', ar: 'الكلية التقنية الرقمية · ٢٠ ساعة عن بعد' },
      date: { en: 'Jan – Feb 2023', ar: '١٤٤٤هـ' } },
    { img: 'ccna-itn',
      name: { en: 'CCNA v7: Introduction to Networks', ar: 'CCNA v7: مقدمة في الشبكات' },
      text: { en: 'Cisco Networking Academy', ar: 'أكاديمية سيسكو للشبكات' },
      date: { en: 'Nov 29, 2022', ar: '٢٩ نوفمبر ٢٠٢٢' } },
    { img: 'it-essentials',
      name: { en: 'IT Essentials: PC Hardware & Software', ar: 'أساسيات تقنية المعلومات' },
      text: { en: 'Cisco Networking Academy', ar: 'أكاديمية سيسكو للشبكات' },
      date: { en: 'Jun 4, 2022', ar: '٤ يونيو ٢٠٢٢' } },
    { img: 'linux-essentials',
      name: { en: 'Linux Essentials', ar: 'أساسيات لينكس' },
      text: { en: 'NDG · Cisco Networking Academy', ar: 'NDG · أكاديمية سيسكو للشبكات' },
      date: { en: '2023', ar: '٢٠٢٣' } }
  ];

  /* Projects (newest first). To use a screenshot as the cover, save it as
     images/projects/<id>.png and set  img: 'images/projects/<id>.png'. */
  const GH = 'https://rana1jaber.github.io/';
  const REPO = 'https://github.com/rana1jaber/';
  const PROJECTS = [
    { id: 'projects-dashboard', img: null, tint: '#1d6b5c',
      title: { en: 'Our Projects — Dashboard', ar: 'مشاريعنا — لوحة التحكم' },
      meta: { en: 'Project #5 · Web app', ar: 'المشروع ٥ · تطبيق ويب' },
      line: { en: 'A bilingual team dashboard for projects, tasks, members and reports', ar: 'لوحة تحكم ثنائية اللغة للفرق: المشاريع والمهام والأعضاء والتقارير' },
      tags: ['HTML', 'CSS', 'JavaScript', 'EN / AR', 'Dark mode'],
      live: GH + 'projects-dashboard/', code: REPO + 'projects-dashboard' },
    { id: 'tripplanner', img: null, tint: '#2E5E8C',
      title: { en: 'TripPlanner', ar: 'TripPlanner' },
      meta: { en: 'Project #4 · Web app', ar: 'المشروع ٤ · تطبيق ويب' },
      line: { en: 'Plan trips with friends: invite them, vote on hotels and places, get a day-by-day plan', ar: 'خطط رحلاتك مع أصحابك: ادعُهم، صوّتوا على الفنادق والأماكن، واطلع بخطة يوم بيوم' },
      tags: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      live: GH + 'tripplanner/', code: REPO + 'tripplanner' },
    { id: 'contractor-ethics', img: null, tint: '#8A4B2A',
      title: { en: 'Ajeer Permit Check', ar: 'فحص تصاريح أجير' },
      meta: { en: 'Project #3 · Idea from my Aramco work', ar: 'المشروع ٣ · فكرة من شغلي في أرامكو' },
      line: { en: 'Load contractor workers and Ajeer permits, and see who is authorized to work in seconds', ar: 'حمّل عمال المقاولين وتصاريح أجير، واعرف مين مصرّح له بالعمل خلال ثواني' },
      tags: ['JavaScript', 'Excel import', 'EN / AR', 'Hijri dates'],
      live: GH + 'contractor-ethics/', code: REPO + 'contractor-ethics' },
    { id: 'sharek', img: null, tint: '#5B3F8C',
      title: { en: 'Sharek', ar: 'شارك' },
      meta: { en: 'Project #2 · Solo · Aramco', ar: 'المشروع ٢ · عمل فردي · أرامكو' },
      line: { en: 'An internal page for a security department that I designed and built on my own', ar: 'صفحة داخلية لإدارة أمنية صممتها وبنيتها بمفردي' },
      tags: ['HTML', 'CSS', 'JavaScript', 'UI design'],
      live: GH + 'Sharek_websiat/', code: REPO + 'Sharek_websiat' },
    { id: 'sowa', img: null, tint: '#3F6B3A',
      title: { en: 'SOWA', ar: 'SOWA' },
      meta: { en: 'Project #1 · My first project', ar: 'المشروع ١ · أول مشروع لي' },
      line: { en: 'Built the sidebar and linked a page that was only reachable from search into it, using C# and SQL', ar: 'بنيت القائمة الجانبية وربطت فيها صفحة كانت توصل لها من البحث بس، باستخدام C# و SQL' },
      tags: ['C#', 'SQL', 'HTML', 'CSS'],
      live: GH + 'SOWA/', code: REPO + 'SOWA' }
  ];

  const WORK = [
    { id: 'aramco', tint: '#0B6E8A',
      title: { en: 'Saudi Aramco', ar: 'أرامكو السعودية' },
      meta: { en: 'Web & systems trainee · Jun – Sep 2026', ar: 'متدربة ويب وأنظمة · يونيو – سبتمبر ٢٠٢٦' },
      line: { en: 'Built an internal notification system and the Sharek page, and earned a letter of recommendation', ar: 'بنيت نظام إشعارات داخلي وصفحة شارك، وحصلت على خطاب توصية' },
      tags: ['HTML', 'CSS', 'JavaScript', 'ASP.NET', 'SQL Server', 'Excel'] },
    { id: 'kauh', tint: '#2E6F6A',
      title: { en: 'King Abdulaziz University Hospital', ar: 'مستشفى جامعة الملك عبدالعزيز' },
      meta: { en: 'IT technical support intern · Jan 2025 – Mar 2026', ar: 'متدربة دعم تقني · يناير ٢٠٢٥ – مارس ٢٠٢٦' },
      line: { en: 'Hardware, software and network support across hospital departments', ar: 'دعم الأجهزة والبرامج والشبكات في أقسام المستشفى' },
      tags: ['Technical support', 'Networking', 'Documentation'] },
    { id: 'apple', tint: '#3A3A48',
      title: { en: 'Apple Developer Academy', ar: 'أكاديمية أبل للمطورين' },
      meta: { en: 'Foundation Program · Dec 2023 – Jan 2024', ar: 'البرنامج التأسيسي · ديسمبر ٢٠٢٣ – يناير ٢٠٢٤' },
      line: { en: 'Swift, rapid prototyping and interface design in agile team sprints', ar: 'Swift والنماذج السريعة وتصميم الواجهات ضمن فريق بأسلوب Agile' },
      tags: ['Swift', 'UI design', 'Agile'] },
    { id: 'dtc', tint: '#6A4C8C',
      title: { en: 'Digital Technical College', ar: 'الكلية التقنية الرقمية' },
      meta: { en: 'Technical support intern · 2023', ar: 'متدربة دعم فني · ٢٠٢٣' },
      line: { en: 'System updates, user accounts and IT documentation', ar: 'تحديثات الأنظمة وحسابات المستخدمين وتوثيق الدعم التقني' },
      tags: ['Technical support', 'Documentation'] }
  ];

  const projTitle = (id) => PROJECTS.find((p) => p.id === id).title;
  const workTitle = (id) => WORK.find((w) => w.id === id).title;
  const ARAMCO_SYS = { en: 'Aramco notification system', ar: 'نظام إشعارات أرامكو' };

  const SKILLS = [
    { name: { en: 'HTML', ar: 'HTML' }, cat: 'fe', size: 150, used: [projTitle('projects-dashboard'), projTitle('tripplanner'), projTitle('contractor-ethics'), projTitle('sharek'), ARAMCO_SYS] },
    { name: { en: 'CSS', ar: 'CSS' }, cat: 'fe', size: 130, used: [projTitle('projects-dashboard'), projTitle('tripplanner'), projTitle('sharek'), ARAMCO_SYS] },
    { name: { en: 'JavaScript', ar: 'JavaScript' }, cat: 'fe', size: 166, used: [projTitle('projects-dashboard'), projTitle('tripplanner'), projTitle('contractor-ethics'), ARAMCO_SYS] },
    { name: { en: 'UI Design', ar: 'UI Design' }, cat: 'fe', size: 128, used: [projTitle('sharek'), projTitle('projects-dashboard'), workTitle('apple')] },
    { name: { en: 'ASP.NET', ar: 'ASP.NET' }, cat: 'be', size: 132, used: [ARAMCO_SYS] },
    { name: { en: 'SQL Server', ar: 'SQL Server' }, cat: 'be', size: 146, used: [projTitle('sowa'), ARAMCO_SYS] },
    { name: { en: 'Firebase', ar: 'Firebase' }, cat: 'be', size: 120, used: [projTitle('tripplanner')] },
    { name: { en: 'Power BI', ar: 'Power BI' }, cat: 'be', size: 128, used: [{ en: 'Data analysis course, 2026', ar: 'دورة تحليل البيانات، ٢٠٢٦' }] },
    { name: { en: 'Excel', ar: 'Excel' }, cat: 'be', size: 116, used: [{ en: 'Data analysis with Ajeer at Aramco', ar: 'تحليل بيانات أجير في أرامكو' }, projTitle('contractor-ethics')] },
    { name: { en: 'Tech support', ar: 'الدعم التقني' }, cat: 'it', size: 158, used: [workTitle('kauh'), workTitle('dtc')] },
    { name: { en: 'Networking (CCNA)', ar: 'الشبكات (CCNA)' }, cat: 'it', size: 150, used: [{ en: 'Network Unit, King Abdulaziz University Hospital', ar: 'وحدة الشبكات، مستشفى جامعة الملك عبدالعزيز' }, { en: 'Cisco CCNA v7 courses', ar: 'دورات سيسكو CCNA v7' }] },
    { name: { en: 'Linux', ar: 'Linux' }, cat: 'it', size: 112, used: [{ en: 'NDG Linux Essentials', ar: 'أساسيات لينكس من NDG' }] },
    { name: { en: 'C#', ar: 'C#' }, cat: 'pl', size: 118, used: [projTitle('sowa')] },
    { name: { en: 'Swift', ar: 'Swift' }, cat: 'pl', size: 122, used: [workTitle('apple')] },
    { name: { en: 'Git & GitHub', ar: 'Git & GitHub' }, cat: 'pl', size: 138, used: [{ en: 'All five projects, live on GitHub Pages', ar: 'المشاريع الخمسة كلها، منشورة على GitHub Pages' }] }
  ];

  /* ------------------------------------------------------------------ */
  /* State + helpers                                                     */
  /* ------------------------------------------------------------------ */
  const state = { lang: 'en', cert: 0, tab: 'projects', exp: 0, pinned: null, skill: null, filter: 'all' };

  try {
    const saved = localStorage.getItem('rj-lang');
    if (saved === 'ar' || saved === 'en') state.lang = saved;
  } catch (e) { /* storage unavailable */ }

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const t = (key) => I18N[state.lang][key];
  const pick = (obj) => obj[state.lang];

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    [].concat(children).forEach((c) => c && node.append(c));
    return node;
  }

  function replay(node, cls) {
    if (reduceMotion || !node) return;
    node.classList.remove(cls);
    void node.offsetWidth;
    node.classList.add(cls);
  }

  /* ------------------------------------------------------------------ */
  /* Language                                                            */
  /* ------------------------------------------------------------------ */
  function applyLang() {
    const html = document.documentElement;
    html.lang = state.lang;
    html.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

    $$('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
    $$('[data-i18n-label]').forEach((node) => { node.setAttribute('aria-label', t(node.dataset.i18nLabel)); });
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));

    renderCert();
    renderExperiences();
    renderSkills();
    restartTyping();
    requestAnimationFrame(moveGlider);

    try { localStorage.setItem('rj-lang', state.lang); } catch (e) { /* ignore */ }
  }

  $$('.lang button').forEach((b) => b.addEventListener('click', () => {
    if (state.lang === b.dataset.lang) return;
    state.lang = b.dataset.lang;
    applyLang();
  }));

  /* ------------------------------------------------------------------ */
  /* Typing roles under the name                                         */
  /* ------------------------------------------------------------------ */
  const roleNode = $('#role');
  let typingTimer = null;

  function restartTyping() {
    clearTimeout(typingTimer);
    const roles = t('roles');
    let r = 0, i = 0, deleting = false;

    if (reduceMotion) {
      roleNode.textContent = roles[0];
      typingTimer = setInterval(() => { r = (r + 1) % roles.length; roleNode.textContent = roles[r]; }, 3000);
      return;
    }

    const tick = () => {
      const word = roles[r];
      i += deleting ? -1 : 1;
      roleNode.textContent = word.slice(0, i);
      let wait = deleting ? 35 : 70;
      if (!deleting && i === word.length) { deleting = true; wait = 1600; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; wait = 350; }
      typingTimer = setTimeout(tick, wait);
    };
    roleNode.textContent = '';
    tick();
  }

  /* ------------------------------------------------------------------ */
  /* Nav glider + scroll-spy                                             */
  /* ------------------------------------------------------------------ */
  const navLinks = $$('.pill-nav a');
  const glider = $('.nav-glider');

  function setActive(id) {
    navLinks.forEach((a) => {
      const on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    moveGlider();
  }

  function moveGlider() {
    const active = $('.pill-nav a.is-active');
    if (!active) { glider.style.width = '0px'; return; }
    glider.style.left = active.offsetLeft + 'px';
    glider.style.width = active.offsetWidth + 'px';
  }

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      if (id === 'home') { navLinks.forEach((a) => { a.classList.remove('is-active'); a.removeAttribute('aria-current'); }); moveGlider(); }
      else setActive(id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main > section').forEach((s) => spy.observe(s));
  window.addEventListener('resize', moveGlider);

  /* ------------------------------------------------------------------ */
  /* Certificates carousel                                               */
  /* ------------------------------------------------------------------ */
  const stage = $('#cf-stage');
  const dotsNode = $('#cert-dots');
  const progress = $('#cf-progress');
  const pauseBtn = $('#cf-pause');
  const AUTO_MS = 5000;
  let certCards = [];
  let autoTimer = null;
  let autoPaused = reduceMotion;   // the viewer's own pause
  let holding = false;              // pointer over or focus inside the carousel
  let justSwiped = false;

  // One card per certificate; they sit in the same grid cell and slide
  // between positions -2 (hidden) … -1 (left) … 0 (centre) … 1 … 2.
  function buildCerts() {
    certCards = CERTS.map((c, i) => el('article', {
      class: 'cf-card',
      onclick: () => {
        if (justSwiped) return;
        if (i === state.cert) { openLightbox(i); return; }
        goCert(i);
      }
    }, [
      el('div', { class: 'cert-media' }, [
        el('img', { src: 'images/certs/' + c.img + '.jpg', alt: pick(c.name), loading: i < 3 ? 'eager' : 'lazy', decoding: 'async', draggable: 'false' }),
        el('span', { class: 'zoom-hint', 'aria-hidden': 'true' }, svgIcon('M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14M20 20l-4.2-4.2M11 8v6M8 11h6', 18))
      ]),
      el('div', { class: 'cert-row cert-name', text: pick(c.name) }),
      el('div', { class: 'cert-row cert-text', text: pick(c.text) }),
      el('div', { class: 'cert-row cert-date', text: pick(c.date) })
    ]));
    stage.replaceChildren(...certCards);
    positionCerts();
  }

  function positionCerts() {
    const n = CERTS.length;
    certCards.forEach((card, i) => {
      let d = i - state.cert;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;
      const pos = Math.max(-2, Math.min(2, d));
      card.dataset.pos = String(pos);
      if (pos === 0) { card.removeAttribute('aria-hidden'); card.setAttribute('aria-current', 'true'); }
      else { card.setAttribute('aria-hidden', 'true'); card.removeAttribute('aria-current'); }
    });

    $('#cert-counter').textContent = (state.cert + 1) + ' / ' + n;
    dotsNode.replaceChildren(...CERTS.map((c, i) => el('button', {
      type: 'button',
      'aria-label': t('certN') + ' ' + (i + 1),
      'aria-current': String(i === state.cert),
      onclick: () => goCert(i)
    }, el('span'))));
  }

  function goCert(i) {
    const n = CERTS.length;
    state.cert = ((i % n) + n) % n;
    positionCerts();
    scheduleAuto();
  }

  // Autoplay: advances every 5s, waits while the viewer is hovering,
  // focused inside, has paused it, or the tab is hidden.
  function scheduleAuto() {
    clearTimeout(autoTimer);
    progress.classList.remove('is-running');
    const off = autoPaused || holding || document.hidden;
    progress.hidden = autoPaused;
    if (off) return;
    void progress.offsetWidth;
    progress.classList.add('is-running');
    autoTimer = setTimeout(() => goCert(state.cert + 1), AUTO_MS);
  }

  function syncPauseBtn() {
    pauseBtn.setAttribute('aria-pressed', String(autoPaused));
    pauseBtn.setAttribute('aria-label', t(autoPaused ? 'playAuto' : 'pauseAuto'));
  }

  function renderCert() {
    buildCerts();
    syncPauseBtn();
    scheduleAuto();
  }

  $('#cert-prev').addEventListener('click', () => goCert(state.cert - 1));
  $('#cert-next').addEventListener('click', () => goCert(state.cert + 1));
  pauseBtn.addEventListener('click', () => { autoPaused = !autoPaused; syncPauseBtn(); scheduleAuto(); });

  const carousel = $('.carousel');
  carousel.addEventListener('mouseenter', () => { holding = true; scheduleAuto(); });
  carousel.addEventListener('mouseleave', () => { holding = false; scheduleAuto(); });
  carousel.addEventListener('focusin', () => { holding = true; scheduleAuto(); });
  carousel.addEventListener('focusout', (e) => { if (!carousel.contains(e.relatedTarget)) { holding = false; scheduleAuto(); } });
  document.addEventListener('visibilitychange', scheduleAuto);

  stage.addEventListener('keydown', (e) => {
    const fwd = document.documentElement.dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const back = document.documentElement.dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === fwd) { goCert(state.cert + 1); e.preventDefault(); }
    if (e.key === back) { goCert(state.cert - 1); e.preventDefault(); }
  });

  let swipeX = null;
  stage.addEventListener('pointerdown', (e) => { swipeX = e.clientX; justSwiped = false; });
  stage.addEventListener('pointerup', (e) => {
    if (swipeX === null) return;
    const dx = e.clientX - swipeX;
    swipeX = null;
    if (Math.abs(dx) < 40) return;
    justSwiped = true;
    setTimeout(() => { justSwiped = false; }, 50);
    const rtl = document.documentElement.dir === 'rtl';
    goCert(state.cert + ((dx < 0) !== rtl ? 1 : -1));
  });

  /* ------------------------------------------------------------------ */
  /* Experiences                                                         */
  /* ------------------------------------------------------------------ */
  const expGrid = $('#exp-grid');
  const expLine = $('#exp-line');
  const expTags = $('#exp-tags');
  const expLinks = $('#exp-links');
  const tabsNode = $('#exp-tabs');
  const list = () => (state.tab === 'projects' ? PROJECTS : WORK);

  // Hover/focus previews a card; a click pins it so hovering others no longer changes it.
  // Clicking the pinned card again unpins it.
  function syncExpCards() {
    $$('.exp-card', expGrid).forEach((c, idx) => {
      c.classList.toggle('is-active', idx === state.exp);
      c.setAttribute('aria-pressed', String(idx === state.pinned));
    });
  }

  function setExp(i) {
    if (state.exp === i) return;
    state.exp = i;
    syncExpCards();
    renderExpCaption(true);
  }

  function previewExp(i) {
    if (state.pinned === null) setExp(i);
  }

  function togglePin(i) {
    state.pinned = state.pinned === i ? null : i;
    setExp(i);
    syncExpCards();
  }

  function renderExpCaption(animate) {
    const e = list()[state.exp];
    expLine.textContent = pick(e.line);
    expTags.replaceChildren(...e.tags.map((tag) => el('span', { class: 'tag', text: tag })));
    const links = [];
    if (e.live) links.push(el('a', { class: 'exp-link is-primary', href: e.live, target: '_blank', rel: 'noopener', text: t('live') }));
    if (e.code) links.push(el('a', { class: 'exp-link', href: e.code, target: '_blank', rel: 'noopener', text: t('code') }));
    expLinks.replaceChildren(...links);
    if (animate) { replay(expLine, 'swap-in'); replay(expLinks, 'swap-in'); }
  }

  function cover(e) {
    if (e.img) return el('div', { class: 'exp-media has-img' }, el('img', { src: e.img, alt: '', loading: 'lazy' }));
    const media = el('div', { class: 'exp-media cover', 'aria-hidden': 'true' }, [
      el('span', { class: 'cover-title', text: pick(e.title) }),
      el('span', { class: 'cover-sub', dir: 'ltr', text: e.live ? e.live.replace('https://', '').replace(/\/$/, '') : pick(e.meta).split('·')[0].trim() })
    ]);
    media.style.setProperty('--tint', e.tint);
    return media;
  }

  function renderTabs() {
    tabsNode.replaceChildren(...[['projects', t('tabProjects'), PROJECTS.length], ['work', t('tabWork'), WORK.length]].map(([id, label, n]) => el('button', {
      type: 'button',
      'aria-pressed': String(state.tab === id),
      onclick: () => {
        if (state.tab === id) return;
        state.tab = id; state.exp = 0; state.pinned = null;
        renderExperiences(true);
      }
    }, [document.createTextNode(label + ' '), el('span', { class: 'tab-count', text: String(n) })])));
  }

  function renderExperiences(animate) {
    renderTabs();
    expGrid.dataset.tab = state.tab;
    expGrid.replaceChildren(...list().map((e, i) => el('button', {
      type: 'button',
      class: 'exp-card' + (i === state.exp ? ' is-active' : ''),
      'aria-pressed': String(i === state.pinned),
      onclick: () => togglePin(i),
      onmouseenter: () => previewExp(i),
      onfocus: () => previewExp(i)
    }, [
      el('span', { class: 'pin-badge', 'aria-hidden': 'true', text: t('pinned') }),
      cover(e),
      el('div', { class: 'exp-body' }, [
        el('span', { class: 'exp-title', text: pick(e.title) }),
        el('span', { class: 'exp-meta', text: pick(e.meta) })
      ])
    ])));
    renderExpCaption(!!animate);
    if (animate) replay(expGrid, 'swap-in');
  }

  /* ------------------------------------------------------------------ */
  /* Skills                                                              */
  /* ------------------------------------------------------------------ */
  const field = $('#skills-field');
  const panel = $('#skill-panel');
  const filtersNode = $('#skill-filters');

  function renderSkills() {
    filtersNode.replaceChildren(...['all', 'fe', 'be', 'it', 'pl'].map((id) => el('button', {
      type: 'button',
      'aria-pressed': String(state.filter === id),
      text: t(id),
      onclick: () => { state.filter = id; renderSkills(); }
    })));

    field.replaceChildren(...SKILLS.map((s, i) => {
      const match = state.filter === 'all' || state.filter === s.cat;
      const b = el('button', {
        type: 'button',
        class: 'skill' + (match ? '' : ' is-dim'),
        'aria-pressed': String(state.skill === i),
        text: pick(s.name),
        onclick: () => { state.skill = i; renderSkills(); }
      });
      b.style.setProperty('--size', s.size + 'px');
      b.style.setProperty('--delay', (-i * 0.6) + 's');
      b.style.setProperty('--dur', (2.8 + (i % 4) * 0.45) + 's');
      return b;
    }));

    if (state.skill === null) {
      panel.replaceChildren(el('div', { class: 'skill-empty' }, [
        svgIcon('M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16M9.5 7.5a2 2 0 1 0 0 4a2 2 0 1 0 0-4', 40),
        el('p', { text: t('pickSkill'), style: 'margin:0' })
      ]));
      return;
    }
    const s = SKILLS[state.skill];
    const inner = el('div', { style: 'display:flex;flex-direction:column;gap:12px' }, [
      el('span', { class: 'skill-cat', text: t(s.cat) }),
      el('h3', { class: 'skill-name', text: pick(s.name) }),
      el('span', { class: 'skill-used-label', text: t('usedIn') }),
      el('ul', { class: 'skill-used' }, s.used.map((u) => el('li', { text: pick(u) })))
    ]);
    panel.replaceChildren(inner);
    replay(inner, 'swap-in');
  }

  function svgIcon(d, size) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', size); svg.setAttribute('height', size);
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '1.6');
    svg.setAttribute('aria-hidden', 'true');
    const p = document.createElementNS(ns, 'path');
    p.setAttribute('d', d);
    svg.append(p);
    return svg;
  }

  /* ------------------------------------------------------------------ */
  /* Certificate lightbox                                                */
  /* ------------------------------------------------------------------ */
  const lightbox = $('#lightbox');
  function openLightbox(i) {
    const c = CERTS[i];
    const img = $('#lightbox-img');
    img.src = 'images/certs/' + c.img + '.jpg';
    img.alt = pick(c.name);
    $('#lightbox-title').textContent = pick(c.name);
    $('#lightbox-meta').textContent = pick(c.text) + ' · ' + pick(c.date);
    holding = true; scheduleAuto();
    if (typeof lightbox.showModal === 'function') lightbox.showModal(); else lightbox.setAttribute('open', '');
  }
  function closeLightbox() {
    if (typeof lightbox.close === 'function') lightbox.close(); else lightbox.removeAttribute('open');
  }
  lightbox.addEventListener('close', () => { holding = false; scheduleAuto(); });
  $('#lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  /* ------------------------------------------------------------------ */
  /* Copy email                                                          */
  /* ------------------------------------------------------------------ */
  const toast = $('#toast');
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  $('#copy-email').addEventListener('click', () => {
    const address = $('#email-value').textContent.trim();
    const selectIt = () => {
      const range = document.createRange();
      range.selectNodeContents($('#email-value'));
      const sel = window.getSelection();
      sel.removeAllRanges(); sel.addRange(range);
      showToast(t('copyFail'));
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(() => showToast(t('copied')), selectIt);
    } else selectIt();
  });

  /* ------------------------------------------------------------------ */
  /* Bubble background                                                   */
  /* ------------------------------------------------------------------ */
  const canvas = $('#bubbles');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1;
  const pointer = { x: -9999, y: -9999 };
  let blobs = [], bubbles = [];

  function rand(a, b) { return a + Math.random() * (b - a); }

  function seed() {
    const area = W * H;
    blobs = Array.from({ length: 6 }, (_, i) => ({
      x: rand(0, W), y: rand(0, H), r: rand(Math.min(W, H) * 0.25, Math.min(W, H) * 0.5),
      dark: i % 2 === 0, phase: rand(0, Math.PI * 2), speed: rand(0.00004, 0.00009)
    }));
    const count = Math.round(Math.min(70, Math.max(22, area / 26000)));
    bubbles = Array.from({ length: count }, () => newBubble(true));
  }

  function newBubble(anywhere) {
    const r = Math.random() < 0.15 ? rand(18, 34) : rand(3, 14);
    return {
      x: rand(0, W), y: anywhere ? rand(0, H) : H + r + rand(0, 80), r,
      vy: rand(0.1, 0.32) * (r > 16 ? 0.6 : 1),
      wobble: rand(0, Math.PI * 2), wobbleSpeed: rand(0.004, 0.01), wobbleAmp: rand(0.2, 0.6),
      pushX: 0, pushY: 0
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    if (reduceMotion) draw(0);
  }

  function drawBlob(b, time) {
    const x = b.x + Math.cos(time * b.speed + b.phase) * 80;
    const y = b.y + Math.sin(time * b.speed * 1.3 + b.phase) * 60;
    const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
    if (b.dark) { g.addColorStop(0, 'rgba(110, 40, 106, 0.55)'); g.addColorStop(1, 'rgba(110, 40, 106, 0)'); }
    else { g.addColorStop(0, 'rgba(255, 235, 252, 0.22)'); g.addColorStop(1, 'rgba(255, 235, 252, 0)'); }
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, b.r, 0, Math.PI * 2); ctx.fill();
  }

  function drawBubble(p) {
    const g = ctx.createRadialGradient(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.1, p.x, p.y, p.r);
    g.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
    g.addColorStop(0.45, 'rgba(255, 255, 255, 0.10)');
    g.addColorStop(1, 'rgba(255, 255, 255, 0.04)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = p.r > 16 ? 1.4 : 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.stroke();
  }

  function step(p) {
    p.wobble += p.wobbleSpeed;
    p.y -= p.vy;
    p.x += Math.sin(p.wobble) * p.wobbleAmp;

    const dx = p.x - pointer.x, dy = p.y - pointer.y;
    const dist = Math.hypot(dx, dy);
    const reach = 140;
    if (dist < reach && dist > 0.1) {
      const f = (1 - dist / reach) * 2.4;
      p.pushX += (dx / dist) * f; p.pushY += (dy / dist) * f;
    }
    p.x += p.pushX; p.y += p.pushY;
    p.pushX *= 0.9; p.pushY *= 0.9;

    if (p.y < -p.r - 10 || p.x < -60 || p.x > W + 60) Object.assign(p, newBubble(false));
  }

  function draw(time) {
    ctx.clearRect(0, 0, W, H);
    blobs.forEach((b) => drawBlob(b, time));
    bubbles.forEach(drawBubble);
  }

  let running = true;
  function loop(time) {
    if (!running) return;
    bubbles.forEach(step);
    draw(time);
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
  window.addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });
  document.addEventListener('visibilitychange', () => {
    if (reduceMotion) return;
    running = !document.hidden;
    if (running) requestAnimationFrame(loop);
  });

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  resize();
  applyLang();
  if (!reduceMotion) requestAnimationFrame(loop);
})();
