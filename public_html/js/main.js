//stiky header
$(window).scroll(function() {
    var top = $(document).scrollTop();
    console.log('statusPopup', statusPopup);
    if (top < 600 || statusPopup !== false) $(".header-content").removeClass('fixed-header');
    else $(".header-content").addClass('fixed-header');
});

// banner
$('.banner-carousel').slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true
});

// popup
const popupLinks = document.querySelectorAll('.popup-link');

let unlock = true;
let statusPopup = false;
const timeout = 300;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    statusPopup = true;

    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if(popupActive) {
            popupClose(popupActive, false);
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup-content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    statusPopup = false;
    if(unlock) {
        popupActive.classList.remove('open');
    }
}

/*Popup Message after send the form*/

function popupSuccessSend() {
    let chips = document.getElementById('correct-mess');
    chips.style.visibility = 'visible'

    setTimeout(
        () => {
            chips.style.visibility = 'hidden'
        }, 3000
    )
}
function popupErrorSend() {
    let chips = document.getElementById('wrong-mess');
    chips.style.visibility = 'visible'

    setTimeout(
        () => {
            chips.style.visibility = 'hidden'
        }, 3000
    )
}

function test() {
    let chips = document.getElementById('c-test');
    chips.style.visibility = 'visible'

    setTimeout(
        () => {
            chips.style.visibility = 'hidden'
        }, 3000
    )
}

/*validation*/
/*and send to email*/
const form = document.getElementById('form');
const username = document.getElementById('form-name');
const email = document.getElementById('form-email');
const msg = document.getElementById('form-message');
const mainEmail1 = "smileneverdie47@gmail.com"; //landing_yellowduckcoders@gmail.com
const mainEmail2 = "vitalypetrov47@gmail.com"; //yelowduckcoders@gmail.com
const token = "5c4a1aeb-273f-4565-ad44-df3491c705c7";

