import CronRenderer from "./Classes/renderers/CronRenderer";
import Cronos from "./Classes/Cronos";
import Demeter from "./Classes/Demeter";

import { createIcons, Menu, Eye, Ellipsis, Plus} from "lucide";
import BlockModalRenderer from "./Classes/renderers/BlockModalRenderer";


// APP

const blockModalRenderer = new BlockModalRenderer();        // created by the application
const renderer = new CronRenderer(blockModalRenderer);      // created by the application
const cronos = new Cronos(renderer);                        // created by the application
const demeter1 = new Demeter();                             // created by the user

// SIMULATION OF SETTING A DEMETER
renderer.setCronos(cronos);

cronos.setDemeter(demeter1);


// ICONS 

createIcons({
    icons: {
        Menu,
        Eye,
        Ellipsis,
        Plus
    }
});