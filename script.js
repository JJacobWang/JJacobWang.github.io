const buttons = document.querySelectorAll('[data-lang]');
const themeToggle = document.getElementById('theme-toggle');
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const zh = document.documentElement.lang === 'zh-CN';
  themeToggle.textContent = dark ? '☀' : '☾';
  themeToggle.setAttribute('aria-pressed', String(dark));
  const label = zh ? (dark ? '切换至亮色模式' : '切换至暗色模式') : (dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
}
function setLanguage(lang) {
  const chosen = lang === 'zh' ? 'zh' : 'en';
  document.documentElement.lang = chosen === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-en][data-zh]').forEach(el => { el.textContent = el.dataset[chosen]; });
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === chosen)));
  document.title = chosen === 'zh' ? '王金峰 | 医疗人工智能研究' : 'Jinfeng Wang | Medical AI Research';
  updateThemeLabel();
  try { localStorage.setItem('preferred-language-v2', chosen); } catch (_) {}
}
function setTheme(theme) {
  document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  updateThemeLabel();
  try { localStorage.setItem('preferred-theme', document.documentElement.dataset.theme); } catch (_) {}
}
buttons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
themeToggle.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
let preference = 'en';
let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
try { preference = localStorage.getItem('preferred-language-v2') || 'en'; theme = localStorage.getItem('preferred-theme') || theme; } catch (_) {}
setTheme(theme);
setLanguage(preference);
