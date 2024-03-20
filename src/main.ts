import Cronos from "./Classes/Cronos";
import Demeter from "./Classes/Demeter";

import { createIcons, Menu, Eye, Ellipsis, Plus} from "lucide";

// APP

const cronos = new Cronos();                        // created by the application
const demeter1 = new Demeter();                             // created by the user

// SIMULATION OF SETTING A DEMETER
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