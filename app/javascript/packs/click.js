import jquery from "jquery"
window.$ = jquery

// ボタンをクリックしたらステップを増やす
function addformEventListener() {
  const addButton = document.getElementById('add-element');
  const form = document.querySelector('form[action^="/recipes"]');

  if (form !== null) {
    console.log("aaaaaaaaaa");

    form.addEventListener('click', function(e) {

      if (e.target && e.target.id === 'add-element') {
        // 既存のステップの数を動的に取得
        const existingTextareas = form.querySelectorAll('textarea.form-control').length;
        const stepsCount = existingTextareas;

        // bg-primary text-whiteのクラスを持つdivを作成
        const primaryDiv = document.createElement('div');
        primaryDiv.className = 'bg-primary text-white';
        primaryDiv.textContent = stepsCount + 1;

        // 新しいrow_marginクラスを持つdivを作成
        const marginDiv = document.createElement('div');
        marginDiv.className = 'row_margin';

        // 新しいhidden input要素を作成
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', `recipe[steps_attributes][${stepsCount}][number]`);
        hiddenInput.setAttribute('value', stepsCount + 1);

        // 新しいtextarea要素を作成
        const textarea = document.createElement('textarea');
        textarea.placeholder = 'ここにテキストを入力してください';
        textarea.className = 'form-control';
        textarea.name = `recipe[steps_attributes][${stepsCount}][description]`;
        textarea.id = `recipe_steps_attributes_${stepsCount}_description`;

        // marginDivにtextareaを追加
        marginDiv.appendChild(textarea);

        // form要素にprimaryDivとmarginDivとhiddenInputを追加
        form.appendChild(primaryDiv);
        form.appendChild(marginDiv);
        form.appendChild(hiddenInput);

        // addButtonの親要素を取得
        const parentElement = addButton.parentNode;
        // primaryDivをaddButtonの直前に挿入
        parentElement.insertBefore(primaryDiv, addButton);
        // marginDivをprimaryDivの直前に挿入（つまり、addButtonの直前にもなる）
        parentElement.insertBefore(marginDiv, addButton);

        // 新しいtextareaにフォーカスを当てる
        textarea.focus();
        marginDiv.scrollIntoView();
      }
    });
  }
}

function toggleAccordionPanel() {
  var panel = this.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
    // アコーディオンが閉じたら、状態を削除
    localStorage.removeItem('accordionOpened');
  } else {
    panel.style.display = "block";
    // アコーディオンが開かれたら、その状態を保存
    localStorage.setItem('accordionOpened', 'true');
  }
}

function setupAccordion() {
  if (window.location.pathname === '/recipes') {
    var accordion = document.querySelector('.accordion');
    if (!accordion.classList.contains('js-accordion-initialized')) {
      accordion.addEventListener('click', toggleAccordionPanel);
      accordion.classList.add('js-accordion-initialized');

      // ページ読み込み時にアコーディオンの状態を復元
      if (localStorage.getItem('accordionOpened') === 'true') {
        accordion.nextElementSibling.style.display = "block";
      }
    }
  }
}

/*function setupReplyButton() {
  // ボタンにイベントリスナーを設定
  var buttons = document.querySelectorAll('.reply-button'); // クラス名で全ての返信ボタンを選択
  var as = document.querySelectorAll('.a');

  as.forEach(function(a) {
    console.log(a.id);
  });

  buttons.forEach(function(button) {
    button = buttonContainer.querySelector('button');
    console.log(button.id);
    button.addEventListener('click', function() {
      
      // ここでcomment_replyを呼び出す
      var commentId = this.getAttribute('data-comment-id');
      comment_reply(commentId);
    });
  });
}*/

function setupReplyButton() {
  // ボタンにイベントリスナーを設定
  var buttons = document.querySelectorAll('.reply-button'); // クラス名で全ての返信ボタンを選択


  buttons.forEach(function(buttonContainer) {
    var button = buttonContainer.querySelector('button');
    button.addEventListener('click', function() {
      var commentId = this.getAttribute('data-comment-id');
      comment_reply(commentId);
    });
  });
}

function comment_reply(commentId) {
  // フォームの表示状態を変更
  
  var form = document.getElementById('comment-reply-form' + commentId);
  console.log(commentId);
  if (form.style.display === "none") {
    form.style.display = 'block';
  }else{
    form.style.display = 'none';
  }

  // コメントIDに基づいてparent_idの値を設定
  document.getElementById('parent_id').value = commentId;
}

// Turboのイベントに対してsetupReplyButtonを呼び出す
document.addEventListener("turbo:load", setupReplyButton);
//document.addEventListener("turbo:render", setupReplyButton);

// クリックするとコメントの削除、編集ボタンが出てくる

function settingcommentButton() {
  // ボタンにイベントリスナーを設定
  var settings = document.querySelectorAll('.setting-button'); // クラス名で全ての返信ボタンを選択


  settings.forEach(function(settingContainer) {
    var setting = settingContainer.querySelector('setting');
    setting.addEventListener('click', function() {
      var commentId = this.getAttribute('data-comment-id');
      comment_reply(commentId);
    });
  });
}

document.addEventListener("turbo:load", settingcommentButton);

// クリックすると /recipes にアクセスしてくれる　jQeryを使って練習で作った
/*document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('your-button-id').addEventListener('click', function() {
    $.ajax({
      url: "/recipes", // indexアクションのパス
      dataType: "script" // JavaScriptレスポンスを期待する
    });
  });
});*/

document.addEventListener("turbo:load", setupAccordion);
document.addEventListener("turbo:render", setupAccordion);

document.addEventListener("turbo:load", addformEventListener);
document.addEventListener("turbo:render", addformEventListener);