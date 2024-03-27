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

function setupReplyButton() {
  // ボタンにイベントリスナーを設定
  var buttons = document.querySelectorAll('.reply-or-setting-button'); // クラス名で全ての返信ボタンを選択

  buttons.forEach(function(buttonContainer) {
    var settingbutton = buttonContainer.querySelector('.settingbutton');
    var replybutton = buttonContainer.querySelector('.replybutton');

    if (settingbutton) {
      settingbutton.addEventListener('click', function() {
        var commentId = this.getAttribute('data-comment-id');
        setting_indicate(commentId);
      });
    }

    if (replybutton) {
      replybutton.addEventListener('click', function() {
        var commentId = this.getAttribute('data-comment-id');
        comment_reply(commentId);
      });
    }
  });
}

document.addEventListener("turbo:load", setupReplyButton);

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

/*function setting_indicate(commentId) {
  var links = document.getElementById('links-' + commentId);
  console.log("setting_indicate" + commentId);

  // linksの表示・非表示を切り替え
  if (links.style.display === "none") {
    links.style.display = 'block';
  } else {
    links.style.display = 'none';
  }
}*/

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function hideLinks(e) {
    console.log(e.target.className);
  })
})

function setting_indicate(commentId) {
  var links = document.getElementById('links-' + commentId);
  console.log(links.id);

  // linksの表示・非表示を切り替え
  if (links.style.display === "none") {
    links.style.display = 'block';
    //setTimeout(function() {
      document.addEventListener('click', function hideLinks(e) {
        // クリックされた要素が目的のアイコンか、その子要素かをチェック
        let currentElement = e.target;
        while (currentElement != null) {
          // 目的のアイコンがクリックされた場合
          if (currentElement.id === 'icon-' + commentId) {
            // 必要な処理をここに記述
            break; // Whileループを抜ける
          }
          // 親要素へ移動
          currentElement = currentElement.parentElement;
        }
      
        // linksがクリックされた場所に含まれていない、かつクリックされたのがアイコンでもその子要素でもない場合
        if (!links.contains(e.target) && currentElement === null) {
          links.style.display = 'none';
          console.log(e.target.id);
          document.removeEventListener('click', hideLinks);
        }
      });
    //}, 0); // setTimeoutを使ってイベントリスナーの追加を遅らせる
  } else {
    //links.style.display = 'none';
  }
}

// クリックするとコメントの削除、編集ボタンが出てくる
function settingcommentButton() {
  // ボタンにイベントリスナーを設定
  var settings = document.querySelectorAll('.setting-button-all'); // クラス名で全ての返信ボタンを選択

  settings.forEach(function(settingContainer) {
    var setting = settingContainer.querySelector('.setting-button');
    setting.addEventListener('click', function() {
      var commentId = this.getAttribute('data-comment-id');
      setting_indicate(commentId);
    });
  });
}

//document.addEventListener("turbo:load", settingcommentButton);

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

function settingButton() {
  // ボタンにイベントリスナーを設定
  var settingbuttons = document.querySelectorAll('.setting-button'); // クラス名で全ての返信ボタンを選択


  settingbuttons.forEach(function(settingbuttonContainer) {
    var button = settingbuttonContainer.querySelector('three-point-leader');
    three-point-leader.addEventListener('click', function() {
      var commentId = this.getAttribute('data-comment-id');
      comment_reply(commentId);
    });
  });
}

/*document.addEventListener('DOMContentLoaded', function(){
  // .comment-buttonを取得
  const commentButton = document.getElementById('aaa');

  // ボタンがクリックされたときの関数
  commentButton.addEventListener('click', () => {
    // 新しいテキストノードを作成
    const newText = document.createTextNode('ここに表示したい文字');

    // 新しいdiv要素を作成してテキストを追加
    const newDiv = document.createElement('div');
    newDiv.appendChild(newText);
    // float-up-textクラスを追加
    newDiv.classList.add('float-up-text');

    // スタイルを設定
    newDiv.style.left = commentButton.offsetLeft + 'px';
    newDiv.style.top = commentButton.offsetTop + 'px';

    // 作成したdivをbodyに追加
    document.body.appendChild(newDiv);
  });
})*/

