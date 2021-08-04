import "./App.css";
import {
  Box,
  Button,
  DataTable,
  DateInput,
  Form,
  FormField,
  grommet,
  Grommet,
  Heading,
  RangeInput,
  Select,
  Text,
  TextInput,
} from "grommet";
// import { Favorite, ShareOption } from "grommet-icons";

import { useState } from "react";

import { columns, DATA, options } from "./DATA";
import { useEffect } from "react";

function App() {
  const [selectData, setSelectData] = useState([]); // Подобранные полисы
  const [value, setValue] = useState({}); // Данные из формы
  const [select, setSelect] = useState([]); // Установка значения поля формы "Пол"
  const [selectItem, setSelectItem] = useState([]); // Выбор строки в таблице с подобранными полисами
  const [date, setDate] = useState("1980"); // Установка даты для календаря
  const [dateStart, setDateStart] = useState(""); // Установка даты начала действия полиса
  const [dateStop, setDateStop] = useState(""); // Установка даты окончания действия полиса
  const [open, setOpen] = useState(false); // Отображение таблицы подобранных полисов
  const [rangeInput, setRangeInput] = useState(12); // Изменение продолжительности действия полиса
  const [sumPolicy, setSumPolicy] = useState(0);

  const handleSubmit = ({ birthday, sex, growth, weight }) => {
    // console.log("val: ", birthday, sex, growth, weight);

    let isBodyMassIndex = false;

    const nowYear = new Date().getFullYear();
    const clientYearOfBirth = new Date(birthday).getFullYear();
    // console.log(nowYear, clientYearOfBirth);
    const age = nowYear - clientYearOfBirth;
    console.log(age);

    let isAge = age >= 18 && age <= 65 ? true : false;

    const bodyMassIndex =
      Math.round((weight / growth ** 2) * 10000 * 100) / 100;
    console.log("bmi:", bodyMassIndex);

    if (bodyMassIndex >= 18.0 && bodyMassIndex < 25.0) {
      isBodyMassIndex = true;
    } else if (bodyMassIndex >= 25.0 && bodyMassIndex <= 35.0) {
      isBodyMassIndex = true;
    }

    let result = DATA.filter(
      (item) =>
        item.min_body_mass_idx <= bodyMassIndex &&
        item.max_body_mass_idx >= bodyMassIndex
    );
    setSelectData(result);

    // console.log("#", isAge, isBodyMassIndex);

    if (isAge && isBodyMassIndex) {
      setOpen(true);
    } else {
      alert("По введенным данным не подобрано ни одного полиса");
    }
  };

  const handleChangeRangeInput = (event) => {
    setRangeInput(event.target.value);
  };

  const handleReset = () => {
    setValue({});
    setSelect([]);
    setDate("1980");
    setOpen(false);
  };

  const handleCalculation = (val) => {
    setDateStart(val);
    const stop = new Date(val);
    stop.setMonth(stop.getMonth() + parseInt(rangeInput));
    setDateStop(stop);

    const result = selectItem.map((item) =>
      selectData.map((datum) =>
        item === datum.name ? datum.monthly_insurance_premium : 0
      )
    );
    const resultFlat = result.flat();
    const sum =
      resultFlat.length > 0
        ? resultFlat.reduce((akk, current) => akk + current)
        : 0;

    setSumPolicy(sum);

    console.log("sum: ", sum);
  };

  const getInsurancePolicy = () => {
    alert(`Вы оформили страховой полис ${selectItem}`);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="small">
        <Heading level="3" textAlign="center">
          Введите параметры для подбора страховки
        </Heading>
      </Box>
      <Box fill align="center" justify="center" pad="xxsmall" direction="row">
        <Form
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          onReset={handleReset}
          onSubmit={({ value }) => handleSubmit(value)}
        >
          <FormField name="growth" htmlFor="growth" label="Рост" required>
            <TextInput name="growth" placeholder="Укажите рост в см." />
          </FormField>
          <FormField name="weight" htmlFor="weight" label="Вес" required>
            <TextInput name="weight" placeholder="Укажите вес в кг." />
          </FormField>
          <FormField name="sex" htmlFor="sex" label="Пол" required>
            <Select
              name="sex"
              placeholder="Укажите пол"
              value={select}
              options={options}
              onChange={({ option }) => setSelect(option)}
            />
          </FormField>

          <FormField
            name="birthday"
            label="Дата рождения"
            htmlFor="birthday"
            required
          >
            <DateInput
              name="birthday"
              format="mm/dd/yyyy"
              onChange={({ value }) => setDate(value)}
              value={date}
              calendarProps={{ size: "small" }}
            />
          </FormField>

          <Box direction="row" gap="medium" justify="center">
            <Button type="submit" primary label="Рассчитать" />
            <Button type="reset" label="Очистить" />
          </Box>
        </Form>
      </Box>

      {true && (
        <Box align="center" pad="medium">
          <Box align="center" pad="medium">
            <Box margin="medium" width="large">
              <DataTable
                columns={columns}
                data={selectData}
                step={10}
                select={selectItem}
                onSelect={setSelectItem}
                background={["white", "light-2"]}
                sortable
              />
            </Box>
            {selectItem.length > 0 && (
              <Box
                margin="medium"
                className="risks"
                pad="small"
                round="small"
                width="large"
              >
                <Box alignSelf="start" className="risks__title">
                  Риски:
                </Box>
                {selectItem.map((item) =>
                  selectData.map((datum) =>
                    item === datum.name ? (
                      <Box key={datum.id} alignSelf="start">
                        {datum.risks}
                      </Box>
                    ) : null
                  )
                )}
              </Box>
            )}
          </Box>
          <Box align="center" pad="small">
            <RangeInput
              value={rangeInput}
              onChange={handleChangeRangeInput}
              step={1}
              min={12}
              max={24}
            />
          </Box>
          <Box align="center" pad="xsmall">
            <Text>Полис длительностью {rangeInput} месяцев</Text>
          </Box>
          <Box
            fill
            align="center"
            justify="center"
            pad="large"
            direction="row"
            gap="large"
          >
            <Box width="medium" gap="" direction="row">
              <Text tag="div">Дата начала</Text>
              <DateInput
                format="dd/mm/yyyy"
                value={dateStart}
                onChange={({ value }) => handleCalculation(value)}
                calendarProps={{ size: "small" }}
              />
            </Box>
            <Box width="medium" gap="medium" direction="row">
              <Text tag="div">Дата окончания</Text>
              <DateInput
                format="dd/mm/yyyy"
                value={dateStop}
                onChange={() => {}}
                calendarProps={{ size: "small" }}
                disabled
              />
            </Box>
          </Box>
          <Box
            width="large"
            gap="large"
            direction="row"
            align="center"
            justify="center"
          >
            <Text tag="div">Полная страховая премия: {sumPolicy}</Text>
            {sumPolicy > 0 && (
              <Button
                type="button"
                primary
                label="Оформить полис"
                onClick={getInsurancePolicy}
              />
            )}
          </Box>
        </Box>
      )}
    </Grommet>
  );
}

export default App;
