import BackgroundTimer from "react-native-background-timer";
import { bar } from '../xonefiapi/foo';
import { read_default_config, write_default_config } from '../xonefiapi/config'


const worker = require("./worker");



export function clientFoo() {
  console.log("XLOG: clientFoo() speaking...");
  let global_counter = 0;
  const user_password = "seitlab123!@";
  const decrypted_private_key = "c6c6e65b7a45f281c2a93a9e1bf6d7e705e79dd5aa5df32b122e95fb4d122e28";
  BackgroundTimer.runBackgroundTimer(async () => {
        let config_json = await read_default_config();
          console.log(`config_json: ${JSON.stringify(config_json)}`);

          if(config_json.client_on === true) {
              worker.client_worker(config_json, user_password, decrypted_private_key, () => {
                  console.log(`${global_counter}: Client is on`);
              });
          } else {
              console.log(`${global_counter}: Client is off`);
          }

          global_counter++;

        //console.log("XLOG: ping: " + JSON.stringify(config_json));
        //config_json["port"] = 3141;
        //await write_default_config(config_json);
      },
      5000);
}

module.exports = { clientFoo };