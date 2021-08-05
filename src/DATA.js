import React from "react";

import { Text } from "grommet";

const amountFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 0,
});

export const columns = [
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

export const DATA = [
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

export const options = ["Мужской", "Женский"];
