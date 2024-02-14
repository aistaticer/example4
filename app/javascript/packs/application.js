import "@hotwired/turbo-rails"
import 'bootstrap'
import '../stylesheets/application'

console.log("qqqaaapp");

document.addEventListener("turbolinks:load", function() {
  let processNumber = 3; // すでに3つの手順があるため、次の番号から開始
  document.getElementById('add_step').addEventListener('click', function(e) {
    e.preventDefault();
    processNumber += 1;
    let newStepForm = `<div class="fields">
      <input type="hidden" name="recipe[steps_attributes][][number]" value="${processNumber}" />
      <textarea name="recipe[steps_attributes][][description]" placeholder="ここにテキストを入力してください" class="form-control"></textarea>
    </div>`;
    document.querySelector('.steps_form').insertAdjacentHTML('beforeend', newStepForm);
  });
});

document.addEventListener("turbolinks:load", function() {
  const button = document.getElementById('change-text-button');
  if (button) {
    button.addEventListener('click', function() {
      document.getElementById('text-to-change').textContent = 'テキストが変わったよ！';
    });
  }
});