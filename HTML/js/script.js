document.addEventListener("DOMContentLoaded", function () {
    const cake = document.getElementById("birthday-cake");
    const codePage = document.getElementById("code-page");
    const wishesPage = document.getElementById("birthday-wishes");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit-answer");

    // Hiển thị bánh sinh nhật
    cake.classList.remove("hidden");
    cake.classList.add("fade-in");

    // Sau 5 giây, tắt nến và chuyển trang
    setTimeout(() => {
        const candles = document.querySelectorAll(".candle");
        candles.forEach(candle => {
            candle.classList.add("fade-out");
        });

        cake.classList.add("fade-out");
        setTimeout(() => {
            cake.classList.add("hidden");
            cake.classList.remove("fade-in", "fade-out");

            codePage.classList.remove("hidden");
            codePage.classList.add("fade-in");
        }, 1200);
    }, 3000);

    // Kiểm tra đáp án
    // Cho phép nhấn Enter để gửi
    function checkAnswer() {
        const correctAnswer = "HPBD XUÂN";
        if (answerInput.value.trim().toUpperCase() === correctAnswer) {
            Swal.fire({
                title: '🎉 Chính xác!',
                html: `
                    <p>Chuẩn bị nhận quà nè!</p>
                    <div style="margin-top: 15px; font-size: 24px; font-weight: bold; color: #388e3c; background: #e8f5e9; padding: 10px 20px; border-radius: 12px; display: inline-block; box-shadow: 0 0 8px rgba(0,0,0,0.15);">
                        HAPPY BIRTHDAY XUÂN ❤️
                    </div>
                `,
                icon: 'success',
                showConfirmButton: false,
                timer: 4000,
                background: '#e0f7fa',
                color: '#00695c',
                timerProgressBar: true
            });
    
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 }
                });
            }, 500);
    
            setTimeout(() => {
                codePage.classList.add("fade-out");
                setTimeout(() => {
                    codePage.classList.add("hidden");
                    wishesPage.classList.remove("hidden");
                    wishesPage.classList.add("fade-in");
                }, 600);
            }, 4000);
        } else {
            Swal.fire({
                title: 'Nuh-uh~ 😢',
                html: `
                    <p>Thử dấu cách và viết dấu xem? Nhớ CAPSLOCK nha!</p>
                    <img src="https://media.giphy.com/media/10dU7AN7xsi1I4/giphy.gif" alt="sad cat" style="width: 100%; max-width: 250px; margin-top: 12px; border-radius: 8px;" />
                `,
                icon: 'error',
                confirmButtonText: 'OK nè 💪',
                background: '#fff0f6',
                color: '#d81b60',
                confirmButtonColor: '#f06292',
                customClass: {
                    popup: 'rounded-popup'
                }
            });
        }
    }
    submitButton.addEventListener("click", checkAnswer);

    answerInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });
        
    // --- Slideshow logic ---
    const slideImages = [
        "Image/Chúc/IMG_20250423_000927.jpg",
        "Image/Chúc/IMG_20250423_234710.jpg",
        "Image/Chúc/IMG_1745395066610_1745425491431.jpg",
        "Image/Chúc/Messenger_creation_D11AC6BE-B767-452F-A99E-BB1490AC7135.jpg",
        "Image/Chúc/Messenger_creation_FCA61D2E-91B2-4F3E-8418-41CD079FA9D0.jpg",
        "Image/Chúc/Thiệp chúc mừng sinh nhật Xuân.png",
        "Image/Chúc/CMSN_Xuan.png"
    ];

    let currentSlide = 0;

    function updateSlide() {
        document.getElementById("slide-image").src = slideImages[currentSlide];
    }

    document.getElementById("next-btn").addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slideImages.length;
        updateSlide();
    });

    document.getElementById("prev-btn").addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slideImages.length) % slideImages.length;
        updateSlide();
    });

    document.getElementById("download-btn").addEventListener("click", function () {
        const downloadLink = document.createElement('a');
        downloadLink.href = document.getElementById("slide-image").src;
        downloadLink.download = "image.jpg";
        downloadLink.click();
    });

    updateSlide(); // Cập nhật slide ban đầu
});