form.addEventListener('submit', e => {
    e.preventDefault();

    let res = validateInputs();
    const popupActive = document.querySelector('.popup.open');
    console.log('validateInputs is: ', validateInputs());
    if(res === true) {
        // Email.send({
        //     SecureToken : "5c4a1aeb-273f-4565-ad44-df3491c705c7",
        //     // Host : "smtp.elasticemail.com",
        //     // Username : mainEmail,
        //     // Password : pass,
        //     To : mainEmail2,
        //     From : mainEmail1,
        //     Subject : "Contact Form",
        //     Body : 'Name: ' + username.value + "<br/>" + 'Email: ' + email.value + "<br/>" + 'Message: ' + msg.value
        // }).then(function (response) {
        //     if (response == 'OK') {
        //         // alert("Mail sent successfully");
        //         popupSuccessSend();
        //     } else {
        //         popupErrorSend();
        //         // throw new Error("Error: " + response.statusText);
        //     }
        // });

        username.value = '';
        username.parentElement.classList.remove('success');
        email.value = '';
        email.parentElement.classList.remove('success');
        msg.value = '';
        msg.parentElement.classList.remove('success');


        popupClose(popupActive, false);
        popupSuccessSend(); //popup success send mes
        // popupErrorSend(); //popup error send mes
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const msgValue = msg.value.trim();
    let carrLang = window.location.hash;
    carrLang = carrLang.substring(1);
    console.log('carrLang', carrLang);

    if(usernameValue === '') {
        if(carrLang === 'ru') {
            setError(username, 'Введите ваше имя');
        } else if (carrLang === 'en') {
            setError(username, 'Type your name!');
        }
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        if(carrLang === 'ru') {
            setError(email, 'Введите вашу почту');
        } else if (carrLang === 'en') {
            setError(email, 'Type your Email!');
        }
    } else if (!isValidEmail(emailValue)) {
        if(carrLang === 'ru') {
            setError(email, 'Введите нужный формат почты');
        } else if (carrLang === 'en') {
            setError(email, 'Enter the required Email format');
        }
    } else {
        setSuccess(email);
    }

    if(msgValue === '') {
        if(carrLang === 'ru') {
            setError(msg, 'Введите сообщение');
        } else if (carrLang === 'en') {
            setError(msg, 'Type your message');
        }
    }  else {
        setSuccess(msg);
    }

    if(usernameValue !== '' && emailValue !== '' && msgValue !== '') {
        return true;
    } else {
        return false;
    }
};



/*Lang*/
const langArr = {
    "benefit": {
        "ru": "Чем полезны вам",
        "en": "What you get",
    },
    "about": {
        "ru": "Кто мы",
        "en": "About us",
    },
    "bannerContent1": {
        "ru": "Лучшее цифровое решение любых бизнес-задач",
        "en": "Smart software that makes you rich",
    },
    "bannerContent2": {
        "ru": "IT трансформация для роста бизнеса",
        "en": "IT transformation for the business growth",
    },
    "bannerContent3": {
        "ru": "Умные системы автоматизации",
        "en": "Smart business automation systems",
    },
    "bannerContent4": {
        "ru": "Инновационные технологии - Ваш прибыльный продукт",
        "en": "Innovative, advanced technologies to skyrocket business",
    },
    "testTranslate": {
        "ru": "Привет мир!",
        "en": "Hello world!",
    },
    "whatYouGetMainTitle": {
        "ru": "ЧЕМ ПОЛЕЗНЫ ВАМ",
        "en": "WHAT YOU GET",
    },
    "whatYouGetSubTitle": {
        "ru": "Выполним широкий набор услуг по разработке программного обеспечения:",
        "en": "A wide range of software development services:",
    },
    "whatYouGetSTitle1": {
        "ru": "адаптируем имеющийся софт к специфическим требованиям",
        "en": "adapting the existing software to your specific requirements",
    },
    "whatYouGetSTitle2": {
        "ru": "разработаем эффективное решение с нуля в соответствии с индивидуальным видением",
        "en": "developing new effective solutions in accordance with your individual vision",
    },
    "WYGCart_1": {
        "ru": "Разработка и интеграция корпоративных решений",
        "en": "Development and integration of corporate solutions",
    },
    "WYGCart_2": {
        "ru": "Настройка и поддержка приложений",
        "en": "Application setup and support",
    },
    "WYGCart_3": {
        "ru": "CRM и ERP системы",
        "en": "CRM and ERP systems",
    },
    "WYGCart_4": {
        "ru": "Разработка и миграция облачных приложений",
        "en": "Development and migration of cloud applications",
    },
    "WYGCart_5": {
        "ru": "QA и тестирование",
        "en": "QA and testing",
    },
    "WYGCart_6": {
        "ru": "Безопасность программных продуктов",
        "en": "Ensuring the security of software products",
    },
    "WYGCart_7": {
        "ru": "ИТ-консалтинг",
        "en": "IT Consulting",
    },
    "WYGCart_8": {
        "ru": "Разработка UI/ UX дизайна",
        "en": "UI / UX design development",
    },
    "WYGCart_9": {
        "ru": "Аутсорсинг разработки ПО",
        "en": "Software development outsourcing",
    },
    "WYGCart_10": {
        "ru": "Интеграция приложений",
        "en": "Application Integration",
    },
    "WhoWorksForYourSuccessMainTitle": {
        "ru": "МЫ YELLOW DUCK CODERS",
        "en": "WHO WORKS FOR YOUR SUCCESS",
    },
    "WWFYSCartTitle1": {
        "ru": "Почему Yellow Duck.",
        "en": "Why we are Yellow Duck Coders.",
    },
    "WWFYSCartTitle2": {
        "ru": "Эксперты Yellow Duck Coders.",
        "en": "Who at Yellow Duck Coders.",
    },
    "WWFYSCartTitle3": {
        "ru": "Миссия Yellow Duck Coders.",
        "en": "The mission of Yellow Duck Coders.",
    },
    "WWFYSCartTitle4": {
        "ru": "Путь Yellow Duck Coders.",
        "en": "Yellow Duck Coders are proud.",
    },
    "WWFYSCartText1.1": {
        "ru": "Слышали теорию, что лучший способ верно решить задачу - рассказать и делегировать ее желтому утенку? :)",
        "en": "Funny name. Isn’t it? But it makes sense. Do you know how cool developers create perfect solutions?",
    },
    "WWFYSCartText1.2": {
        "ru": "Они не только прописывают и тестируют свои алгоритмы, но и частенько проговаривают их, чтобы довести до совершенства и исправить, если необходимо. А кто может выдержать рассказ о сотнях строчек кода?:) Айтишный настольный Желтый Утенок - символ и источник инсайтов и лучших решений разработчика.",
        "en": "They not only write and test their algorithms but also verbalize them in order to perfect them and correct if necessary. And who can stand the story about hundreds of code lines? Yellow Duck toy. It so happened that this symbol is considered a source of insights and the best solutions for the developer.",
    },
    "WWFYSCartText2.1": {
        "ru": "Команда мощных специалистов с системным мышлением и креативным подходом.",
        "en": "A team of powerful specialists with a creative and thorough approach.",
    },
    "WWFYSCartText2.2": {
        "ru": "В нашем арсенале - полный спектр технологий, отлаженные процессы, гарантия ожидаемых результатов.",
        "en": "A full range of technologies, optimized processes and a guarantee of expected results are our strong sides. We are able to implement all you need.",
    },
    "WWFYSCartText3.1": {
        "ru": "Мы рады трудиться, чтобы помогать бизнесам быть эффективнее.",
        "en": "We are happy to work hard to help businesses become highly effective. Decency, quality and your satisfied expectations are what our work is based on.",
    },
    "WWFYSCartText3.2": {
        "ru": "Мы рады трудиться, чтобы помогать бизнесам быть эффективнее.",
        "en": "Every cent of our client\'s investment must turn into profit thanks to the top-quality software.",
    },
    "WWFYSCartText4.1": {
        "ru": "Более 200 компаний-партнеров, кто успешно использует наше программное обеспечение по всему миру.",
        "en": "We are proud of over 200 partner companies who successfully use our software around the world.",
    },
    "WWFYSCartText4.2": {
        "ru": "Yellow Duck Coders - подразделение IT компании-лидера ниши с 7-летним успешным международным опытом, основателя и организатора двух международных оффлайн бизнес-конференций, автора уникальных инновационных IT решений на рынке.",
        "en": "Yellow Duck Coders is an IT branch of a niche leader company who has 8 years of successful international experience, who are the founder and organizer of two international offline business conferences, and the author of unique innovative IT solutions on the market.",
    },
    "TheWayToStartAProjectMainTitle": {
        "ru": "ОБСУДИМ ПРОЕКТ",
        "en": "THE WAY TO START A PROJECT",
    },
    "TWTSAPContent1": {
        "ru": "Ваш запрос в формате концепции или у Вас четкое техническое видение - в обоих случаях мы точно сможем понять друг друга и качественно воплотить в жизнь Ваш запрос.",
        "en": "Your request in the format of a concept or you have a clear technical vision - in both cases, we will definitely be able to understand each other and qualitatively implement your plans.",
    },
    // "TWTSAPContent2": {
    //     "ru": "- самый легкий путь от идеи к прибыли.",
    //     "en": "is the easiest way from idea to profit",
    // },
    // "TWTSAPContent2.1": {
    //     "ru": "Yellow Duck Coders",
    //     "en": "Yellow Duck Coders",
    // },
    "TWTSAPContent3": {
        "ru": "Свяжитесь с нами и расскажите о планах в любой удобной форме.",
        "en": "Contact us and tell us about your plans in any convenient form.",
    },
    "Btn1": {
        "ru": "Обсудить проект",
        "en": "Discuss the project",
    },
    "Btn2": {
        "ru": "Заказать проект",
        "en": "Order the project",
    },
    "formContentTitle": {
        "ru": "Свяжитесь с нами!",
        "en": "Contact Us!",
    },
    "formSend": {
        "ru": "Отправить",
        "en": "Send"
    },
    "formCancel": {
        "ru": "Закрыть",
        "en": "Cancel"
    },
    "formInput1": {
        "ru": "Ваше имя:",
        "en": "Your Name:",
    },
    "formInput2": {
        "ru": "Ваше Email:",
        "en": "Your Email:",
    },
    "formInput3": {
        "ru": "Ваше сообщение:",
        "en": "Your message:",
    },
    "successMes": {
        "ru": "Ваше письмо отправлено успешно!",
        "en": "Your massage has been sent!",
    },
    "errorMes": {
        "ru": "Ваше письмо не было доставлено!",
        "en": "Your massage has not sent!",
    }

}

const select = document.querySelector(".select");
const options_list = document.querySelector(".options-list");
const options = document.querySelectorAll(".option");
const array = document.getElementById('arrow-icon');

//show & hide options list
select.addEventListener("click", () => {
    options_list.classList.toggle("active");
    if(document.querySelector(".active")) {
        array.style.transform = "rotate(-180deg)";
    } else {
        array.style.transform = "rotate(0deg)";
    }
    // select.querySelector(".fa-chevron-down").classList.toggle("fa-chevron-up");
});

//select option
options.forEach((option) => {
    option.addEventListener("click", () => {
        options.forEach((option) => {option.classList.remove('selected')});
        select.querySelector("span").innerHTML = option.innerHTML;
        option.classList.add("selected");
        options_list.classList.toggle("active");
        if(option.id === 'ru') {
            document.getElementById("ru").style.display = "none";
            document.getElementById("en").style.display = "block";
        } else if (option.id === 'en') {
            document.getElementById("ru").style.display = "block";
            document.getElementById("en").style.display = "none";
        }
        console.log(option.id);
        if(document.querySelector(".active")) {
            array.style.transform = "rotate(-180deg)";
        } else {
            array.style.transform = "rotate(0deg)";
        }
        changeURLLanguage(option.id)
        // select.querySelector(".fa-chevron-down").classList.toggle("fa-chevron-up");
    });
});

// const select = document.getElementById('select');
const allLang = ['en', 'ru']
console.log('selectSec:', select);

// select.addEventListener('change', changeURLLanguage);

function changeURLLanguage(currentLang) {
    console.log('currentLang:',currentLang);
    // let lang = currentLang;
    location.href = window.location.pathname + '#' + currentLang;
    location.reload();
}
function changeLanguage() {
    let hash = window.location.hash;
    console.log(hash);
    hash = hash.slice(1);
    console.log('hash: ',hash);
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#ru';
        location.reload();
        alert("Введённый вами язык не пристустует на сайте! Выберете язык из представленного выбора");

    }
    // select.value = hash;
    console.log('langArr:', langArr);

    document.querySelector('.lng-benefit').innerHTML = langArr['benefit'][hash]
    document.querySelector('.lng-about').innerHTML = langArr['about'][hash]
    document.querySelector('.lng-bannerContent1').innerHTML = langArr['bannerContent1'][hash]
    document.querySelector('.lng-bannerContent2').innerHTML = langArr['bannerContent2'][hash]
    document.querySelector('.lng-bannerContent3').innerHTML = langArr['bannerContent3'][hash]
    document.querySelector('.lng-bannerContent4').innerHTML = langArr['bannerContent4'][hash]
    document.querySelector('.lng-whatYouGetMainTitle').innerHTML = langArr['whatYouGetMainTitle'][hash]
    document.querySelector('.lng-whatYouGetSubTitle').innerHTML = langArr['whatYouGetSubTitle'][hash]
    document.querySelector('.lng-whatYouGetSTitle1').innerHTML = langArr['whatYouGetSTitle1'][hash]
    document.querySelector('.lng-whatYouGetSTitle2').innerHTML = langArr['whatYouGetSTitle2'][hash]
    document.querySelector('.lng-WYGCart_1').innerHTML = langArr['WYGCart_1'][hash]
    document.querySelector('.lng-WYGCart_2').innerHTML = langArr['WYGCart_2'][hash]
    document.querySelector('.lng-WYGCart_3').innerHTML = langArr['WYGCart_3'][hash]
    document.querySelector('.lng-WYGCart_4').innerHTML = langArr['WYGCart_4'][hash]
    document.querySelector('.lng-WYGCart_5').innerHTML = langArr['WYGCart_5'][hash]
    document.querySelector('.lng-WYGCart_6').innerHTML = langArr['WYGCart_6'][hash]
    document.querySelector('.lng-WYGCart_7').innerHTML = langArr['WYGCart_7'][hash]
    document.querySelector('.lng-WYGCart_8').innerHTML = langArr['WYGCart_8'][hash]
    document.querySelector('.lng-WYGCart_9').innerHTML = langArr['WYGCart_9'][hash]
    document.querySelector('.lng-WYGCart_10').innerHTML = langArr['WYGCart_10'][hash]
    document.querySelector('.lng-WhoWorksForYourSuccessMainTitle').innerHTML = langArr['WhoWorksForYourSuccessMainTitle'][hash]
    document.querySelector('.lng-WWFYSCartTitle1').innerHTML = langArr['WWFYSCartTitle1'][hash]
    document.querySelector('.lng-WWFYSCartTitle2').innerHTML = langArr['WWFYSCartTitle2'][hash]
    document.querySelector('.lng-WWFYSCartTitle3').innerHTML = langArr['WWFYSCartTitle3'][hash]
    document.querySelector('.lng-WWFYSCartTitle4').innerHTML = langArr['WWFYSCartTitle4'][hash]
    document.querySelector('.lng-WWFYSCartText11').innerHTML = langArr['WWFYSCartText1.1'][hash]
    document.querySelector('.lng-WWFYSCartText12').innerHTML = langArr['WWFYSCartText1.2'][hash]
    document.querySelector('.lng-WWFYSCartText21').innerHTML = langArr['WWFYSCartText2.1'][hash]
    document.querySelector('.lng-WWFYSCartText22').innerHTML = langArr['WWFYSCartText2.2'][hash]
    document.querySelector('.lng-WWFYSCartText31').innerHTML = langArr['WWFYSCartText3.1'][hash]
    document.querySelector('.lng-WWFYSCartText32').innerHTML = langArr['WWFYSCartText3.2'][hash]
    document.querySelector('.lng-WWFYSCartText41').innerHTML = langArr['WWFYSCartText4.1'][hash]
    document.querySelector('.lng-WWFYSCartText42').innerHTML = langArr['WWFYSCartText4.2'][hash]
    document.querySelector('.lng-TheWayToStartAProjectMainTitle').innerHTML = langArr['TheWayToStartAProjectMainTitle'][hash]
    document.querySelector('.lng-TWTSAPContent1').innerHTML = langArr['TWTSAPContent1'][hash]
    document.querySelector('.lng-TWTSAPContent3').innerHTML = langArr['TWTSAPContent3'][hash]
    document.querySelector('.lng-Btn1').innerHTML = langArr['Btn1'][hash]
    document.querySelector('.lng-Btn2').innerHTML = langArr['Btn2'][hash]
    document.querySelector('.p-title').innerHTML = langArr['formContentTitle'][hash]
    document.querySelector('.lng-formSend').innerHTML = langArr['formSend'][hash]
    document.querySelector('.lng-formCancel').innerHTML = langArr['formCancel'][hash]
    document.querySelector('.lng-formInput1').innerHTML = langArr['formInput1'][hash]
    document.querySelector('.lng-formInput2').innerHTML = langArr['formInput2'][hash]
    document.querySelector('.lng-formInput3').innerHTML = langArr['formInput3'][hash]
    document.querySelector('.lng-successMes').innerHTML = langArr['successMes'][hash]
    document.querySelector('.lng-errorMes').innerHTML = langArr['errorMes'][hash]
}
changeLanguage();




