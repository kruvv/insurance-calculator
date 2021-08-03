import React from "react";

import { Box, Meter, Text, Tip } from "grommet";

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "RUB",
  minimumFractionDigits: 2,
});

export const columns = [
  {
    property: "name",
    header: <Text>Название полиса</Text>,
    primary: true,
    footer: "Total",
  },
  {
    property: "monthly_insurance_premium",
    header: "Страховая премия",
    render: (datum) => amountFormatter.format(datum.monthly_insurance_premium),
    align: 'end',
  },
  {
    property: "sum_insured",
    header: "Страховое покрытие",
    render: (datum) => amountFormatter.format(datum.sum_insured),
    align: 'end',
    aggregate: 'sum',
    footer: { aggregate: true },
  },
  // {
  //   property: 'date',
  //   header: 'Date',
  //   render: (datum) =>
  //     datum.date && new Date(datum.date).toLocaleDateString('en-US'),
  //   align: 'end',
  // },
  // {
  //   property: 'percent',
  //   header: 'Percent Complete',
  //   render: ({ percent }) => (
  //     <Box pad={{ vertical: 'xsmall' }}>
  //       <Meter values={[{ value: percent }]} thickness="small" size="small" />
  //     </Box>
  //   ),
  // },
  // {
  //   property: 'paid',
  //   header: 'Paid',
  //   render: (datum) => amountFormatter.format(datum.paid / 100),
  //   align: 'end',
  //   aggregate: 'sum',
  //   footer: { aggregate: true },
  // },
];

export const DATA = [
  {
    name: "Защита здоровья ПЛЮС",
    min_time: 12,
    max_time: 24,
    monthly_insurance_premium: 2000,
    sum_insured: 200000,
    min_body_mass_idx: 18.0,
    max_body_mass_idx: 25.0,
    min_age: 18,
    max_age: 65,
    risks: "Смерть по любой причине; Инвалидность I, II, или II степени по любой причине"
  },
  {
    name: "Защита здоровья ПЛЮС",
    min_time: 12,
    max_time: 24,
    monthly_insurance_premium: 2400,
    sum_insured: 200000,
    min_body_mass_idx: 25.0,
    max_body_mass_idx: 35.0,
    min_age: 18,
    max_age: 65,
    risks: "Смерть по любой причине; Инвалидность I, II, или II степени по любой причине"
  },
  {
    name: "Защита здоровья",
    min_time: 12,
    max_time: 24,
    monthly_insurance_premium: 1000,
    sum_insured: 100000,
    min_body_mass_idx: 18.0,
    max_body_mass_idx: 25.0,
    min_age: 18,
    max_age: 65,
    risks: "Смерть в результате несчастного случая; Инвалидность I, II, или II в результате несчастного случая"
  },
  {
    name: "Защита здоровья",
    min_time: 12,
    max_time: 24,
    monthly_insurance_premium: 1200,
    sum_insured: 100000,
    min_body_mass_idx: 25.0,
    max_body_mass_idx: 35.0,
    min_age: 18,
    max_age: 65,
    risks: "Смерть в результате несчастного случая; Инвалидность I, II, или II в результате несчастного случая"
  },
//   {
//     name: "Alan",
//     location: "",
//     date: "",
//     percent: 0,
//     paid: 0,
//   },
//   {
//     name: "Bryan",
//     location: "Fort Collins",
//     date: "2018-06-10",
//     percent: 30,
//     paid: 1234,
//   },
//   {
//     name: "Chris",
//     location: "Palo Alto",
//     date: "2018-06-09",
//     percent: 40,
//     paid: 2345,
//   },
//   {
//     name: "Eric",
//     location: "Palo Alto",
//     date: "2018-06-11",
//     percent: 80,
//     paid: 3456,
//   },
//   {
//     name: "Doug",
//     location: "Fort Collins",
//     date: "2018-06-10",
//     percent: 60,
//     paid: 1234,
//   },
//   {
//     name: "Jet",
//     location: "Palo Alto",
//     date: "2018-06-09",
//     percent: 40,
//     paid: 3456,
//   },
//   {
//     name: "Michael",
//     location: "Boise",
//     date: "2018-06-11",
//     percent: 50,
//     paid: 1234,
//   },
//   {
//     name: "Tracy",
//     location: "San Francisco",
//     date: "2018-06-10",
//     percent: 10,
//     paid: 2345,
//   },
];
