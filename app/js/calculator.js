// Just Do It :)

// Данные для вычисления стоимости аренды
var data = {};

window.onload = function () {
    // Данные устройств
    var devices = {
        laptop: {
            price: 2000, //Цена
            rrp: 2135, // Рекомендованная розничаная цена
            ratio: 1.2,
            paybackPeriod: 12, // Период окупаемости
            depreciation: 1.2, // Коэфициент уцененого оборудования
            defaultDepreciation: 1 // Коэфициент не уцененого оборудования
        },
        printer: {
            price: 3000,
            rrp: 3135,
            ratio: 1.2,
            paybackPeriod: 12,
            depreciation: 1.2,
            defaultDepreciation: 1
        },
        server: {
            price: 5000,
            rrp: 5135,
            ratio: 1.2,
            paybackPeriod: 24,
            depreciation: 1.2,
            defaultDepreciation: 1
        }
    }

    // Коэффициенты дополнительных услуг
    var ratios = {
        location: { // Коэффициент расположения устройства
            service: 1, // Ремонт в сервисе
            minskCity: 1.2, // Минск, забор своей машиной
            minskClient: 1.3, // Минск, ремонт у клиента
            minskDistrict: 1.4 // Минский район
        },
        sla: { // Коэффициенты Service Level Agreement
            threeDays: 1, // 3 дня
            oneDay: 1.1, // 1 день
            oneCalendarDay: 1.13, // 1 календарный день
            fourHoursWeek: 1.15, // 1 календарный день
            fourHoursAllDay: 1.2 // 1 календарный день
        }
    }

    // Обработчик изменения устройства
    document.querySelector('#devices').addEventListener('change', changeDevice);

    // Обработчик изменения срока аренды и проверки на число
    document.getElementById('rent-term').addEventListener('keyup', changeRentTerm);

    // Обработчик изменения количества и проверки на число
    document.getElementById('amount').addEventListener('keyup', changeAmount);

    // Обработчик выбора уцененного устройства
    document.getElementById('ucen').addEventListener('click', changeDepreciation);

    // Обработчик выбора дополнительных услуг
    document.getElementById('services').addEventListener('click', changeService);

    // Обработчики на изменнеия радиокнопок услуг
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    for (i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', changeService);
    }

    // Обработчик добавления строки
    document.getElementById('add-item').addEventListener('click', addItem);

    // Обработчик удаления строки
    document.querySelector('tbody').addEventListener('click', delItem);

    // Вычислить скидку на основе цены и количества выбранных устройств
    function calculateSale(cost) {
        var saleOutput = document.getElementById('sale');
        if (cost < 1000) {
            saleOutput.childNodes["1"].textContent = 0;
            return 1;
        } else if (cost < 1500) {
            saleOutput.childNodes["1"].textContent = (0.10 * 100);
            return 0.10;
        } else if (cost < 2000) {
            saleOutput.childNodes["1"].textContent = (0.15 * 100);
            return 0.15;
        } else if (cost < 3000) {
            saleOutput.childNodes["1"].textContent = (0.20 * 100);
            return 0.20;
        } else if (cost < 4000) {
            saleOutput.childNodes["1"].textContent = (0.30 * 100);
            return 0.30;
        } else {
            saleOutput.childNodes["1"].textContent = (0.25 * 100);
            return 0.25;
        }
    }



    // Проверить пункт услуг и отключить кнопки
    function checkServices() {
        var services = document.getElementById('services');
        var radioButtons = document.querySelectorAll('input[type="radio"]');
        if (!services.checked) {
            for (i = 0; i < radioButtons.length; i++) {
                radioButtons[i].disabled = true;
                document.querySelectorAll('.custom-radio')[i].style.opacity = '0.5';
            }
            return false;
        } else {
            for (i = 0; i < radioButtons.length; i++) {
                radioButtons[i].disabled = false;
                document.querySelectorAll('.custom-radio')[i].style.opacity = '1';
            }
            return true;
        }
    }

    

    // Вычисление стоимости аренды девайса
    function calculatePrice() {
        // Данные для вычисления
        var paybackPeriod = data.paybackPeriod;
        var depreciation = data.depreciation;
        var rentTerm = data.rentTerm;
        var amount = data.amount;
        var rrp = data.rrp;
        var cost = rrp * amount;
        var rentSale = calculateSale(cost);
        var service = data.service;

        var total = cost / paybackPeriod * rentTerm / depreciation * service - (cost / paybackPeriod * rentTerm / depreciation * service) * rentSale;
        data.total = total.toFixed(2);

        document.getElementById('total-price').childNodes['1'].textContent = total.toFixed(2);
        document.getElementById('cost').childNodes['1'].textContent = cost.toFixed(2);

        // test output
        //document.getElementById('total-price2').childNodes['0'].textContent = 'rentSum=' + cost + ' amount=' + amount + 'rentTerm=' + rentTerm + '\n' + 'paybackPeriod=' + paybackPeriod + '\n' + 'depreciation=' + depreciation + '\n' + 'rentSale=' + rentSale + '\n' + 'serviceSum=' + service + 'total=' + total;
    }

    function addItem() {
        var newRow = document.createElement('tr');
        newRow.innerHTML = '<td>' + data.name + '</td><td>' + data.amount + '</td><td>' + data.rentTerm + '</td><td class="cost">' + data.total + '</td><td><span class="del">Удалить</span></td>'
        tbody.appendChild(newRow);
        calculateTotalPrice();
    }

    function delItem(e) {
        // Удалить строку
        if (e.target.className == "del") {
            this.removeChild(e.target.parentNode.parentNode);
        }
        calculateTotalPrice();
    }

    function calculateTotalPrice() {
        var priceRows = document.getElementsByClassName('cost');
        //var arrPriceRows = Array.prototype.slice.call(priceRows);
        var totalItemPrice = 0;
        for (i = 0; i < priceRows.length; i++) {
            totalItemPrice += Number(priceRows[i].innerHTML);
        }
        document.getElementById('total-cost').childNodes[1].innerHTML = totalItemPrice.toFixed(2);

    }

    // Заполнение объекта данными для расчета и установка цены при загрузке страницы
    function init() {
        changeDevice();
        changeService();
        changeAmount();
        changeRentTerm();
        changeDepreciation();
        calculatePrice();
    }

    // Проверть поле со сроком аренды на число
    /* function validateNumber(e, input) {
        var e = e || event;
        var key = e.keyCode || e.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]/;
        if (!regex.test(key)) {
            var a = input.value;
            return a.slice(0, -1);
        } else {
            return input.value;
        }
    } */

    // Проверка на число в полях где вводятся значения
    function validateNumber(input) {
        var inputValue = input.value;
        if (isNaN(inputValue)) {
            inputValue = input.getAttribute('value');
            input.value = input.getAttribute('value');
            return inputValue;
        } else if (inputValue == '') {
            inputValue = 1;
            input.value = '';
            return inputValue;
        } else {
            return inputValue;
        }
    }

    // Изменение количества устройств
    function changeAmount() {
        var input = document.getElementById('amount');
        var inputValue = validateNumber(input);
        input.setAttribute('value', inputValue);
        data.amount = Number(input.getAttribute('value'));
        calculatePrice();
    }

    // Изменение срока аренды
    function changeRentTerm() {
        var input = document.getElementById('rent-term');
        var inputValue = validateNumber(input);
        input.setAttribute('value', inputValue);
        data.rentTerm = Number(input.getAttribute('value'));
        calculatePrice();
    }

    // Изменнеие вида устройства
    function changeDevice() {
        var optionIndex = document.getElementById('devices').options.selectedIndex;
        var curentDevice = document.getElementById('devices').options[optionIndex].id;
        data.paybackPeriod = devices[curentDevice].paybackPeriod;
        data.rrp = devices[curentDevice].rrp;
        data.name = document.getElementById('devices').options[optionIndex].textContent;
        calculatePrice();
    }

    // Изменение уценного товара
    function changeDepreciation() {
        var ucen = document.getElementById('ucen');
        var optionIndex = document.getElementById('devices').options.selectedIndex;
        var curentDevice = document.getElementById('devices').options[optionIndex].id;
        if (ucen.checked) {
            data.depreciation = devices[curentDevice].depreciation;
        } else {
            data.depreciation = devices[curentDevice].defaultDepreciation;
        }
        calculatePrice();
    }

    // Изменение сервисных услуг
    function changeService() {
        if (checkServices()) {
            var servicelocation, serviceSla;
            var optionsLocation = document.querySelectorAll('input[name="optionsLOC"]');
            var optionsSla = document.querySelectorAll('input[name="optionsSLA"]');
            for (i = 0; i < optionsLocation.length; i++) {
                if (optionsLocation[i].checked) {
                    var curLocOption = optionsLocation[i].id;
                    servicelocation = ratios.location[curLocOption];
                }
            }
            for (i = 0; i < optionsSla.length; i++) {
                if (optionsSla[i].checked) {
                    var curSlaOption = optionsSla[i].id;
                    serviceSla = ratios.sla[curSlaOption];
                }
            }
            data.service = servicelocation * serviceSla;
        } else {
            data.service = 1; // Если услуги не выбраны, коэффициент 1
        }
        calculatePrice();
    }

    init();
}