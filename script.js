let bluetoothDevice;
let characteristic;

async function connect() {
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: ['00001101-0000-1000-8000-00805F9B34FB'] // SPP service UUID for HC-05 module
    });
    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService('00001101-0000-1000-8000-00805F9B34FB'); // SPP service UUID for HC-05 module
    characteristic = await service.getCharacteristic('00001101-0000-1000-8000-00805F9B34FB'); // SPP characteristic UUID for HC-05 module
    startNotifications();
  } catch (error) {
    console.error('Bluetooth error:', error);
  }
}

function startNotifications() {
  characteristic.addEventListener('characteristicvaluechanged', handleNotifications);
  characteristic.startNotifications();
}

function handleNotifications(event) {
  const value = event.target.value;
  const sensorValues = new TextDecoder().decode(value);
  const [current, voltage, temperature, ldr] = sensorValues.split(',');

  document.getElementById('currentValue').innerText = `Current: ${current}`;
  document.getElementById('voltageValue').innerText = `Voltage: ${voltage}`;
  document.getElementById('temperatureValue').innerText = `Temperature: ${temperature}`;
  document.getElementById('ldrValue').innerText = `Light: ${ldr}`;
}

function reset() {
  // Reset functionality
}

function save() {
  // Save functionality
}
