
// Toggle class menu
$(function () {
    $('.menu').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.ss-menu1').addClass('visible1');
            $('.ss-menu2').addClass('visible2');
            $('.ss-menu3').addClass('visible3');
            $('.ss-menu4').addClass('visible4');
            $('.ss-menu5').addClass('visible5');
        } else {
            $('.ss-menu1').removeClass('visible1');
            $('.ss-menu2').removeClass('visible2');
            $('.ss-menu3').removeClass('visible3');
            $('.ss-menu4').removeClass('visible4');
            $('.ss-menu5').removeClass('visible5');
        }
    })
})
$(function () {
    $('.ss-menu').on('click', function () {
      $('.menu').removeClass('active');
      $('.ss-menu1').removeClass('visible1');
      $('.ss-menu2').removeClass('visible2');
      $('.ss-menu3').removeClass('visible3');
      $('.ss-menu4').removeClass('visible4');
      $('.ss-menu5').removeClass('visible5');
    })
})
$(function () {
    $(window).on('scroll', function () {
        if ($('.menu').hasClass('active')) {
          $('.menu').removeClass('active');
          $('.ss-menu1').removeClass('visible1');
          $('.ss-menu2').removeClass('visible2');
          $('.ss-menu3').removeClass('visible3');
          $('.ss-menu4').removeClass('visible4');
          $('.ss-menu5').removeClass('visible5');
        }
    })
})

// Parallax effect and gsap
$(function () {
  if (!window.location.pathname.match("mentions")) {
    $('.rellax').css('transform', 'translateX(-50%)');
    var rellax = new Rellax('.rellax');
  }
})


// new Form
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const mathAnswer = document.getElementById('mathQuestion').value;

        // Validate math question
        if (parseInt(mathAnswer) !== 7) {
            alert("Incorrect answer to the math question. Please try again.");
            return; // Exit the function if the math answer is incorrect
        }

        // Prepare the email parameters
        const templateParams = {
            from_name: name,
            to_name: 'Balaganist', // You can customize this as needed
            message: message,
            from_email: email // Include this if your template uses it
        };

        // Send email using EmailJS
        emailjs.send('service_iygu334', 'template_7o3zivj', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert("Form submitted successfully!");

                // Clear the form fields
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert("Failed to send the email. Please try again.");
            });
    });
});

// end new form

// Manage vidéo
$(function () {
    $('video').on('click', function(event) {
      event.preventDefault();
      document.getElementById('tucoVideo').play();
    });
})


document.addEventListener('DOMContentLoaded', function () {
    const emailNews = document.getElementById('emailNews');
    const checkRobotNews = document.getElementById('checkRobotNews');
    const helpMailNews = document.getElementById('helpMailNews');
    const hideNews = document.getElementById('hideNews');
    const retourNewsFormulaire = document.getElementById('retourNewsFormulaire');
    const newsletterForm = document.querySelector('.newsletterForm');
    const regexMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    const scriptURL = 'https://script.google.com/macros/s/AKfycbywXC-iq1fWgZA2vcWVH9l2HRbQ8xX4CnG5oOld5JWcg7enEqmUItMm7aUm_4SCSnIF/exec';

    emailNews.addEventListener('blur', function () {
        validateEmail();
    });

    emailNews.addEventListener('input', function () {
        validateEmail();
    });

    checkRobotNews.addEventListener('blur', function () {
        validateRobotCheck();
    });

    checkRobotNews.addEventListener('input', function () {
        validateRobotCheck();
    });

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateEmail() && validateRobotCheck()) {
            submitForm();
        } else {
            alert('Please correct the errors before submitting the form.');
        }
    });

    function validateEmail() {
        const mailEntry = emailNews.value;
        if (!mailEntry.match(regexMail)) {
            helpMailNews.textContent = 'Incorrect email address';
            helpMailNews.style.display = 'block';
            hideNews.style.display = 'none';
            return false;
        } else {
            helpMailNews.style.display = 'none';
            hideNews.style.display = 'block';
            return true;
        }
    }

    function validateRobotCheck() {
        if (checkRobotNews.value != 7) {
            helpMailNews.textContent = 'Incorrect result';
            helpMailNews.style.display = 'block';
            return false;
        } else {
            helpMailNews.style.display = 'none';
            return true;
        }
    }

    function submitForm() {
    const mail = emailNews.value;
    const checkRobot = checkRobotNews.value;

    fetch(scriptURL, {
        method: 'POST',
        redirect: 'follow', // Instructs fetch to follow redirects, which can help in some CORS scenarios
        headers: {
            'Content-Type': 'text/plain;charset=utf-8' // Change to avoid preflight check
        },
        body: JSON.stringify({ emailNews: mail, checkRobotNews: checkRobot })
    })
    .then(response => response.text())
    .then(data => {
        newsletterForm.style.display = 'none';
        retourNewsFormulaire.style.cssText = "padding: 10px; margin-top: 60px; margin-bottom: 60px; margin-left: auto; margin-right: auto; color: white; font-size: 1rem; text-align: center;";
        retourNewsFormulaire.innerHTML = 'Thank you for subscribing to our newsletter!';
        emailNews.value = '';
        checkRobotNews.value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to subscribe. Please try again later.');
    });
}

});


