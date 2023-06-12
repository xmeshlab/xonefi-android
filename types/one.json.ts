export interface Account {
  name: string;
  encrypted_prk: string;
  address: string;
}

export interface Gas_offer {
  mainnet: string;
  ropsten: string;
  kovan: string;
}

export interface Gas_price {
  mainnet: string;
  ropsten: string;
  kovan: string;
}

export interface Sacko {}

export interface Client_session {
  status: number;
  ssid: string;
  ip: string;
  port: number;
  prefix: string;
  pfd: boolean;
  pft: boolean;
  free: boolean;
  restricted: boolean;
  sack_number: number;
  expiration_timestamp: number;
  pafren_timestamp: number;
  session_id: string;
  number_of_sacks: number;
  pafren_amount: number;
  sack_amount: number;
  pafren_percentage: number;
  cost: number;
  scan_counter: number;
  last_sack_timestamp: number;
  provider_address: string;
  initiated_sack_number: number;
  sackok: Sacko;
}

export interface OneFiInfo {
  version: string;
  account_set: boolean;
  client_on: boolean;
  ap_on: boolean;
  pft: boolean;
  pfd: boolean;
  cft: boolean;
  cfd: boolean;
  private_client: boolean;
  private_provider: boolean;
  max_ofi_mb: number;
  max_ofi_hr: number;
  price_ofi_mb: number;
  price_ofi_hr: number;
  infura_api_key: string;
  network: string;
  account: Account;
  private_providers: any[];
  private_clients: any[];
  provider_ip: string;
  port: number;
  wlan_interface: string;
  ssids: string[];
  pafren_percentage: number;
  min_downlink_tier: number;
  min_uplink_tier: number;
  client_max_pafren: number;
  gas_offer: Gas_offer;
  gas_price: Gas_price;
  call_confirmation_threshold: number;
  handshake_time: number;
  sack_period: number;
  minimum_pafren_length: number;
  expected_sack_amount: number;
  expected_pafren_amount: number;
  allow_handover: boolean;
  e2e_mode: boolean;
  client_session: Client_session;
}
