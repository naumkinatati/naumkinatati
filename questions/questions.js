(() => {
  'use strict';
  const form = document.querySelector('#question-form');
  const question = document.querySelector('#question');
  const counter = document.querySelector('#question-counter');
  const error = document.querySelector('#form-error');
  const button = form.querySelector('button[type="submit"]');
  let submitted = false;
  question.addEventListener('input', () => {
    counter.textContent = `${question.value.length} / 3000`;
    question.setCustomValidity('');
    error.hidden = true;
  });
  form.addEventListener('submit', (event) => {
    if (question.value.trim().length === 0) {
      event.preventDefault();
      question.setCustomValidity('Напишите ваш вопрос.');
      question.reportValidity();
      return;
    }
    if (!form.dataset.endpoint) {
      event.preventDefault();
      error.textContent = 'Это предварительный просмотр. Доставка на почту ещё не подключена — вопрос не отправлен.';
      error.hidden = false;
      return;
    }
    if (submitted) {
      event.preventDefault();
      return;
    }
    form.action = form.dataset.endpoint;
    submitted = true;
    button.disabled = true;
    button.querySelector('span').textContent = 'Отправляем…';
  });
  window.addEventListener('pageshow', () => {
    submitted = false;
    button.disabled = false;
    button.querySelector('span').textContent = 'Отправить вопрос';
    counter.textContent = `${question.value.length} / 3000`;
  });
})();
