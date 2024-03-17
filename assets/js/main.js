const aside = document.createElement('aside');
document.body.prepend(aside)
const ol = document.createElement('ol');
aside.appendChild(ol);

document.querySelectorAll('[id]').forEach(x => {
  if (['H2', 'H3'].includes(x.tagName)) {
    const li = document.createElement('li');
    ol.appendChild(li);
    const a = document.createElement('a');
    li.appendChild(a)
    a.href = `#${x.id}`;
    if (x.tagName === 'H3')
      a.textContent = x.textContent;
    else {
      const strong = document.createElement('strong');
      a.append(strong)
      strong.textContent = x.textContent;
    }
  }
})