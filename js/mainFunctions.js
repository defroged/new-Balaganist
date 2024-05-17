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


// Form newsletter input blur
$(function () {
  let regexMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    $('#emailNews').on('blur input', function(event) {
        //event.preventDefault();
        let mailEntry = $('#emailNews').val();
        if (!mailEntry.match(regexMail)) {
          $('#helpMailNews').text('Incorrect email address').hide().show();
          $('#hideNews').hide();
        } else {
          $('#helpMailNews').slideUp(100, function () {
            // Apparition checkRobotNews
            $('#hideNews').fadeIn();
          });
        }
    });
    $('#checkRobotNews').on('blur input', function(event) {
        if ($('#checkRobotNews').val() != 7) {
          $('#helpMailNews').text('Incorrect result').hide().show();
        } else {
          $('#helpMailNews').slideUp(100, function () {
          });
        }
    });
})

// Form newsletter ajax send
$(function () {
      $('.newsletterForm').on('submit', function (e) {
          e.preventDefault();
          let mail = $('#emailNews').val();
          let checkRobot = $('#checkRobotNews').val();
          if ($('#checkRobotNews').val() == 7 ) {
              $.post('../datas/sendFormSubscription.php',
                      { mail: mail,
                        checkRobot: checkRobot },
                        function(data, textStatus, xhr) {
                            $('.newsletterForm').fadeOut(400, function() {
                                $('#retourNewsFormulaire').css({"padding": "10px",
                                                            "margin-top": "60px",
                                                            "margin-bottom": "60px",
                                                            "margin-left": "auto",
                                                            "margin-right": "auto",
                                                            "color": "white",
                                                            "font-size": "1rem",
                                                            "text-align": "center"});
                                $('#retourNewsFormulaire').html(data);
                            });
                            $('#emailNews').val('');
                            $('#checkRobotNews').val('');
                          });
            } else {
                alert('Incorrect anti robot check result !');
            }

      })
})

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
    $(".card").on('click', () => {window.location.href = "https://www.instagram.com/"});
})
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
