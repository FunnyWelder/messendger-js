window.addEventListener('DOMContentLoaded', function() {
    let mainBlock = document.querySelector('#main').clientHeight;
    document.querySelector('#main').style.height = mainBlock +'px';

    let kontakti = document.getElementsByClassName('kontakt');

    if (!localStorage.getItem(kontakti[0].id)){
        for(let i = 0; i < kontakti.length; i++) {
            localStorage.setItem(kontakti[i].id, JSON.stringify([]));
        }
    }

    let id = document.getElementsByClassName('kontakt active')[0].id;
    displayMessages(id);

    document.getElementById('main_text').addEventListener('keyup', function(data){
        if (data.key === 'Enter') {
            if (this.value.trim() !== '') {
                let tm = new Date();
                let time = ("0" + (tm.getHours())).slice(-2) + ":" + ("0" + (tm.getMinutes())).slice(-2) + ' ';
                for(let i = 0; i < time.length; i++) {
                    time = time.replace('0', '₀');
                    time = time.replace('1', '₁');
                    time = time.replace('2', '₂');
                    time = time.replace('3', '₃');
                    time = time.replace('4', '₄');
                    time = time.replace('5', '₅');
                    time = time.replace('6', '₆');
                    time = time.replace('7', '₇');
                    time = time.replace('8', '₈');
                    time = time.replace('9', '₉');
                    time = time.replace(':', '₋');
                }
                this.value = time + this.value;
                createMessage(this.value);
                saveMessage(this.value);
                this.value = '';
            }
        }
    })

    for (let i = 0; i < kontakti.length; i++) {
        kontakti[i].addEventListener('click', function(data) {
            let kontakti = document.getElementsByClassName('kontakt');
            for(let i = 0; i < kontakti.length; i++) {
                kontakti[i].classList.remove('active');
            }

            document.getElementById(data.currentTarget.id).classList.add('active');
            document.getElementById("rightup").innerHTML = document.getElementById(data.currentTarget.id).innerHTML;
            displayMessages(data.currentTarget.id);
        })
    }

});


function createMessage(mess) {
    let message = document.createElement('span');
    message.classList.add('messendge_you');
    message.textContent = mess;
    let main_messendges = document.getElementById('main_messendges');
    main_messendges.append(message);
    main_messendges.scrollTop = main_messendges.scrollHeight;
}

function saveMessage(mess) {
    let id = document.getElementsByClassName('kontakt active')[0].id;
    let messages = JSON.parse(localStorage.getItem(id));
    messages.push(mess);
    localStorage.setItem(id, JSON.stringify(messages));
}

function displayMessages(id) {
    document.getElementById('main_messendges').innerHTML = '';
    let messages = JSON.parse(localStorage.getItem(id));
    for (let i = 0; i < messages.length; i++) {
        createMessage(messages[i]);
    }
}