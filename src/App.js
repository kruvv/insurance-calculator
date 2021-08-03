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
  RangeInput,
  Select,
  TextInput,
} from "grommet";
// import { Favorite, ShareOption } from "grommet-icons";

import { useState } from "react";

import { columns, DATA } from "./DATA";

function App() {
  const options = ["Мужской", "Женский"];
  const [value, setValue] = useState({});
  const [select, setSelect] = useState([]);
  const [date, setDate] = useState("1980");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [rangeInput, setRangeInput] = useState(12);

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter((item) => item !== value));
    }
  };

  const onCheckAll = (event) =>
    setChecked(event.target.checked ? DATA.map((datum) => datum.name) : []);

  const handleSubmit = ({ birthday, sex, growth, weight }) => {
    // console.log("val: ", birthday, sex, growth, weight);
    let isAge = false;
    let isBodyMassIndex = false;

    const bodyMassIndex =
      Math.round((weight / growth ** 2) * 10000 * 100) / 100;
    console.log("bmi:", bodyMassIndex);

    const nowYear = new Date().getFullYear();
    const clientYearOfBirth = new Date(birthday).getFullYear();
    console.log(nowYear, clientYearOfBirth);
    const age = nowYear - clientYearOfBirth;
    console.log(age);

    if (age >= 18 && age <= 65) {
      isAge = true;
    }

    if (bodyMassIndex >= 18.0 && bodyMassIndex < 25.0) {
      isBodyMassIndex = true;
    } else if (bodyMassIndex >= 25.0 && bodyMassIndex <= 35.0) {
      isBodyMassIndex = true;
    }

    console.log("#", isAge, isBodyMassIndex);

    if (isAge && isBodyMassIndex) {
      setOpen(true);
    } else {
      alert("По введенным данным не подобрано ни одного полиса");
    }
  };

  const handleChangeRangeInput = (event) => {
    let range = event.target.value;
    setRangeInput(range);
    // console.log("rangeInput:", range);
  };

  const handleReset = () => {
    setValue({});
    setSelect([]);
    setDate("");
    setOpen(false);
  };

  return (
    <Grommet theme={grommet}>
      <h2>Введите параметры для подбора страховки</h2>

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
            />
          </FormField>

          <Box direction="row" gap="medium" justify="center">
            <Button type="submit" primary label="Рассчитать" />
            <Button type="reset" label="Очистить" />
          </Box>
        </Form>
      </Box>

      {open && (
        <Box align="center" pad="medium">
          <Box align="center" pad="medium">
            <DataTable
              columns={columns}
              data={DATA}
              step={10}
              select={select}
              onSelect={setSelect}
            />
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
            Полис длительностью {rangeInput} месяцев
          </Box>
        </Box>
      )}
    </Grommet>
  );
}

export default App;
