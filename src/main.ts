import Cronos from "./Classes/Cronos.js";
import TimeBlock from "./Classes/TimeBlock.js";

const sett = { hours: 0, minutes: 0, seconds: 5, miliseconds: 1000 };
const cron = new Cronos();
cron.setCurrent(new TimeBlock(sett));
