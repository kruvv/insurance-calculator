import "./App.css";
import { grommet, Grommet } from "grommet";
import { Favorite, ShareOption } from "grommet-icons";
import  SimpleSelect  from "./components/simple/simple-select.component";
import SimpleTextInput from "./components/simple/simple-text-input.component";
import DateInputField from "./components/date/data-input.component";
import BasicButton from "./components/buttons/simple-button";

function App() {
  return (
    <Grommet theme={grommet}>
      <h2>Введите параметры для подбора страховки</h2>
      <SimpleTextInput title="Рост, см" />
      <SimpleTextInput title="Вес, кг" />
      <SimpleSelect title="Пол"  />
      <DateInputField title="Дата рождения" />
      <BasicButton title="Рассчитать" disabled={true}/>
    </Grommet>
  );
}



export default App;
