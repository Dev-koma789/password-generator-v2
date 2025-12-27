"use strict";

// グローバル汚染を防ぐためのブロックスコープ
{
  // ===== DOM要素の取得 =====
  // パスワード表示用の要素
  const result = document.getElementById("result");

  // 数字を含めるかどうかのチェックボックス
  const numbersCheckbox = document.getElementById("numbers-checkbox");

  // 記号を含めるかどうかのチェックボックス
  const symbolsCheckbox = document.getElementById("symbols-checkbox");

  // 現在のパスワード長を表示する要素
  const passwordLength = document.getElementById("password-length");

  // パスワードの長さを決めるスライダー
  const slider = document.getElementById("slider");

  // パスワード生成ボタン
  const btn = document.getElementById("btn");

  // ===== 使用する文字セット（定数） =====
  // 英小文字
  const letters = "abcdefghijklmnopqrstuvwxyz";

  // 数字
  const numbers = "0123456789";

  // 記号
  const symbols = "!#$%&()";

  function showPassword() {
    // 最終的なパスワード配列
    let passwordChars = [];

    // 必ず使う英字（小文字＋大文字）
    // seed は抽選候補の一覧 (チェックされたら「数字」＋「記号」が追加される)
    let seed = letters + letters.toUpperCase();

    // 数字がONなら、最低1文字入れる
    if (numbersCheckbox.checked) {
      // 1文字だけランダムな数字を追加
      passwordChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
      // "0123456789" を追加する
      seed += numbers;
    }

    // 記号がONなら、最低1文字入れる
    if (symbolsCheckbox.checked) {
      // 1文字だけランダムな記号を追加
      passwordChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
      // "!#$%&()" を追加する
      seed += symbols;
    }

    // 何文字生成するかのスライダー情報
    const generateLength = Number(slider.value);

    // 残りの文字数分をランダムで埋める
    // passwordChars.length (0～2のいずれかが入る)
    while (passwordChars.length < generateLength) {
      passwordChars.push(seed[Math.floor(Math.random() * seed.length)]);
    }

    // シャッフル（順番をランダムに）
    // 一番最後の文字からシャッフル開始
    for (let i = passwordChars.length - 1; i > 0; i--) {
      // 現在の位置も含めたランダムな位置を取得
      const j = Math.floor(Math.random() * (i + 1));
      // 8番目→7番目→6番目・・・と順番にランダムな位置の値を入れていく
      // i 番目に j 番目の値を、j 番目に i 番目の値を入れる
      [passwordChars[i], passwordChars[j]] = [
        passwordChars[j],
        passwordChars[i],
      ];
    }

    // 配列 → 文字列
    result.textContent = passwordChars.join("");
  }

  // ===== スライダー操作時の処理 =====
  // スライダーを動かしたら、現在の数値を表示する
  slider.addEventListener("input", () => {
    passwordLength.textContent = slider.value;
  });

  // ===== ボタンを押したときの処理 =====
  // クリックされたらパスワードを再生成
  btn.addEventListener("click", () => {
    showPassword();
  });

  // ===== 初期表示 =====
  // ページ読み込み時に最初のパスワードを生成
  showPassword();
}
