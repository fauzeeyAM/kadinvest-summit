const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const el = entry.target;

        const target = +el.getAttribute('data-target');

        let count = 0;

        const speed = target / 120;

        const update = () => {

            count += speed;

            if (count < target) {

                el.innerText = Math.floor(count);

                requestAnimationFrame(update);

            } else {

                // ADD PLUS SIGN SAFELY
                el.innerHTML = target + "<span>+</span>";
            }
        };

        update();

        observer.unobserve(el);

    });

}, {
    threshold: 0.4
});

counters.forEach(counter => {
    observer.observe(counter);
});

counters.forEach(counter => observer.observe(counter));


// SECTOR SCROLL ANIMATION

const sectorCards = document.querySelectorAll(".sector-card");

window.addEventListener("scroll", () => {

    sectorCards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if(top < window.innerHeight - 80){

            card.classList.add("active");

        }

    });

});

// SCROLL REVEAL
document.addEventListener("DOMContentLoaded", function () {

    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {

        reveals.forEach((el) => {

            const windowHeight = window.innerHeight;

            const top = el.getBoundingClientRect().top;

            if (top < windowHeight - 100) {

                el.classList.add("active");

            }

        });

    }

    revealOnScroll();

    window.addEventListener("scroll", revealOnScroll);

});

window.addEventListener("load", function () {
    document.getElementById("welcomeModal").classList.add("show");
});

function closeModal() {
    document.getElementById("welcomeModal").classList.remove("show");
}

let mainModal = $("#mainModal");



$(document).ready(function () {

    // OPEN MODAL
    $(document).on('click', '.open-register-modal', function (e) {

    e.preventDefault();

    // CLOSE WELCOME MODAL
    $("#welcomeModal").removeClass("show");

    $("#modalTitle").text("Register as Delegate");

    resetForm();

    mainModal.addClass("show");

    loadSelects();

});

    // CLOSE MODAL
    $("#closeModalBtn, #closeModalBtn2").on("click", function () {

        mainModal.removeClass("show");

    });

    // SAVE
    $("#saveRegistrationBtn").on("click", function () {

        saveRegistration();

    });

});


// RESET FORM
function resetForm() {

    document.getElementById("registrationForm").reset();

}


// LOAD DROPDOWNS
function loadSelects() {

    loadSelect('#attendanceType', 'attendance');

    loadSelect('#organizationType', 'organization');

    loadSelect('#delegatesector', 'sector');

    loadSelect('#country', 'country');

    loadSelect('#interests', 'interest');

}

// GENERIC SELECT LOADER
function loadSelect(selector, type) {

    $.ajax({

        url: "includes/delegates/search.php",

        method: "GET",

        data: {
            type: type
        },

        dataType: "json",

        success: function(data) {

            let html = '<option value="">Select</option>';

            data.forEach(function(item){

                html += `
                    <option value="${item}">
                        ${item}
                    </option>
                `;
            });

            $(selector).html(html);

        },

        error: function(xhr){

            console.log(xhr.responseText);

        }

    });

}

// SAVE REGISTRATION
function saveRegistration() {

    let payload = {

        FullName: $("#fullName").val().trim(),
        Phone: $("#phone").val().trim(),
        Email: $("#email").val().trim(),
        AttendanceType: $("#attendanceType").val(),
        OrganizationType: $("#organizationType").val(),
        OrganizationName: $("#organizationName").val().trim(),
        Sector: $("#sector").val(),
        Country: $("#country").val(),
        Interests: $("#interests").val().join(',')

    };

    $.ajax({

        url: "includes/delegates/save.php",

        method: "POST",

        data: payload,

        dataType: "json",

        beforeSend: function () {

            $("#registerBtn")
                .prop("disabled", true)
                .text("Processing...");

        },

        success: function (res) {

            console.log(res);

            if(res.status){

                alert(res.message);

                $("#registrationForm")[0].reset();

                mainModal.removeClass("show");

            } else {

                alert(res.message);

            }

        },

        error: function (xhr) {

            console.log(xhr.responseText);

            alert("Error saving registration");

        },

        complete: function () {

            $("#registerBtn")
                .prop("disabled", false)
                .text("Register");

        }

    });

}

let partnerModal = $("#partnerModal");

// OPEN
$(document).on('click', '.open-partner-modal', function(e){

    e.preventDefault();

    $("#partnerForm")[0].reset();

    partnerModal.addClass("show");

    loadPartnerSelects();

});

// CLOSE
$("#closePartnerModalBtn, #closePartnerModalBtn2").on("click", function(){

    partnerModal.removeClass("show");

});

// SAVE
$("#savePartnerBtn").on("click", function(){

    savePartner();

});

function loadPartnerSelects(){

    loadPartnerSelect(
        '#partnerOrganizationType',
        'organization'
    );

    loadPartnerSelect(
        '#partnershipInterest',
        'interest'
    );

    loadPartnerSelect(
        '#sponsorshipLevel',
        'sponsorship'
    );

}

function loadPartnerSelect(selector, type){

    $.ajax({

        url: "includes/partners/search.php",
        method: "GET",
        data: { type: type },

        success: function(res){

            $(selector).empty();

            res.forEach(item => {

                $(selector).append(`
                    <option value="${item}">
                        ${item}
                    </option>
                `);

            });

        }

    });

}

function savePartner(){

    let payload = {

        FullName: $("#partnerFullName").val(),
        Email: $("#partnerEmail").val(),
        Phone: $("#partnerPhone").val(),
        OrganizationName: $("#partnerOrganizationName").val(),
        OrganizationType: $("#partnerOrganizationType").val(),
        PartnershipInterest: $("#partnershipInterest").val(),
        SponsorshipLevel: $("#sponsorshipLevel").val(),
        Message: $("#partnerMessage").val()

    };

    $.ajax({

        url: "includes/partners/save.php",
        method: "POST",
        data: payload,

        success: function(res){

            if(res.status){

                alert(res.message);

                partnerModal.removeClass("show");

            } else {

                alert(res.message);

            }

        }

    });

}
