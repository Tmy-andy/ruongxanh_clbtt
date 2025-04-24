document.addEventListener("DOMContentLoaded", () => {
    // Element references
    const cake = document.getElementById("birthday-cake");
    const codePage = document.getElementById("code-page");
    const wishesPage = document.getElementById("birthday-wishes");
    const textWishes = document.getElementById("text-wishes");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit-answer");
    const goToTextBtn = document.getElementById("go-to-text-wishes");
    const specialGift = document.getElementById("special-gift");
    const profileContainer = document.querySelector(".profile-container");
    const profileImg = document.getElementById("profile-img");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");
  
    // Helpers
    function fadeIn(el) {
      el?.classList.remove("hidden");
      el?.classList.add("fade-in");
      el?.classList.remove("fade-out");
    }
    function fadeOut(el, cb) {
      el?.classList.add("fade-out");
      el?.classList.remove("fade-in");
      setTimeout(() => {
        el?.classList.add("hidden");
        cb && cb();
      }, 600);
    }
  
    // 1) Cake → Code
    function showCakeThenCode() {
      fadeIn(cake);
      setTimeout(() => {
        document.querySelectorAll(".candle").forEach(c => fadeOut(c));
        fadeOut(cake, () => fadeIn(codePage));
      }, 3000);
    }
  
    // 2) Check mã → Birthday Wishes
    function checkAnswer() {
      const correct = "HPBD XUÂN";
      if (answerInput.value.trim().toUpperCase() === correct) {
        Swal.fire({
          title: '🎉 Chính xác!',
          html: `<p>Chuẩn bị nhận quà nè!</p>
                 <div style="margin-top:15px;font-size:24px;
                             font-weight:bold;color:#388e3c;
                             background:#e8f5e9;padding:10px 20px;
                             border-radius:12px;box-shadow:0 0 8px rgba(0,0,0,0.15);"> HAPPY BIRTHDAY XUÂN ❤️
                 </div>`,
          icon: 'success',
          showConfirmButton: false,
          timer: 4000,
          background: '#e0f7fa',
          color: '#00695c',
          timerProgressBar: true
        });
        setTimeout(() => confetti({ particleCount:150, spread:80, origin:{ y:0.6 } }), 500);
        setTimeout(() => fadeOut(codePage, () => fadeIn(wishesPage)), 4000);
      } else {
        Swal.fire({
          title: 'Nuh-uh~ Sai rồi😢',
          html: `<p>Tip: Thử dấu cách và viết dấu xem? Nhớ CAPSLOCK nha!</p>
                 <img src="https://media.giphy.com/media/10dU7AN7xsi1I4/giphy.gif"
                      alt="sad cat" style="width:100%;max-width:250px;
                      margin-top:12px;border-radius:8px;"/>`,
          icon: 'error',
          confirmButtonText: 'OK nè 💪',
          background: '#fff0f6',
          color: '#d81b60',
          confirmButtonColor: '#f06292',
          customClass: { popup: 'rounded-popup' }
        });
      }
    }
        
    // 3) Slideshow trong Birthday Wishes
    function initSlideshow() {
        const images = [
        "Image/Chúc/IMG_20250423_000927.jpg",
        "Image/Chúc/IMG_20250423_234710.jpg",
        "Image/Chúc/IMG_1745395066610_1745425491431.jpg",
        "Image/Chúc/Messenger_creation_D11AC6BE-B767-452F-A99E-BB1490AC7135.jpg",
        "Image/Chúc/Messenger_creation_FCA61D2E-91B2-4F3E-8418-41CD079FA9D0.jpg",
        "Image/Chúc/Thiệp chúc mừng sinh nhật Xuân.png",
        "Image/Chúc/CMSN_Xuan.png",
        "Image/Chúc/99dbacac-d19b-4870-ba34-3bb10ad8add0.jpg"
    ];

    let idx = 0;
      const imgEl = document.getElementById("slide-image");
      document.getElementById("next-btn")?.addEventListener("click", () => {
        idx = (idx+1) % images.length; imgEl.src = images[idx];
      });
      document.getElementById("prev-btn")?.addEventListener("click", () => {
        idx = (idx-1 + images.length) % images.length; imgEl.src = images[idx];
      });
      document.getElementById("download-btn")?.addEventListener("click", () => {
        const a = document.createElement("a");
        a.href = imgEl.src; a.download = "image.jpg"; a.click();
      });
    }
  
    // 4) Activate Text Wishes → Special Gift & Popup
    function activateGiftScroll() {
      // ensure hidden at start
      specialGift.classList.add("hidden");
      popup.classList.add("hidden");
      profileContainer.classList.add("hidden");
  
      textWishes.addEventListener("scroll", () => {
        if (textWishes.scrollTop + textWishes.clientHeight >= textWishes.scrollHeight - 50) {
          specialGift.classList.remove("hidden");
        }
      });
  
      specialGift.addEventListener("click", () => {
        specialGift.classList.add("hidden");
        // Ẩn luôn phần text-wishes
        fadeOut(textWishes);
        // Hiện ảnh profile
        profileContainer.classList.remove("hidden");
        document.getElementById("chest-sound")?.play();
      });
  
      profileImg.addEventListener("click", () => {
        popup.classList.remove("hidden");
      });
      closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
      });
    }
  
    // Event bindings
    submitButton?.addEventListener("click", checkAnswer);
    answerInput?.addEventListener("keydown", e => { if (e.key === "Enter") checkAnswer(); });
    goToTextBtn?.addEventListener("click", () => {
      fadeOut(wishesPage, () => fadeIn(textWishes));
      activateGiftScroll();
    });
  
    // Kick off
    showCakeThenCode();
    initSlideshow();
  });
  