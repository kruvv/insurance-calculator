import { action, makeAutoObservable, observable, configure } from "mobx";
import React from "react";

import { Text } from "grommet";

// configure({
// enforceActions: "always",
// computedRequiresReaction: true,
// reactionRequiresObservable: true,
// observableRequiresReaction: true,
// disableErrorBoundaries: true
// })

const amountFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
});

// const { log } = console;

class Store {
  // Установка значения поля формы "Пол"
  select = [];
  // Выбор строки в таблице с подобранными полисами
  selectItem = [];
  // Установка начальной даты для календаря
  birthday = "1980-01-01";
  // Установка даты начала действия полиса
  dateStart = new Date().toISOString();
  // Установка даты окончания действия полиса
  dateStop = "";
  // Отображение таблицы подобранных полисов
  open = false;
  // Подобранные полисы
  selectData = [];
  // Изменение продолжительности действия полиса
  rangeInput = 12;
  // Итоговая сумма оформленных полисов
  insurancePolicyCost = 0;
  // Блокировка кнопки Оформить полис и ползунка интервала
  disabled = true;
  // Данные из формы
  value = { birthday: "", sex: "", growth: "", weight: "" };
  // Массив значений для поля формы "Пол"
  options = ["Мужской", "Женский"];
  // Настройка колонок таблицы
  columns = [
    {
      property: "name",
      header: <Text>Название полиса</Text>,
      primary: true,
    },
    {
      property: "monthly_insurance_premium",
      header: "Страховая премия",
      render: (item) => amountFormatter.format(item.monthly_insurance_premium),
      align: "end",
    },
    {
      property: "sum_insured",
      header: "Страховое покрытие",
      render: (item) => amountFormatter.format(item.sum_insured),
      align: "end",
    },
  ];
  // Данные страховых полисов
  DATA = [
    {
      id: 1,
      name: "Защита здоровья ПЛЮС",
      min_time: 12,
      max_time: 24,
      monthly_insurance_premium: 2000,
      sum_insured: 200000,
      min_body_mass_idx: 18.0,
      max_body_mass_idx: 25.0,
      min_age: 18,
      max_age: 65,
      risks:
        "Смерть по любой причине; Инвалидность I, II, или II степени по любой причине",
    },
    {
      id: 2,
      name: "Защита здоровья ПЛЮС",
      min_time: 12,
      max_time: 24,
      monthly_insurance_premium: 2400,
      sum_insured: 200000,
      min_body_mass_idx: 25.0,
      max_body_mass_idx: 35.0,
      min_age: 18,
      max_age: 65,
      risks:
        "Смерть по любой причине; Инвалидность I, II, или II степени по любой причине",
    },
    {
      id: 3,
      name: "Защита здоровья",
      min_time: 12,
      max_time: 24,
      monthly_insurance_premium: 1000,
      sum_insured: 100000,
      min_body_mass_idx: 18.0,
      max_body_mass_idx: 25.0,
      min_age: 18,
      max_age: 65,
      risks:
        "Смерть в результате несчастного случая; Инвалидность I, II, или II в результате несчастного случая",
    },
    {
      id: 4,
      name: "Защита здоровья",
      min_time: 12,
      max_time: 24,
      monthly_insurance_premium: 1200,
      sum_insured: 100000,
      min_body_mass_idx: 25.0,
      max_body_mass_idx: 35.0,
      min_age: 18,
      max_age: 65,
      risks:
        "Смерть в результате несчастного случая; Инвалидность I, II, или II в результате несчастного случая",
    },
  ];

  constructor() {
    makeAutoObservable(this, {
      value: observable,
      select: observable,
      selectItem: observable,
      selectData: observable,
      birthday: observable,
      dateStart: observable,
      dateStop: observable,
      rangeInput: observable,
      open: observable,
      disabled: observable,
      insurancePolicyCost: observable,
      handleSubmit: action,
      handleReset: action,
      handleChangeRangeInput: action,
      handleCalculation: action,
      handleValidateDate: action,
      messageInsurancePolicy: action,
      handleStopDate: action,
    });
  }

  setSelect(item) {
    this.select = item;
  }
  setSelectItem(item) {
    this.selectItem = item;
  }
  setBirthDay(item) {
    this.birthday = item;
  }
  setDateStart(item) {
    this.dateStart = item;
  }
  setDateStop(item) {
    this.dateStop = item;
  }
  setOpen(item) {
    this.open = item;
  }
  setSelectData(item) {
    this.selectData = item;
  }
  setRangeInput(item) {
    this.rangeInput = item;
  }
  setInsurancePolicyCost(item) {
    this.insurancePolicyCost = item;
  }
  setDisabled(item) {
    this.disabled = item;
  }
  setValue(item) {
    this.value = item;
  }

  /**
   * handleChangeRangeInput - отслеживает значение интервала страхового периода
   * @param {*} event
   */
  handleChangeRangeInput = (event) => {
    if (this.selectItem.length > 0) {
      const range = event.target.value;
      this.setRangeInput(range);
      this.handleCalculation(this.dateStart, range);
    }
  };