// Animations on scroll
$(function () {
    $(window).on('scroll', function () {
        let sizePage = $(window).height();
        let trigger = 100;
        // Animation en Y
        let element = document.getElementsByClassName('animatableY');
        for (var unit of element) {
          if (unit.getBoundingClientRect().top + trigger <= sizePage) {
            unit.classList.add('showed');
          }
        }

        // Animation en X
        let elementh2 = document.getElementsByClassName('animatableX');
        for (var unit of elementh2) {
          if (unit.getBoundingClientRect().top + trigger <= sizePage) {
            unit.classList.add('showed');
          }
        }

        // Animation opacity
        let elementOpacity = document.getElementsByClassName('animatableOpacity');
        for (var unit of elementOpacity) {
          if (unit.getBoundingClientRect().top + trigger <= sizePage) {
            unit.classList.add('showed');
          }
        }
    })
})

//Lazyload
$(function () {
  if (!window.location.pathname.match("mentions")) {
    lazyload();
  }
})

// resize reload
$(function () {
  let initialWidth = $(window).innerWidth();
  $(window).on('resize', function () {
    let newWidth = $(window).innerWidth();
    if (initialWidth != newWidth) {
      document.location.reload(true);
    }
  })
})

// Manage scroll up button
$(function () {
    let ecran = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      $(window).on('scroll', function () {
        let scrollNow = $(window).scrollTop();
        $(window).on('scroll', function functionName() {
          if (scrollNow > 600 && scrollNow > $(window).scrollTop()) {
            if ($('#upArrow').is(":hidden")) {
              $('#upArrow').show();
            }
          } else {
            $('#upArrow').hide();
          }
        })
        $('#upArrow').on('click', function () {
            $(window).scrollTop(0);
        })
      })
})

// Delete scroll tag on scroll down
$(function () {
    $(window).on('scroll', function () {
        let topPage = $(window).scrollTop();
        if (topPage >= 150) {
          $('#scrollDown').hide();
        } else {
          $('#scrollDown').show();
        }
    })
})
// Manage tag scroll down
$(function () {
    $('#scrollDown').on('click', function() {
      window.location.href = "#nextShow";
    });
})

// Locations
$(function () {
  $(".card").on('click', function () {
    var url = $(this).data('url');
    window.location.href = url;
  });
});

// Location socials
$(function () {
    $('.facebook').on('click', function(event) {
      event.preventDefault();
      window.location.href = "https://www.facebook.com/BalaganistJapan";
    });
    $('.instagram').on('click', function(event) {
      event.preventDefault();
      window.location.href = "https://www.instagram.com/balaganistjapan";
    });
})
