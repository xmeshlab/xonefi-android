import BackgroundTimer from "react-native-background-timer";
import { bar } from '../xonefiapi/foo';
import { read_default_config, write_default_config } from '../xonefiapi/config'

export function clientFoo() {
  console.log("XLOG: clientFoo() speaking...");
  BackgroundTimer.runBackgroundTimer(async () => {
        let config_json = await read_default_config();
        console.log("XLOG: ping: " + JSON.stringify(config_json));
        config_json["port"]++;
        await write_default_config(config_json);
      },
      3000);
}

module.exports = { clientFoo };