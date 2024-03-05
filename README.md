# hrnet-plugin

A React Tailwind component to render a simple component DatePicker, Calendar, Modal

## Install

```bash
npm i hrnet-plugin
```

## Configure Tailwind

Configure Tailwind to scan the library components by adding this line to the content array on the `tailwind.config.js`.

```
content: [
    ...
    './node_modules/hrnet-plugin/dist/index.umd.js',
  ],
```

## Modal component

### Properties

| Prop    | Type     | Description                                                                                       |
| ------- | -------- | ------------------------------------------------------------------------------------------------- |
| isOpen  | Boolean  | Show if the dialog component is open or closed                                                    |
| onClose | Function | Callback to close the dialog component                                                            |
| children | React.children  | React.children  |

Example usage within a Modal component:

```jsx
import { useState } from 'react';
import {Modal} from 'hrnet-plugin';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <div>
      <button onClick={handleOpen}>Open Dialog</button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        >
          <p> lorem keeloifn  frnunft </p>
      <Modal/>
    </div>
  );
}
```

## Calendar component

### Properties

| Prop    | Type     | Description                                                                                       |
| ------- | -------- | ------------------------------------------------------------------------------------------------- |
| selected  | Date  | The selected date                                                    |
| onSelect | Function | Callback to change the selected date                                                            |
| handleCloseCalendar | Function | Callback to close the calendar component                                                            |

Example usage within a Calendar component:

```jsx
import { useState } from 'react';
import {Calendar} from 'hrnet-plugin';

function App() {
  const [selected, setSelected] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <div>
      <button onClick={handleOpen}>Open Calendar</button>
      <Calendar
        selected={selected}
        onSelect={setSelected}
        handleCloseCalendar={handleClose}
        />
    </div>
  );
}
```


## DatePicker component

### Properties

| Prop    | Type     | Description                                                                                       |
| ------- | -------- | ------------------------------------------------------------------------------------------------- |
| selected  | Date  | The selected date                                                    |
| onSelect | Function | Callback to change the selected date                                                            |
dateFormat | String | The date format to display the date. Default is 'dd/MM/yyyy' |


Example usage within a DatePicker component:

```jsx
import { useState } from 'react';
import {DatePicker} from 'hrnet-plugin';

function App() {
  const [selected, setSelected] = useState(new Date());

  return (
    <div>
      <DatePicker
        selected={selected}
        onSelect={setSelected}
        />
    </div>
  );
}
```

## Dependencies

```json
"peerDependencies": {
    "clsx": "^2.1.0",
    "date-fns": "^2.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "tailwindcss": "^3.4.1",
    "usehooks-ts": "^2.15.1"
  }
```

## License

This component is distributed under MIT license.
