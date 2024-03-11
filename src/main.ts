import CronRenderer from "./Classes/CronRenderer";
import Cronos from "./Classes/Cronos";
import Demeter from "./Classes/Demeter";

import { createIcons, Menu } from "lucide";


// APP

const renderer = new CronRenderer();      // creayed by the application
const cronos = new Cronos(renderer);     // creayed by the application
const demeter1 = new Demeter();          // created by the user

// SIMULATION OF SETTING A DEMETER
renderer.setCronos(cronos);

cronos.setDemeter(demeter1);


// ICONS 

createIcons({
    icons: {
        Menu
    }
});