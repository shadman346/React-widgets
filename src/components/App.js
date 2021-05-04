import React, { useState } from 'react';
import Accordion from './Accordion';
import Search from './Search';
import Dropdown from './Dropdown';
import Translate from './Translate';
import Route from './Route';
import Header from './Header';

const items = [
   {
      title: 'student',
      content:
         'shadman is the best student i have ever seen okay?????? nooo?????',
   },
   {
      title: 'anime',
      content: 'naruto is the best anime i have ever seen okay?????? nooo?????',
   },
   {
      title: 'data structure',
      content: 'stack is the best ds i have ever seen okay?????? nooo?????',
   },
];
const options = [
   {
      label: 'The Color Red',
      value: 'red',
   },
   {
      label: 'The Color Green',
      value: 'green',
   },
   {
      label: 'A Shade of Blue',
      value: 'blue',
   },
];

const App = () => {
   const [selected, setSelected] = useState(options[0]);

   return (
      <div>
         <Header />
         <Route path="/">
            <Accordion items={items} />
         </Route>
         <Route path="/list">
            <Search />
         </Route>
         <Route path="/dropdown">
            <Dropdown
               label={'select a color'}
               selected={selected}
               onSelectedChange={setSelected}
               options={options}
            />
         </Route>
         <Route path="/translate">
            <Translate />
         </Route>
      </div>
   );
};
// return (
//     <div>

//         {/* <Accordion items={items} /> */}
//         {/* <Search /> */}
//         <button onClick={() => setShowDropdown(!showDropdown)}>
//             Toggle Dropdown
//         </button>
//         {showDropdown ? (
//             <Dropdown
//                 selected={selected}
//                 onSelectedChange={setSelected}
//                 options={options}
//             />
//         ) : null}

//     </div>
// )
export default App;
