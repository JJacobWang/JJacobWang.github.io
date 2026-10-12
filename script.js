const buttons = document.querySelectorAll('[data-lang]');
function setLanguage(lang) {
  const chosen = lang === 'zh' ? 'zh' : 'en';
  document.documentElement.lang = chosen === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-en][data-zh]').forEach(el => {el.textContent = el.dataset[chosen];});
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === chosen)));
  document.title = chosen === 'zh' ? '王金峰 | 医疗人工智能研究' : 'Jinfeng Wang | Medical AI Research';
  try { localStorage.setItem('preferred-language', chosen); } catch (_) {}
}
buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
let preference = 'en';
try { preference = localStorage.getItem('preferred-language') || 'en'; } catch (_) {}
setLanguage(preference);