  /**
   * handleCalculation - рассчитывает стоимость полиса
   * @param {string} startDateInsurance
   * @param {number} range
   */
  handleCalculation = (startDateInsurance, range) => {
    this.handleValidateDate(startDateInsurance);

    const result = this.selectItem.map((item) =>
      this.selectData.map((datum) =>
        item === datum.name ? datum.monthly_insurance_premium : 0,
      ),
    );
    const resultFlat = result.flat();
    const sum =
      resultFlat.length > 0
        ? resultFlat.reduce((acc, current) => acc + current)
        : 0;

    const costPolicy = Math.round((sum / 12) * range);

    this.setInsurancePolicyCost(costPolicy);

    const disabled = sum > 0 ? false : true;
    this.setDisabled(disabled);
  };

  /**
   * handleValidateDate - проверяет выбираемую клиентом дату начала действия полиса.
   * Дата начала действия полиса не должна быть меньше даты текущего дня.
   * @param {string} validateDate
   */
  handleValidateDate = (validateDate) => {
    const expectedDate = new Date(validateDate);
    const expectedDateFullYear = expectedDate.getFullYear();
    const expectedDateMonth = expectedDate.getMonth();
    const expectedDateDay = expectedDate.getDate();
    const dateNow = new Date();
    const dateNowFullYear = dateNow.getFullYear();
    const dateNowMonth = dateNow.getMonth();
    const dateNowDay = dateNow.getDate();

    if (expectedDateFullYear < dateNowFullYear) {
      alert(
        "Год начала действия страхового полиса не может быть меньше года расчетного дня.",
      );
      this.setDateStart(dateNow.toISOString());
      this.handleStopDate(dateNow.toISOString());
    } else if (
      expectedDateMonth < dateNowMonth &&
      expectedDateFullYear <= dateNowFullYear
    ) {
      alert(
        "Месяц даты начала действия страхового полиса не может быть меньше месяца даты расчетного дня.",
      );
      this.setDateStart(dateNow.toISOString());
      this.handleStopDate(dateNow.toISOString());
    } else if (
      expectedDateMonth === dateNowMonth &&
      expectedDateFullYear <= dateNowFullYear
    ) {
      if (expectedDateDay < dateNowDay) {
        alert(
          "Дата начала действия страхового полиса не может быть меньше даты расчетного дня.",
        );
        this.setDateStart(dateNow.toISOString());
        this.handleStopDate(dateNow.toISOString());
      } else {
        this.setDateStart(expectedDate.toISOString());
        this.handleStopDate(expectedDate.toISOString());
      }
    } else {
      this.setDateStart(expectedDate.toISOString());
      this.handleStopDate(expectedDate.toISOString());
    }
  };

  /**
   *  handleStopDate - Обработчик установки даты окончания страхового периода.
   * @param {string} stopDate
   */
  handleStopDate = (stopDate) => {
    const stop = new Date(stopDate);
    stop.setMonth(stop.getMonth() + parseInt(this.rangeInput));
    this.setDateStop(stop);
  };

  /**
   * handleReset - очистка данных
   */
  handleReset = () => {
    this.setValue({ birthday: "", sex: "", growth: "", weight: "" });
    this.setSelect([]);
    this.setSelectItem([]);
    this.setBirthDay("1980-01-01");
    this.setOpen(false);
    this.setRangeInput(12);
    this.setInsurancePolicyCost(0);
    this.setDisabled(true);
    this.setDateStart(new Date().toISOString());
    this.setDateStop("");
  };

  /**
   * handleSubmit - обработчик формы
   * @param {Object} param0
   */
  handleSubmit = ({ birthday, sex, growth, weight }) => {
    let isBodyMassIndex = false;

    const fullAgeInYears =
      new Date().getFullYear() - new Date(birthday).getFullYear();

    const isAge = fullAgeInYears >= 18 && fullAgeInYears <= 65 ? true : false;

    const bodyMassIndex =
      Math.round((parseFloat(weight) / parseFloat(growth) ** 2) * 1000000) /
      100;

    if (bodyMassIndex >= 18.0 && bodyMassIndex < 25.0) {
      isBodyMassIndex = true;
    } else if (bodyMassIndex >= 25.0 && bodyMassIndex <= 35.0) {
      isBodyMassIndex = true;
    }

    const result = this.DATA.filter(
      (item) =>
        item.min_body_mass_idx <= bodyMassIndex &&
        item.max_body_mass_idx >= bodyMassIndex,
    );

    this.setSelectData(result);

    if (isAge && isBodyMassIndex) {
      this.setOpen(true);
    } else {
      alert("По введенным данным не подобрано ни одного полиса");
    }
  };

  /**
   * messageInsurancePolicy - выводит сообщение об оформленном полисе.
   */
  messageInsurancePolicy = () => {
    alert(`Вы оформили страховой полис:
     ${this.selectItem}`);
  };
}

export default new Store();
