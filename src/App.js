import "./App.scss";
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

import store from "./store";
import { observer } from "mobx-react";

function App() {
  const {
    options,
    columns,
    select,
    selectItem,
    birthday,
    dateStart,
    dateStop,
    open,
    selectData,
    rangeInput,
    insurancePolicyCost,
    disabled,
    value,
  } = store;

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
          onChange={(nextValue) => store.setValue(nextValue)}
          onReset={() => store.handleReset()}
          onSubmit={({ value }) => store.handleSubmit(value)}
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
              onChange={({ option }) => store.setSelect(option)}
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
              format="dd.mm.yyyy"
              onChange={({ value }) => store.setBirthDay(value)}
              value={birthday}
              calendarProps={{ size: "small" }}
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
            <Box margin="medium" width="large">
              <DataTable
                columns={columns}
                data={selectData}
                step={10}
                select={selectItem}
                onSelect={(value) => store.setSelectItem(value)}
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
                    ) : null,
                  ),
                )}
              </Box>
            )}
          </Box>
          <Box align="center" pad="small" width="large">
            <RangeInput
              value={rangeInput}
              onChange={(value) => store.handleChangeRangeInput(value)}
              step={1}
              min={12}
              max={24}
              disabled={disabled}
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
                format="dd.mm.yyyy"
                value={dateStart}
                onChange={({ value }) =>
                  store.handleCalculation(value, rangeInput)
                }
                calendarProps={{ size: "small" }}
              />
            </Box>
            <Box width="medium" gap="medium" direction="row">
              <Text tag="div">Дата окончания</Text>
              <DateInput
                format="dd.mm.yyyy"
                value={dateStop}
                onChange={() => { }}
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
            <Text tag="div">
              Полная страховая премия: {insurancePolicyCost}
            </Text>
            <Button
              type="button"
              primary
              label="Оформить полис"
              onClick={() => store.messageInsurancePolicy()}
              disabled={disabled}
            />
          </Box>
        </Box>
      )}
    </Grommet>
  );
}

export default observer(App);
